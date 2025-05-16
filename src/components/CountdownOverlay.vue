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
let countdownInterval: number | undefined = undefined;

function startCountdownSequence() {
  currentText.value = 'Ready?' // Reset text
  isAnimating.value = true
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
      setTimeout(() => {
        emit('countdownComplete')
        isAnimating.value = false // Reset animation state
      }, 500)
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
    isAnimating.value = false; // Ensure animation stops if overlay is hidden mid-countdown
    currentText.value = 'Ready?'; // Reset for next time
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
    <div 
      :class="[
        'text-[72px] font-gabarito font-bold text-brand-teal transition-all duration-300 transform',
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ]"
    >
      {{ currentText }}
    </div>
  </div>
</template> 