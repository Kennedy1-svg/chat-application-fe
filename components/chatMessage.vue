<template>
  <div
    class="flex flex-col w-full"
    :class="isMine ? 'items-end' : 'items-start'"
  >
    <div
      :class="[
        'max-w-xs px-4 py-2 my-1 rounded-lg text-sm',
        isMine
          ? 'bg-[#DEE9FF] text-[#011627] self-end rounded-br-none'
          : 'bg-white text-gray-800 self-start shadow rounded-bl-none'
      ]"
    >
      {{ text }}
      <p class="text-xs text-right mt-2">2:52pm</p>
    </div>
  </div>
</template>
<script>
export default {
  props: { text: String, isMine: Boolean }
}
</script>
