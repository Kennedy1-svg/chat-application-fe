<template>
  <ChatWindow :messages="currentChat.messages" :name="currentChat.name" />
</template>

<script>
import ChatWindow from '../../components/chatWindow.vue'
import { chats } from '../../chat.js'
export default {
  layout: 'chat',
  components: { ChatWindow },

  computed: {
    currentChat() {
      const chatId = parseInt(this.$route.params.id)
      return chats.find(chat => chat.id === chatId)
    }
  },
}
</script>
