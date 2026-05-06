import { Review } from '../models/Review.model.js'

export const createReview = async (req, res) => {
  const existing = await Review.findOne({ user: req.user._id, project: req.body.project })
  if (existing) return res.status(409).json({ message: 'You already reviewed this project' })
  const review = await Review.create({ ...req.body, user: req.user._id })
  res.status(201).json({ review })
}

export const getPublicReviews = async (req, res) => {
  const { project, page = 1, limit = 10 } = req.query
  const filter = { isApproved: true, isPublished: true }
  if (project) filter.project = project
  const total = await Review.countDocuments(filter)
  const reviews = await Review.find(filter)
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('user', 'name avatar')
    .populate('project', 'title slug')
  res.json({ reviews, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } })
}

export const adminGetReviews = async (req, res) => {
  const reviews = await Review.find()
    .sort('-createdAt')
    .populate('user', 'name email')
    .populate('project', 'title')
  res.json({ reviews })
}

export const adminToggleReview = async (req, res) => {
  const review = await Review.findById(req.params.id)
  if (!review) return res.status(404).json({ message: 'Review not found' })
  review.isApproved = !review.isApproved
  review.isPublished = review.isApproved
  await review.save()
  res.json({ review })
}
