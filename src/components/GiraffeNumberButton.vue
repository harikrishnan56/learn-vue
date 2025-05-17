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
  (e: 'touchstart', event: TouchEvent): void
  (e: 'touchend', event: TouchEvent): void
}>()

function handleDragStart(e: DragEvent) {
  emit('dragstart', e)
}

function handleDragEnd() {
  emit('dragend')
}

function handleClick() {
  emit('select')
}

function handleTouchStart(e: TouchEvent) {
  emit('touchstart', e)
}

function handleTouchEnd(e: TouchEvent) {
  emit('touchend', e)
}
</script>

<template>
  <button
    draggable="true"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    :class="[
      'w-[98px] h-[61px] rounded-[10px] text-xl font-gabarito font-bold transition-all duration-200 cursor-move',
      'bg-giraffe-fill text-giraffe-stroke border border-giraffe-stroke shadow-button-giraffe',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-giraffe-stroke hover:bg-opacity-90',
      {
        'scale-105 border-2': props.selected
      }
    ]"
  >
    {{ number }}
  </button>
</template> 