<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b bg-white shadow-sm flex items-center gap-x-4">
         <button @click="$router.push('/chat')" class="md:hidden mr-3 text-gray-600">
         Back
      </button>
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]"
          
        >
          {{ getInitials(name) }}
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
                :text="msg.text"
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
import { chats } from '../chat.js'


export default {
  components: { ChatMessage, ChatInput },
  data() {
    return {
    //   messages: [
    //     { text: 'Hey!', isMine: true },
    //     { text: 'Hi! How are you?', isMine: false }
    //   ]

    // messages: messages
    }
  },
  methods: {
    sendMessage(text) {
      this.messages.push({ text, isMine: true })
    },
    getInitials(name) {
      const parts = name.trim().split(' ')
      return parts.length > 1
        ? parts[0][0] + parts[1][0]
        : parts[0][0]
    },
  },
  props: { messages: Array, isMine: Boolean, name: String }

}
</script>
