<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b bg-white shadow-sm flex items-center gap-x-4">
      <button @click="$router.push('/chat')" class="md:hidden mr-3 text-gray-600">
        Back
      </button>
      <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]">
        OK
      </div>
      <h2 class="text-xl font-bold">{{ name }}</h2>
    </div>

    <div class="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
      <div class="flex flex-col space-y-3">
        <div class="flex justify-center">
          <span class="text-center text-xs rounded bg-white text-[#8BABD8] w-1/5 py-1">Today</span>
        </div>

        <ChatMessage
          v-for="(msg, index) in messages"
          :key="index"
          :text="msg?.content"
          :isMine="msg.isMine"
        />
      </div>
    </div>

    <ChatInput @send="sendMessage" />
  </div>
</template>

<script>
import ChatMessage from './chatMessage.vue'
import ChatInput from './chatInput.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { ChatMessage, ChatInput },

  props: {
    messages: {
      type: Array,
      default: () => []
    },
    isMine: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      currentUserId: null
    }
  },

  methods: {
    ...mapActions(['getMyChats', 'fetchAllUsers']),
    ...mapMutations(['SET_ONLINE_USERS', 'UPDATE_CHAT_MESSAGE']),

    getUserId() {
      try {
        const tokenPayload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
        return tokenPayload._id
      } catch {
        return null
      }
    },

    async sendMessage(text) {
      if (!text || !text.trim()) return

      const userId = this.currentUserId || JSON.parse(localStorage.getItem('user')).id
      if (!userId) return console.error('User not authenticated or ID not found.')

      const messageData = {
        senderId: userId,
        recipientId: this.$route.params.id,
        content: text,
        type: 'text'
      }

      const optimisticMessage = {
        content: text,
        isMine: true,
        createdAt: new Date(),
        _tempId: Date.now() + Math.random()
      }

      this.messages.push(optimisticMessage)

      this.$socket.emit('send-message', messageData, (ack) => {
        if (!ack?.success) {
          const index = this.messages.findIndex(m => m._tempId === optimisticMessage._tempId)
          if (index !== -1) this.messages.splice(index, 1)
        } else {
          this.getMyChats()
          console.log('Message sent successfully:', ack)
        }
      })
    }
  },

  mounted() {
    if (!this.currentUserId) {
      this.currentUserId = JSON.parse(localStorage.getItem('user')).id
    }

    const recipientId = this.$route.params.id

    this.$socket.emit(
      'join-chat',
      { userId: this.currentUserId, recipientId },
      (ack) => {
        console.log(`ACK for joining chat ${recipientId}:`, ack)
        if (ack?.success) this.getMyChats()
      }
    )

    this.$socket.on('new-message', (msg) => {
      if (msg.sender === this.currentUserId) return

      if (msg.chat === recipientId || msg.sender === recipientId) {
        this.messages.push({
          content: msg.content,
          isMine: false,
          createdAt: msg.createdAt
        })
      }
    })
  },

  beforeUnmount() {
    this.$socket.off('new-message')
    this.$socket.emit('leave-chat', { recipientId: this.$route.params.id })
  }
}
</script>
