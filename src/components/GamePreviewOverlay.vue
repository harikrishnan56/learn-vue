<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'start'): void
}>()

const overlayClasses = ref('opacity-0 pointer-events-none')

function handleClose() {
  emit('close')
}

function handleStart() {
  emit('start')
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

      <div class="bg-brand-gray-light rounded-[10px] p-4 mb-6">
        <h3 class="font-gabarito font-bold mb-4">Compare the numbers and find out who is taller!</h3>
        <div class="bg-brand-white rounded-[10px] h-[200px] mb-4"></div>
        <BaseButton
          label="Let's go!"
          variant="primary"
          width="w-full"
          @click="handleStart"
        />
      </div>

      <div class="space-y-4">
        <h3 class="font-gabarito font-bold">Description</h3>
        <div class="flex items-center justify-between">
          <div class="flex gap-6">
            <button class="w-10 h-10 rounded-[10px] bg-brand-gray-light flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="w-10 h-10 rounded-[10px] bg-brand-gray-light flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2"/>
                <path d="M3 9H21" stroke="currentColor" stroke-width="2"/>
                <path d="M9 21V9" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            <button class="w-10 h-10 rounded-[10px] bg-brand-gray-light flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-brand-gray-light"></div>
            <div class="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-brand-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-gabarito font-bold">Topics Covered</h3>
      </div>
    </div>
  </div>
</template> 