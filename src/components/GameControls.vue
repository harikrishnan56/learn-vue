<script setup lang="ts">
import { ref } from 'vue'
import { GripVertical, MoveHorizontal } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import GiraffeNumberButton from './GiraffeNumberButton.vue'

interface NumberButton {
  id: number
  value: number
}

const selectedNumber = ref<number | null>(null)
const buttons = ref<NumberButton[]>([
  { id: 1, value: 3 },
  { id: 2, value: 4 },
  { id: 3, value: 5 }
])

const draggedButton = ref<NumberButton | null>(null)
const dragOverButton = ref<NumberButton | null>(null)

const emit = defineEmits<{
  (e: 'check'): void
  (e: 'selectNumber', value: number): void
}>()

function handleCheck() {
  emit('check')
}

function handleNumberSelect(number: number) {
  selectedNumber.value = number
  emit('selectNumber', number)
}

function handleDragStart(e: DragEvent, button: NumberButton) {
  draggedButton.value = button
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

function handleDragEnter(button: NumberButton) {
  if (draggedButton.value?.id !== button.id) {
    dragOverButton.value = button
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  
  if (!draggedButton.value || !dragOverButton.value || draggedButton.value.id === dragOverButton.value.id) {
    return
  }
  
  const draggedIndex = buttons.value.findIndex(b => b.id === draggedButton.value?.id)
  const dropIndex = buttons.value.findIndex(b => b.id === dragOverButton.value?.id)
  
  if (draggedIndex !== -1 && dropIndex !== -1) {
    const [movedButton] = buttons.value.splice(draggedIndex, 1)
    buttons.value.splice(dropIndex, 0, movedButton)
  }
  
  draggedButton.value = null
  dragOverButton.value = null
}

function handleDragEnd() {
  draggedButton.value = null
  dragOverButton.value = null
}

const isDragOver = (id: number) => dragOverButton.value?.id === id && draggedButton.value?.id !== id
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0">
    <div class="w-full h-2 bg-brand-green-strip"></div>
    <div class="bg-brand-green-light p-4 min-h-[238px] flex flex-col justify-center">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center gap-4 max-w-[360px] mx-auto">
          <div class="flex justify-center gap-4 w-full mb-4">
            <div
              v-for="button in buttons"
              :key="button.id"
              @dragenter="handleDragEnter(button)"
              @dragover="handleDragOver"
              @drop="handleDrop"
              class="flex flex-col gap-2 items-center"
              :class="[
                'transform transition-transform duration-200',
                isDragOver(button.id) ? 'translate-y-2' : ''
              ]"
            >
              <GiraffeNumberButton
                :number="button.value"
                :selected="selectedNumber === button.value"
                @select="handleNumberSelect(button.value)"
                @dragstart="(e) => handleDragStart(e, button)"
                @dragend="handleDragEnd"
              />
              <MoveHorizontal class="w-5 h-5 text-giraffe-stroke" />
            </div>
          </div>
          <div class="w-full">
            <BaseButton 
              label="Let's Check!" 
              variant="secondary"
              width="w-full"
              @click="handleCheck"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 