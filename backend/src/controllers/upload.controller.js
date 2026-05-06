import multer from "multer";
import imagekit from "../config/imagekit.js";

// multer 2.x: memoryStorage() usage is unchanged, but fileFilter cb signature is the same
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Build a thumbnail URL using ImageKit URL transformations
const makeThumbnail = (url) => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");
    // Insert tr: after the first two segments (/ and imagekit-id)
    parts.splice(2, 0, "tr:w-400,h-300,c-at_max");
    urlObj.pathname = parts.join("/");
    return urlObj.toString();
  } catch {
    return url;
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!imagekit)
      return res
        .status(503)
        .json({ message: "ImageKit is not configured on this server" });
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const folder = req.body.folder || "masterpools/general";
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await imagekit.files.upload({
      file: dataURI,
      fileName: `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`,
      folder,
      useUniqueFileName: true,
      tags: [folder.replace(/\//g, "-")],
    });

    res.json({
      url: result.url,
      fileId: result.fileId,
      thumbnail: makeThumbnail(result.url),
      name: result.name,
      size: result.size,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    if (!imagekit)
      return res
        .status(503)
        .json({ message: "ImageKit is not configured on this server" });
    if (!req.files?.length)
      return res.status(400).json({ message: "No files provided" });

    const folder = req.body.folder || "masterpools/gallery";

    const uploads = await Promise.all(
      req.files.map(async (file) => {
        const base64 = file.buffer.toString("base64");
        const dataURI = `data:${file.mimetype};base64,${base64}`;
        const result = await imagekit.files.upload({
          file: dataURI,
          fileName: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`,
          folder,
          useUniqueFileName: true,
        });
        return {
          url: result.url,
          fileId: result.fileId,
          thumbnail: makeThumbnail(result.url),
          name: result.name,
        };
      }),
    );

    res.json({ images: uploads });
  } catch (err) {
    console.error("Multi-upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    if (!imagekit)
      return res
        .status(503)
        .json({ message: "ImageKit is not configured on this server" });
    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ message: "fileId is required" });
    await imagekit.files.delete(fileId);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAuthParams = (req, res) => {
  try {
    if (!imagekit)
      return res
        .status(503)
        .json({ message: "ImageKit is not configured on this server" });
    const result = imagekit.helper.getAuthenticationParameters();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
