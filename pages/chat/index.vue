<template>
 <div class="w-full md:hidden border border-gray-200 bg-white">
    <ChatSidebar />
</div>
</template>

<script>
import ChatSidebar from '../../components/chatSidebar.vue'
export default {
  layout: 'chat',
  components: { ChatSidebar },
}
</script>
