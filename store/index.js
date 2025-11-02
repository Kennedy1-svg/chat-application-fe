import { base_url } from "../config"

export const state = () => ({
  chats: [],
  users: [],
  onlineUsers: [],
  loading: false,
  error: null
})

export const mutations = {
  SET_CHATS(state, chats) {
    state.chats = chats
  },
  SET_USERS(state, users) {
    state.users = users
  },
  SET_ONLINE_USERS(state, users) {
    state.onlineUsers = users
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  UPDATE_CHAT_MESSAGE(state, message) {
    const chat = state.chats.find(c => c._id === message.chat)
    if (chat) {
      chat.unread = true
      chat.lastMessage = message.content
    }
  }
}

export const actions = {
  async getMyChats({ commit }) {
    try {
      commit('SET_LOADING', true)
      console.log('this is me', process.env.VUE_APP_API_URL)
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:4000/api/chats/chatlist', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()
      commit('SET_CHATS', Array.isArray(data) ? data : data.chats || [])
    } catch (err) {
      commit('SET_ERROR', err.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchAllUsers({ commit }, search = '') {
  try {
    commit('SET_LOADING', true)

    const token = localStorage.getItem('token')
    let url = 'http://localhost:4000/api/users/all-users/'


    if (search && search.trim()) {
      url += `?search=${encodeURIComponent(search.trim())}`
    }

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await res.json()
    commit('SET_USERS', data)
  } catch (err) {
    commit('SET_ERROR', err.message)
  } finally {
    commit('SET_LOADING', false)
  }
}

}

export const getters = {
  allChats: (state) => state.chats,
  allUsers: (state) => state.users,
  onlineUsers: (state) => state.onlineUsers,
  loading: (state) => state.loading,
  error: (state) => state.error
}
