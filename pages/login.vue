<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="input" required />
        <input v-model="phone" type="tel" placeholder="Phone Number" class="input" required />
        <input v-model="password" type="password" placeholder="Password" class="input" required />
        <!-- <NuxtLink> -->
        <button type="submit" class="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Login</button>

        <!-- </NuxtLink> -->
      </form>
      <p class="text-sm text-center mt-4">
        Don't have an account?
        <NuxtLink to="/signup" class="text-green-600 hover:underline">Sign Up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
layout: 'default', 
  data() {
    return { email: '', phone: '', password: '' }
  },
  methods: {
    handleLogin() {
      console.log({ email: this.email, phone: this.phone, password: this.password })
      this.$router.push('/chat')
    }
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none;
}
</style>
