<script setup lang="ts">
import { Pause, Settings } from 'lucide-vue-next'
import BluepetIcon from './icons/BluepetIcon.vue'

interface Props {
  objective: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'pause'): void
  (e: 'settings'): void
}>()
</script>

<template>
  <header class="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white border-b border-brand-gray-border z-10">
    <div class="flex-shrink-0">
      <BluepetIcon class="w-10 h-10" />
    </div>

    <div class="flex-grow text-center max-w-[500px] mx-4">
      <h1 class="text-lg font-gabarito font-medium text-brand-blue truncate">{{ props.objective }}</h1>
    </div>

    <div class="flex items-center gap-4 flex-shrink-0">
      <button 
        class="p-2 hover:bg-brand-gray-light rounded-full transition-colors"
        @click="emit('pause')"
      >
        <Pause class="w-5 h-5 text-brand-gray-dark" />
      </button>
      <button 
        class="p-2 hover:bg-brand-gray-light rounded-full transition-colors"
        @click="emit('settings')"
      >
        <Settings class="w-5 h-5 text-brand-gray-dark" />
      </button>
    </div>
  </header>
</template> 