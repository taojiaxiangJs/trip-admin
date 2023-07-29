<template>
  <div bg="#fafafc" min-h-60 b-1 rounded-8 p-15 bc-ccc dark:bg-black dark:bc-333>
    <n-space wrap :size="[20, 15]">
      <slot name="form" />
      <div>
        <n-button type="primary" @click="emit('search')">搜索</n-button>
        <n-button secondary ml-20 type="primary" @click="emit('reset')">重置</n-button>
        <slot name="btn" />
      </div>
    </n-space>
  </div>
</template>

<script setup>
const emit = defineEmits(['search', 'reset'])
</script>
