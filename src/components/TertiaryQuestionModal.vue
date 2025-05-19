<script setup lang="ts">
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

const emit = defineEmits<{
  (e: 'select', optionId: string): void
}>()

function handleSelect(optionId: string) {
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
        <button
          v-for="option in props.options"
          :key="option.id"
          class="bg-white text-brand-green-answer hover:bg-giraffe-fill transition-colors duration-200 
                 text-3xl font-gabarito font-semibold rounded-xl px-8 py-3 min-w-[80px] 
                 border border-brand-green-light shadow-answer-option"
          @click="handleSelect(option.id)"
        >
          {{ option.label }}
        </button>
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