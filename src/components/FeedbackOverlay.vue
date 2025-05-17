<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-0 bg-black/50 z-50">
      <div class="absolute left-0 right-0 bottom-0 mb-4 mx-auto bg-[#3A8737] text-white p-8 rounded-t-2xl w-11/12 max-w-md">
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
  transform: translateY(100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style> 