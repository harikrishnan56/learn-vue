<script setup lang="ts">
import { Pause, Ellipsis } from 'lucide-vue-next'
import BluepetIcon from './icons/BluepetIcon.vue'

defineProps<{ 
  visible?: boolean
  objectiveText?: string
  showObjective?: boolean
}>()

const emit = defineEmits<{
  (e: 'pause'): void
  (e: 'settings'): void
}>()
</script>

<template>
  <Transition name="fade">
    <header v-if="visible" class="fixed top-0 left-0 right-0 flex flex-col bg-white z-10">
      <div class="flex items-center justify-between p-4">
        <div class="flex-shrink-0">
          <BluepetIcon class="w-10 h-10" />
        </div>

        <div class="flex items-center gap-4 flex-shrink-0 ml-auto">
          <button 
            class="p-2 hover:bg-brand-gray-light rounded-full transition-colors shadow-button-gray shadow-button-circle"
            @click="emit('pause')"
          >
            <Pause class="w-5 h-5 text-brand-gray-dark" />
          </button>
          <button 
            class="p-2 hover:bg-brand-gray-light rounded-full transition-colors shadow-button-gray shadow-button-circle"
            @click="emit('settings')"
          >
            <Ellipsis class="w-5 h-5 text-brand-gray-dark" />
          </button>
        </div>
      </div>
      <Transition name="slide-up">
        <div v-if="showObjective" class="text-center pb-4">
          <p class="text-lg font-gabarito font-medium text-brand-blue">{{ objectiveText }}</p>
        </div>
      </Transition>
    </header>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 