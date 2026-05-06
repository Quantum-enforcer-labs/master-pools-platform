import Notification from '../models/Notification.model.js'

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort('-createdAt')
    .limit(50)
  const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false })
  res.json({ notifications, unreadCount })
}

export const markAllRead = async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, isRead: false },
    { isRead: true, readAt: new Date() }
  )
  res.json({ message: 'All notifications marked as read' })
}

export const markRead = async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true, readAt: new Date() }
  )
  res.json({ message: 'Notification marked as read' })
}

export const deleteNotification = async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  res.json({ message: 'Notification deleted' })
}

// Helper to create notifications (used internally)
export const createNotification = async ({ userId, type, title, body, link, meta }) => {
  try {
    await Notification.create({ user: userId, type, title, body, link, meta })
  } catch (err) {
    console.error('Notification create failed:', err.message)
  }
}
