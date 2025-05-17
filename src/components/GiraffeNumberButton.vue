<script setup lang="ts">
interface Props {
  number: number
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'dragstart', event: DragEvent): void
  (e: 'dragend'): void
}>()

function handleDragStart(e: DragEvent) {
  emit('dragstart', e)
}

function handleDragEnd() {
  emit('dragend')
}
</script>

<template>
  <button
    draggable="true"
    @click="emit('select')"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    class="w-[98px] h-[61px] rounded-[10px] text-xl font-gabarito font-bold transition-all duration-200 cursor-move
           bg-giraffe-fill text-giraffe-stroke border border-giraffe-stroke shadow-button-giraffe
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-giraffe-stroke hover:bg-opacity-90
           flex items-center justify-center"
  >
    {{ number }}
  </button>
</template> 