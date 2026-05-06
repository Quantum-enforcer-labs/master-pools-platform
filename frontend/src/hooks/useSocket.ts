import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '../stores/auth.store'

let socketInstance: Socket | null = null

export const useSocket = () => {
  const { token, isAuthenticated } = useAuthStore()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) return

    if (!socketInstance) {
      socketInstance = io('/', {
        auth: { token },
        transports: ['websocket', 'polling']
      })
    }

    socketRef.current = socketInstance

    return () => {
      // Don't disconnect on component unmount — keep alive
    }
  }, [isAuthenticated, token])

  return socketRef.current || socketInstance
}

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect()
    socketInstance = null
  }
}
