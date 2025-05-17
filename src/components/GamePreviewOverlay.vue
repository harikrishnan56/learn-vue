<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import CountdownOverlay from './CountdownOverlay.vue'

interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'gameStart'): void
}>()

const showCountdown = ref(false)

function handleClose() {
  emit('close')
}

function handleStartClick() {
  showCountdown.value = true
}

function handleCountdownComplete() {
  showCountdown.value = false
  emit('gameStart')
}
</script>

<template>
  <div 
    :class="[
      'fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]"
  >
    <div class="bg-brand-white rounded-[20px] w-full max-w-[360px] mx-4 p-6">
      <div class="flex items-center justify-between mb-8">
        <button 
          @click="handleClose"
          class="w-10 h-10 rounded-full bg-brand-gray-light flex items-center justify-center hover:bg-brand-gray-border transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h2 class="text-xl font-gabarito font-bold">The Tall Giraffe</h2>
      </div>

      <div class="bg-brand-gray-light rounded-[10px] p-4">
        <h3 class="font-gabarito font-bold mb-4 text-brand-black">Compare the numbers and find out who is taller!</h3>
        <div class="bg-brand-white rounded-[10px] h-[200px] mb-4"></div>
        <BaseButton
          label="Let's go!"
          variant="primary"
          width="w-full"
          @click="handleStartClick"
        />
      </div>
    </div>

    <CountdownOverlay
      :is-visible="showCountdown"
      @countdown-complete="handleCountdownComplete"
    />
  </div>
</template>