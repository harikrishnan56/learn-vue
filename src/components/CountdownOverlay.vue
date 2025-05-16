<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'countdownComplete'): void
}>()

const currentText = ref('Ready?')
const isAnimating = ref(false)

function startCountdown() {
  isAnimating.value = true
  const sequence = ['Ready?', '3', '2', '1']
  let currentIndex = 0

  const interval = setInterval(() => {
    currentIndex++
    if (currentIndex < sequence.length) {
      currentText.value = sequence[currentIndex]
    } else {
      clearInterval(interval)
      setTimeout(() => {
        emit('countdownComplete')
      }, 500)
    }
  }, 500)
}

onMounted(() => {
  if (props.isVisible) {
    startCountdown()
  }
})
</script>

<template>
  <div 
    :class="[
      'fixed inset-0 bg-brand-white flex items-center justify-center transition-opacity duration-300',
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