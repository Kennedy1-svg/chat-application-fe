<template>
  <div class="p-3 bg-white border-t border-gray-200 flex items-center relative">
    <input
      v-model="message"
      type="text"
      placeholder="Message"
      class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      @keyup.enter="send"
    />
    <div class="w-5 h-5 text-gray-400 absolute right-8 top-5">
        <svg  @click="send"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"/></svg>
    </div>     
  </div>
</template>

<script>
export default {
  data() {
    return { message: '' }
  },
  methods: {
    send() {
      if (!this.message) return
      this.$emit('send', this.message)
      this.message = ''
    }
  }
}

</script>
