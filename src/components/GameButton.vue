<script setup lang="ts">
interface Props {
  value: string | number
  variant?: 'primary' | 'secondary' | 'tertiary'
  selected?: boolean
  draggable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  selected: false,
  draggable: false
})

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'dragstart', event: DragEvent): void
  (e: 'dragend'): void
  (e: 'touchstart', event: TouchEvent): void
  (e: 'touchend', event: TouchEvent): void
}>()

function handleDragStart(e: DragEvent) {
  if (props.draggable) {
    emit('dragstart', e)
  }
}

function handleDragEnd() {
  if (props.draggable) {
    emit('dragend')
  }
}

function handleClick() {
  emit('select')
}

function handleTouchStart(e: TouchEvent) {
  if (props.draggable) {
    emit('touchstart', e)
  }
}

function handleTouchEnd(e: TouchEvent) {
  if (props.draggable) {
    emit('touchend', e)
  }
}
</script>

<template>
  <button
    :draggable="draggable"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    :class="[
      'rounded-[10px] text-xl font-gabarito font-bold transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'w-[98px] h-[61px] bg-giraffe-fill text-giraffe-stroke border border-giraffe-stroke shadow-button-giraffe focus:ring-giraffe-stroke hover:bg-opacity-90 cursor-move': variant === 'primary',
        'w-[80px] h-[61px] bg-giraffe-fill text-[#77BA40] border border-[#77BA40] shadow-answer-option focus:ring-[#77BA40] hover:bg-opacity-90': variant === 'secondary',
        'min-w-[80px] px-8 py-3 bg-giraffe-fill text-[#77BA40] border border-[#77BA40] shadow-answer-option focus:ring-[#77BA40] hover:bg-opacity-90': variant === 'tertiary',
        'scale-105 border-2 bg-white': selected
      }
    ]"
  >
    {{ value }}
  </button>
</template> 