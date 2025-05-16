<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'countdownComplete'): void
}>()

const currentText = ref('Ready?')
const isAnimating = ref(false)
const showObjective = ref(false)
let countdownInterval: number | undefined = undefined;

function startCountdownSequence() {
  currentText.value = 'Ready?' // Reset text
  isAnimating.value = true
  showObjective.value = false; // Ensure objective is hidden initially
  const sequence = ['Ready?', '3', '2', '1']
  let currentIndex = 0

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    currentIndex++
    if (currentIndex < sequence.length) {
      currentText.value = sequence[currentIndex]
    } else {
      clearInterval(countdownInterval)
      countdownInterval = undefined;
      isAnimating.value = false; // Hide the countdown text animation
      showObjective.value = true; // Show the objective content
      setTimeout(() => {
        emit('countdownComplete')
        // The overlay will be hidden by the parent component after this event
      }, 500); // Keep objective visible briefly before countdownComplete is emitted
    }
  }, 500)
}

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    startCountdownSequence()
  } else {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = undefined;
    }
    isAnimating.value = false;
    showObjective.value = false;
    currentText.value = 'Ready?'; // Reset text for next time
  }
})

</script>

<template>
  <div 
    :class="[
      'fixed inset-0 bg-brand-white flex items-center justify-center transition-opacity duration-300 z-50',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]"
  >
    <div v-if="!showObjective"
      :class="[
        'text-[72px] font-gabarito font-bold text-brand-blue transition-all duration-300 transform',
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ]"
    >
      {{ currentText }}
    </div>
    
    <div v-if="showObjective" class="flex flex-col items-center justify-center transition-opacity duration-300" :class="{ 'opacity-100': isVisible && showObjective, 'opacity-0': !isVisible || !showObjective }">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-brand-teal mb-4">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 14.5C8 14.5 9.5 16 12 16C14.5 16 16 14.5 16 14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 9H15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="text-lg font-gabarito font-medium text-brand-blue text-center">Order the giraffes based on their Height</p>
    </div>

  </div>
</template> 