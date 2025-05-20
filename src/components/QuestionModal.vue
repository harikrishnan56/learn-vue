<script setup lang="ts">
import GameButton from './GameButton.vue'

interface Props {
  visible: boolean
  options: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', value: number): void
}>()

function handleSelect(value: number) {
  emit('select', value)
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.visible"
      class="bg-giraffe-stroke text-white p-6 sm:p-12 rounded-t-2xl w-full flex flex-col items-center shadow-xl"
    >
      <h2 class="text-xl sm:text-2xl font-gabarito font-semibold mb-4 text-center">
        What should be the number for the new giraffe?
      </h2>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <GameButton
          v-for="option in props.options"
          :key="option"
          :value="option"
          variant="secondary"
          @select="handleSelect(option)"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Keep slide-up if needed elsewhere, but not used by this component's root anymore */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
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