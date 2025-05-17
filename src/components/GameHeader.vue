<script setup lang="ts">
import { Pause, Ellipsis } from 'lucide-vue-next'
import BluepetIcon from './icons/BluepetIcon.vue'

const emit = defineEmits<{
  (e: 'pause'): void
  (e: 'settings'): void
}>()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white z-10">
    <div class="flex-shrink-0">
      <BluepetIcon class="w-10 h-10" />
    </div>

    <div class="flex items-center gap-4 flex-shrink-0 ml-auto">
      <button 
        class="p-2 hover:bg-brand-gray-light rounded-full transition-colors shadow-button-giraffe shadow-button-circle"
        @click="emit('pause')"
      >
        <Pause class="w-5 h-5 text-brand-gray-dark" />
      </button>
      <button 
        class="p-2 hover:bg-brand-gray-light rounded-full transition-colors shadow-button-giraffe shadow-button-circle"
        @click="emit('settings')"
      >
        <Ellipsis class="w-5 h-5 text-brand-gray-dark" />
      </button>
    </div>
  </header>
</template> 