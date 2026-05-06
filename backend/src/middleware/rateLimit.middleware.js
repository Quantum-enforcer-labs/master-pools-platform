// Simple in-memory rate limiter (use redis in production)
const requests = new Map()

export const rateLimit = ({ windowMs = 60_000, max = 100, message = 'Too many requests' } = {}) => {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress || 'unknown'
    const now = Date.now()
    const windowStart = now - windowMs

    const timestamps = (requests.get(key) || []).filter(t => t > windowStart)
    timestamps.push(now)
    requests.set(key, timestamps)

    if (timestamps.length > max) {
      return res.status(429).json({ message })
    }
    next()
  }
}

export const authRateLimit  = rateLimit({ windowMs: 15 * 60_000, max: 10, message: 'Too many auth attempts. Wait 15 minutes.' })
export const apiRateLimit   = rateLimit({ windowMs: 60_000, max: 200 })
export const uploadRateLimit = rateLimit({ windowMs: 60_000, max: 20, message: 'Upload limit reached. Try again in a minute.' })
