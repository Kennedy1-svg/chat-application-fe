<template>
  <div class="h-full flex flex-col bg-white border-r border-gray-200">
    <!-- 🌟 Logo Section -->
    <div class="p-4 border-b border-gray-200 flex items-center justify-start">
      <img src="../public/image 66.png" alt="App Logo" class="object-contain mr-2" />
    </div>

    <!-- 🔍 Search Bar -->
    <div class="p-3 border-b border-gray-100">
      <div class="relative">
        <input
          type="text"
          v-model="search"
          @keyup.send="filterUsers()"
          placeholder="Search by name or email"
          class="w-full pl-10 pr-3 py-2 text-sm border bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BABD8] focus:border-[#8BABD8]"
        />
        <svg @click="fetchAllUsers(search)" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
        </svg>
      </div>
    </div>
    <ul v-if="chats?.length" class="flex-1 overflow-y-auto divide-y divide-gray-100 w-full">
      <h1 class="text-center font-bold">Chats</h1>
      <li
        v-for="chat in chats"
        :key="chat._id"
        @click="openChat(chat)"
        class="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <Nuxt-Link :to="`/chat/${chat._id}`" class="flex gap-x-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]">
            {{ getInitials(chat.contact.name) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-800 truncate">{{ chat.contact.name }}</p>
            <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage.content }}</p>
          </div>
        </Nuxt-Link>
      </li>
    </ul>

    <ul  class="flex-1 overflow-y-auto divide-y divide-gray-100 w-full">
      <h1 class="text-center font-bold">Users</h1>
      <li
        v-for="chat in filteredUsers"
        :key="chat._id"
        @click="$router.push(`/chat/${chat._id}`)"
        class="p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <Nuxt-Link :to="`/chat/${chat._id}`" class="flex gap-x-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-[#8BABD8]">
            {{ getInitials(chat.name) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate" :class="!isUserOnline(chat._id) ? 'text-green-500' : 'text-gray-400'">
              {{ chat.name }}
            </p>
            <p class="text-xs text-gray-500 truncate">{{ chat.email }}</p>
          </div>
        </Nuxt-Link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters(['allChats', 'allUsers', 'onlineUsers']),

    chats() {
      return this.allChats
    },

    users() {
      return this.allUsers
    },

    // ✅ Filter users by name OR email
    filteredUsers() {
      if (!this.search.trim()) return this.users

      const query = this.search.toLowerCase()
      return this.users.filter(user =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    ...mapActions(['getMyChats', 'fetchAllUsers']),
    ...mapMutations(['SET_ONLINE_USERS', 'UPDATE_CHAT_MESSAGE']),

     async filterUsers() {
        await this.fetchAllUsers()

    // const query = this.search.trim()
    // if (!query) {
    //   await this.fetchAllUsers()
    //   return
    // }

    // const token = localStorage.getItem('token')
    // const res = await fetch(`http://localhost:4000/api/users/all-users?search=${query}`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })
    // const data = await res.json()
    // this.users = data
  },

    getInitials(name) {
      if (!name || typeof name !== 'string') return ''
      return name.trim().split(' ').map(n => n[0].toUpperCase()).join('')
    },

    isUserOnline(userId) {
      return this.onlineUsers.includes(userId)
    },

    openChat(chat) {
      this.$router.push(`/chat/${chat.contact._id}`)
    }
  },
  mounted() {
    this.fetchAllUsers()
    this.getMyChats()

    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.id) {
      this.$socket.emit('user-online', user.id)
    }

    this.$socket.on('online-users', (users) => {
      this.SET_ONLINE_USERS(users)
    })

    this.$socket.on('new-message', (message) => {
      this.UPDATE_CHAT_MESSAGE(message)
    })
  }
}
</script>
