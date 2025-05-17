<template>
  <transition name="slide-up">
    <div v-if="visible" class="fixed left-0 right-0 bottom-0 flex justify-center z-50">
      <div class="bg-[#3A8737] text-white p-6 rounded-t-2xl w-11/12 max-w-md mx-auto">
        <h2 class="text-3xl font-gabarito font-normal mb-2">Awesome!</h2>
        <p class="text-lg mb-6">The giraffes are now in order.</p>
        <BaseButton label="Continue" variant="secondary" @click="onContinue" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import BaseButton from './BaseButton.vue'

interface Props {
  visible: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'continue'): void
}>()

function onContinue() {
  emit('continue')
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style> 