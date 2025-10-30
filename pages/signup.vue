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
    handleSignup() {
      console.log({ name: this.name, email: this.email, phone: this.phone })
      this.$router.push(`/chat/1`)
    }
  }
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none;
}
</style>
