import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import Message from '../models/Message.model.js'

let io

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true
    },
    connectionStateRecovery: { maxDisconnectionDuration: 2 * 60 * 1000 }
  })

  // JWT auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Authentication required'))
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      socket.user = decoded
      next()
    } catch {
      next(new Error('Invalid or expired token'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.user.id} (${socket.user.role})`)

    // Join personal room
    socket.join(`user:${socket.user.id}`)
    if (socket.user.role === 'admin') socket.join('admin')

    // Join a conversation room
    socket.on('join:conversation', ({ conversationId }) => {
      socket.join(`conv:${conversationId}`)
    })

    // Send message via socket
    socket.on('send:message', async (data) => {
      try {
        const { conversationId, content, type = 'text' } = data
        const message = await Message.create({
          conversationId,
          sender: socket.user.id,
          senderRole: socket.user.role,
          content,
          type
        })
        const populated = await message.populate('sender', 'name avatar')
        io.to(`conv:${conversationId}`).emit('message:new', populated)

        // Notify admin of new user messages
        if (socket.user.role !== 'admin') {
          io.to('admin').emit('notification:message', {
            conversationId,
            senderName: socket.user.name,
            preview: content.substring(0, 60)
          })
        }
      } catch (err) {
        socket.emit('error', { message: err.message })
      }
    })

    // Typing indicators
    socket.on('typing:start', ({ conversationId }) => {
      socket.to(`conv:${conversationId}`).emit('typing:start', { userId: socket.user.id, role: socket.user.role })
    })
    socket.on('typing:stop', ({ conversationId }) => {
      socket.to(`conv:${conversationId}`).emit('typing:stop', { userId: socket.user.id })
    })

    socket.on('disconnect', (reason) => {
      console.log(`🔌 Disconnected: ${socket.user.id} — ${reason}`)
    })
  })

  return io
}

export const getIO = () => io
