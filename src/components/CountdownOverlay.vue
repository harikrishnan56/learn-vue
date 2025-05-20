<script setup lang="ts">
import { ref, watch } from 'vue'
import BluepetIcon from './icons/BluepetIcon.vue'

interface Props {
  isVisible: boolean
  objectiveText?: string
}

const props = withDefaults(defineProps<Props>(), {
  objectiveText: 'Order the giraffes based on their Height'
})
const emit = defineEmits<{
  (e: 'countdownComplete'): void
}>()

const currentText = ref('Ready?')
const isAnimating = ref(false) // Will be used by the original template if restored
const showObjective = ref(false)
let countdownInterval: number | undefined = undefined

function startCountdownSequence() {
  currentText.value = 'Ready?'
  isAnimating.value = true
  showObjective.value = false
  const sequence = ['Ready?', '3', '2', '1']
  let currentIndex = 0

  if (countdownInterval) {
    clearInterval(countdownInterval)
  }

  countdownInterval = setInterval(() => {
    currentIndex++
    if (currentIndex < sequence.length) {
      currentText.value = sequence[currentIndex]
    } else {
      clearInterval(countdownInterval)
      countdownInterval = undefined
      isAnimating.value = false
      showObjective.value = true
      setTimeout(() => {
        emit('countdownComplete')
      }, 1500) // Original objective display time
    }
  }, 500) // Original interval time
}

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    startCountdownSequence()
  } else {
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = undefined
    }
    isAnimating.value = false
    showObjective.value = false
    currentText.value = 'Ready?'
  }
}, { immediate: props.isVisible }) // Ensure it runs if initially visible

</script>

<template>
  <div 
    :class="[
      'fixed inset-0 bg-brand-white flex items-center justify-center transition-opacity duration-300 z-50',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    ]"
  >
    <div v-if="showObjective" class="absolute top-8 left-8 z-10">
      <BluepetIcon width="41" height="39" />
    </div>

    <div v-if="!showObjective"
      :class="[
        'text-[72px] font-gabarito font-bold text-brand-blue transition-all duration-300 transform',
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      ]"
    >
      {{ currentText }}
    </div>
    
    <div v-if="showObjective" class="flex flex-col items-center justify-center transition-opacity duration-300 w-full" :class="{ 'opacity-100': isVisible && showObjective, 'opacity-0': !isVisible || !showObjective }">
      <p class="text-lg font-gabarito font-medium text-brand-blue text-center">{{ props.objectiveText }}</p>
    </div>

  </div>
</template> 