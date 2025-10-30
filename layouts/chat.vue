<!-- <template>
  <div class="flex h-screen overflow-hidden">
 
    <div
      :class="[
        'border-r border-gray-200 bg-white transition-all duration-300',
        (isMobile) ? 'w-full' : 'w-full md:w-1/3 md:block'
      ]"
    >
      <ChatSidebar />
    </div>

    
    <div
      :class="[
        'flex-1 bg-gray-100 flex flex-col transition-all duration-300',
        (isChatPage) ? 'block w-full md:w-2/3' : 'hidden md:flex'
      ]"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
import ChatSidebar from '@/components/ChatSidebar.vue'

export default {
  components: { ChatSidebar },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    // Adjust based on your actual route naming
    isChatPage() {
      return this.$route.path.startsWith('/chat/') && this.$route.params.id
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768 // Tailwind’s md breakpoint
    }
  }
}
</script> -->



<template>
  <div class="flex h-screen">
    <div class="hidden md:block w-1/3 border-r border-gray-200 bg-white">
      <ChatSidebar />
    </div>
    <div class="flex-1 bg-gray-100 flex flex-col">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import ChatSidebar from '~/components/chatSidebar.vue'

export default {
  components: { 
    ChatSidebar 
  },
   data() {
    return {
      isMobile: false,
    }
  },
  methods: {
    handleChatSelected(chatId) {
      // Navigate to chat on mobile
      this.$router.push(`/chat/${chatId}`)
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768 // Tailwind's md breakpoint
    },
  },
}
</script>


<!-- <template>
  <div class="flex h-screen">
    <div 
      :class="[
        'w-full md:w-1/3 border-r border-gray-200 bg-white',
        { 'hidden md:block': isChatOpen }
      ]"
    >
      <ChatSidebar @chat-selected="handleChatSelected" />
    </div>
    
    <div 
      :class="[
        'flex-1 bg-gray-100 flex flex-col',
        { 'hidden md:flex': !isChatOpen }
      ]"
    >
      <Nuxt />
    </div>
  </div>
</template> -->

<!-- <script>
import ChatSidebar from '~/components/ChatSidebar.vue'

export default {
  components: { ChatSidebar },
  
  computed: {
    isChatOpen() {
      // Check if we're on a specific chat page
      return this.$route.params.id !== undefined
    }
  },
  
  methods: {
    handleChatSelected(chatId) {
      // Navigate to chat on mobile
      this.$router.push(`/chat/${chatId}`)
    }
  }
}
</script> -->
