<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div class="bg-brand-green text-white p-8 rounded-t-2xl w-11/12 max-w-md">
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
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style> 