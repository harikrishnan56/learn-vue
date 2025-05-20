<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-0 bg-black/50 z-50">
      <div
        class="absolute left-0 right-0 bottom-0 mx-auto bg-[#3A8737] text-white p-8 rounded-t-2xl w-full flex flex-col items-center"
        :style="{ backgroundColor: bgColor }"
      >
        <h2 class="text-3xl font-gabarito font-normal mb-2">{{ title }}</h2>
        <p class="text-lg mb-6">{{ message }}</p>
        <BaseButton :label="buttonLabel" variant="secondary" @click="onContinue" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

interface Props {
  visible: boolean
  type?: 'success' | 'error'
  gameMode?: 'orderByHeight' | 'findMissingNumber' | 'comparisonQuiz' | 'binaryComparisonSymbols' | 'orderByTownPopulation'
}

const props = withDefaults(defineProps<Props>(), { 
  type: 'success',
  gameMode: 'orderByHeight'
})

const title = computed(() => props.type === 'success' ? 'Awesome!' : 'Oh no!')

const message = computed(() => {
  if (props.type === 'success') {
    return props.gameMode === 'orderByTownPopulation'
      ? 'You ordered the towns correctly!'
      : props.gameMode === 'orderByHeight'
        ? 'The giraffes are now in order.'
        : props.gameMode === 'findMissingNumber'
          ? 'You found the correct number!'
          : props.gameMode === 'binaryComparisonSymbols'
            ? 'You compared the giraffes correctly!'
            : 'You found the correct answer!'
  } else {
    return props.gameMode === 'orderByTownPopulation'
      ? 'That\'s not the right order. Try again!'
      : props.gameMode === 'orderByHeight'
        ? 'The giraffes are still mixed up!'
        : props.gameMode === 'findMissingNumber'
          ? 'That\'s not the right number. Try again!'
          : props.gameMode === 'binaryComparisonSymbols'
            ? 'That\'s not the right comparison. Try again!'
            : 'That\'s not the right answer. Try again!'
  }
})

const buttonLabel = computed(() => props.type === 'success' ? 'Continue' : 'Try Again')
const bgColor = computed(() => props.type === 'success' ? '#3A8737' : '#C24545')

const emit = defineEmits<{
  (e: 'continue'): void
}>()

function onContinue() {
  emit('continue')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style> 