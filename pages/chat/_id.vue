<template>
  <ChatWindow :messages="messages" :name="chatUser?.name" />
</template>

<script>
import ChatWindow from '../../components/chatWindow.vue'
import { chats } from '../../chat.js'
export default {
  layout: 'chat',
  components: { ChatWindow },

   data() {
    return {
      messages: [],
      chatUser: null,
      loading: true
    }
  },

  async mounted() {
    await this.fetchChatHistory()
    await this.getUserDetailsById(this.$route.params.id)
  },

  methods: {
    async fetchChatHistory() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found — redirecting to login')
          this.$router.push('/login')
          return
        }

        const otherUserId = this.$route.params.id
        const res = await fetch(`http://localhost:4000/api/chats/history/${otherUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          console.error('Error fetching chat history')
          return
        }

        const data = await res.json()
        this.messages = data.messages || []
        this.chatUser = data.chat
          ? data.chat.participants.find(p => p._id !== this.getUserId())
          : null
      } catch (err) {
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },

    getUserId() {
      try {
        const tokenPayload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
        return tokenPayload.id
      } catch {
        return null
      }
    },

    async getUserDetailsById(userId) {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No authentication token found')

        const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message || 'Failed to fetch user details')
        }

        const data = await res.json()
        this.chatUser = data
        return data
      } catch (err) {
        console.error('Error fetching user:', err.message)
        return null
      }
    }
  }
}
</script>
