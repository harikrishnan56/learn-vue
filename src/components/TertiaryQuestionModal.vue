<script setup lang="ts">
import { ref } from 'vue'
import GameButton from './GameButton.vue'

interface Option {
  id: string
  label: string
}

interface Props {
  visible: boolean
  questionText: string
  options: Option[]
}

const props = defineProps<Props>()
const selectedOptionId = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'select', optionId: string): void
}>()

function handleSelect(optionId: string) {
  selectedOptionId.value = optionId
  emit('select', optionId)
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.visible"
      class="bg-giraffe-stroke text-white p-6 sm:p-12 rounded-2xl w-full flex flex-col items-center shadow-xl"
    >
      <h2 class="text-base font-gabarito font-medium mb-4 text-center">
        {{ questionText }}
      </h2>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <GameButton
          v-for="option in props.options"
          :key="option.id"
          :value="option.label"
          :selected="selectedOptionId === option.id"
          variant="tertiary"
          @select="handleSelect(option.id)"
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