<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <div class="flex justify-center my-4">
            <img src="../public/image 66.png" alt="chat-logo"/>
        </div>
      <!-- <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Create Account</h2> -->
      <form @submit.prevent="handleSignup" class="space-y-4">
        <input v-model="name" type="text" placeholder="Name" class="input" required />
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="phone" type="tel" placeholder="Phone Number" class="input" required />
        <button type="submit" class="w-full py-2 bg-[#6E80A4] text-white rounded-lg hover:opacity-30 transition">Sign Up</button>
      </form>
      <!-- <p class="text-sm text-center mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-green-600 hover:underline">Login</NuxtLink>
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
    layout: 'default',
  data() {
    return { name: '', email: '', phone: '', password: '' }
  },
  methods: {
    async handleSignup() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const response = await fetch('https://chat-application-be-z4e9.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Signup failed')
        }

      //    if (window.socket && window.socket.connected === false) {
      //   window.socket.auth = { token: data.token };
      //   window.socket.connect();
      // }

        // Store JWT token and user info
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        // Redirect to chat page (you can use user._id or chatId if needed)
        this.$router.push('/chat')
      } catch (error) {
        this.errorMessage = error.message
        console.error('Signup error:', error)
      } finally {
        this.isLoading = false
      }
    },
    // handleSignup() {
    //   console.log({ name: this.name, email: this.email, phone: this.phone })

    //   this.$router.push(`/chat/1`)
    // }
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none;
}
</style>
