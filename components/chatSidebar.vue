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
      <!-- {{ users }} -->
      <ul v-if="chats?.length== 0" class="flex-1 overflow-y-auto divide-y divide-gray-100 w-full">
      <li
        v-for="chat in users"
        :key="chat.id"
        @click="$router.push(`/chat/${chat._id}`)"
        class="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <Nuxt-Link  :to="`/chat/${chat._id}`" class="flex gap-x-4">

      <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]"
          
        >
          {{ getInitials(chat.name) }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-800 truncate">{{ chat.name }}</p>
          <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
        </div>
      </Nuxt-Link>

      </li>
    </ul>
    <!-- 💬 Chat List -->
    <ul v-else  class="flex-1 overflow-y-auto divide-y divide-gray-100 w-full">
      <li
        v-for="chat in chats"
        :key="chat.id"
        @click="$router.push(`/chat/${chat.id}`)"
        class="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <Nuxt-Link  :to="`/chat/${chat.id}`" class="flex gap-x-4">

      <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]"
          
        >
          {{ getInitials(chat.name) }}
        </div>
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
// import { chats } from '../chat.js'
export default {
  data() {
    return {
        chats: null,
        users: [],      // all users from backend
        loading: false,
        error: null,
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
     async getMyChats() {
      try {
        this.isLoading = true
        this.error = null

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
          throw new Error('No authentication token found')
        }

        // Fetch user's chats
        const response = await fetch('http://localhost:4000/api/chats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch chats: ${response.statusText}`)
        }

        const data = await response.json()

        // Replace `chats` with actual data from API
        this.chats = Array.isArray(data) ? data : data.chats || []
      } catch (err) {
        console.error(err)
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
     async fetchAllUsers() {
      this.loading = true
      this.error = null

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.error = 'No token found — please log in first'
          this.loading = false
          return
        }

        const response = await fetch('http://localhost:4000/api/users/all-users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errMsg = await response.text()
          throw new Error(`HTTP error ${response.status}: ${errMsg}`)
        }

        const data = await response.json()
        this.users = data
      } catch (err) {
        console.error('Error fetching users:', err)
        this.error = 'Unable to fetch users'
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.fetchAllUsers()
    this.getMyChats()
  },

  // mounted() {
    
  //   let user = null

  //   // Safely access localStorage only in browser
  //   if (process.client) {
  //     user = localStorage.getItem('user')
  //   }

  //   console.log('User:', user)
  // },
}
</script>
