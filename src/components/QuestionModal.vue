<script setup lang="ts">
import GiraffeNumberButton from './GiraffeNumberButton.vue'

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
  <transition name="slide-up">
    <div
      v-if="props.visible"
      class="fixed bottom-0 left-0 right-0 z-50"
    >
      <div
        class="bg-giraffe-stroke text-white p-4 sm:p-6 rounded-t-2xl w-full flex flex-col items-center shadow-xl"
      >
        <h2 class="text-xl sm:text-2xl font-gabarito font-semibold mb-4 text-center">
          What should be the number for the new giraffe?
        </h2>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <GiraffeNumberButton
            v-for="option in props.options"
            :key="option"
            :number="option"
            @select="handleSelect(option)"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
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