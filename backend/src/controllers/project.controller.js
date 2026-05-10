import Project from "../models/Project.model.js";

export const getProjects = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    status,
    category,
    featured,
    search,
    sort = "-createdAt",
  } = req.query;
  const filter = { isPublished: true };
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (search)
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("createdBy", "name");
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  res.json({
    projects,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      limit: Number(limit),
    },
  });
};

export const getProject = async (req, res) => {
  const project = await Project.findOne({
    $or: [
      { _id: req.params.id.match(/^[a-f\d]{24}$/i) ? req.params.id : null },
      { slug: req.params.id },
    ],
    isPublished: true,
  }).populate("createdBy", "name");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.set("Cache-Control", "no-store");
  project.views += 1;
  await project.save({ validateBeforeSave: false });
  res.json({ project });
};

export const getStats = async (req, res) => {
  const [total, completed, ongoing, upcoming] = await Promise.all([
    Project.countDocuments({ isPublished: true }),
    Project.countDocuments({ isPublished: true, status: "completed" }),
    Project.countDocuments({ isPublished: true, status: "ongoing" }),
    Project.countDocuments({ isPublished: true, status: "upcoming" }),
  ]);
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  res.json({ total, completed, ongoing, upcoming });
};

export const adminGetProjects = async (req, res) => {
  const { page = 1, limit = 20, status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: "i" };
  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("createdBy", "name");
  res.json({
    projects,
    pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
  });
};

export const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json({ project });
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ project });
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
};

export const togglePublish = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  project.isPublished = !project.isPublished;
  if (project.isPublished) project.publishedAt = new Date();
  await project.save();
  res.json({ project });
};
