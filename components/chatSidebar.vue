<template>
  <div class="h-full flex flex-col bg-white border-r border-gray-200">
    <!-- 🌟 Logo Section -->
    <div class="p-4 border-b border-gray-200 flex items-center justify-start">
      <img
        src="../public/image 66.png"
        alt="App Logo"
        class="object-contain mr-2"
      />
    </div>

    <!-- 🔍 Search Bar -->
    <div class="p-3 border-b border-gray-100">
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="w-full pl-10 pr-3 py-2 text-sm border bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BABD8] focus:border-[#8BABD8]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>
    </div>

    <!-- 💬 Chat List -->
    <ul class="flex-1 overflow-y-auto divide-y divide-gray-100">
      <li
        v-for="chat in chats"
        :key="chat.id"
        @click="selectChat(chat)"
        class="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <Nuxt-Link  :to="`/chat/${chat.id}`">

      <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]"
          
        >
          {{ getInitials(chat.name) }}
        </div>
        <!-- <img
          :src="chat.avatar"
          alt="User Avatar"
          class="w-10 h-10 rounded-full object-cover"
        /> -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-800 truncate">{{ chat.name }}</p>
          <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
        </div>
      </Nuxt-Link>

      </li>
    </ul>
  </div>
</template>

<script>
import { chats } from '../chat.js'
export default {
  data() {
    return {
        chats: chats
    }
  },
  methods: {
    // selectChat(chat) {
    //   this.$router.push(`/chat/${chat.id}`)
    // },
    selectChat(chatId) {
      this.$emit('chat-selected', chat.id)
      // Also navigate
      this.$router.push(`/chat/${chat.id}`)
    },
    getInitials(name) {
      const parts = name.trim().split(' ')
      return parts.length > 1
        ? parts[0][0] + parts[1][0]
        : parts[0][0]
    },
  }
}
</script>
