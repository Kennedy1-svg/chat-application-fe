import io from 'socket.io-client'

export default ({ store }, inject) => {
  let token = null

  // Try to get token safely
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }

  // Connect to your backend
  const socket = io(process.env.VUE_APP_API_URL || 'http://localhost:4000', {
   auth: token ? { token } : undefined,
    autoConnect: !!token,
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

//   Basic lifecycle events
  socket.on('connect', () => console.log('✅ Socket connected:', socket.id))
  socket.on('disconnect', (reason) => console.log('❌ Socket disconnected:', reason))
  socket.on('connect_error', (err) => console.error('⚠️ Socket connection error:', err.message))

  // Assuming you have 'io' (the Socket.IO server instance) and 'socket' 
// (the current client's connection) in scope.

  // Inject to use in components as this.$socket
  inject('socket', socket)


// export default socket
}
