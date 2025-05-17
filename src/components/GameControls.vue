<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { MoveHorizontal } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import GiraffeNumberButton from './GiraffeNumberButton.vue'

interface GiraffeButtonData {
  id: string
  displayValue: number 
  originalIndex: number
}

interface Props {
  giraffeHeightsData: { id: string; height: number }[]
}

const props = defineProps<Props>()

const selectedNumberValue = ref<number | null>(null)
const localButtons = ref<GiraffeButtonData[]>([])

const draggedButtonId = ref<string | null>(null)
const dragOverButtonId = ref<string | null>(null)
const isDragging = ref(false)

watch(
  () => props.giraffeHeightsData,
  (newGiraffeData) => {
    localButtons.value = newGiraffeData.map((g, index) => ({
      id: g.id,
      displayValue: g.height,
      originalIndex: index
    }))
  },
  { immediate: true, deep: true }
)

const emit = defineEmits<{
  (e: 'check'): void
  (e: 'selectNumber', value: number): void
  (e: 'moveGiraffe', sourceId: string, targetId: string): void
}>()

function handleCheck() {
  emit('check')
}

function handleNumberSelect(buttonData: GiraffeButtonData) {
  selectedNumberValue.value = buttonData.displayValue
  emit('selectNumber', buttonData.displayValue)
}

const getButtonRef = (id: string) => {
  return document.querySelector(`[data-button-id='${id}']`) as HTMLElement | null;
}

function applyDragStyles(element: HTMLElement | null) {
  if (element) {
    element.style.transform = 'scale(0.95)'
  }
}

function clearDragStyles(element: HTMLElement | null) {
  if (element) {
    element.style.transform = ''
    element.style.opacity = '' 
  }
}

function onDragStart(event: DragEvent | TouchEvent, buttonId: string) {
  isDragging.value = true
  draggedButtonId.value = buttonId

  const draggedElementWrapper = getButtonRef(buttonId)
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button');
    applyDragStyles(buttonElement);
  }

  if (event instanceof DragEvent && event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', buttonId)
  }
}

function onDragEnter(buttonId: string) {
  if (!draggedButtonId.value || draggedButtonId.value === buttonId) return
  dragOverButtonId.value = buttonId
}

function onDragOver(event: DragEvent | TouchEvent) {
  if (!draggedButtonId.value) return
  event.preventDefault()
  if (event instanceof DragEvent && event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function onDrop(targetButtonId: string) {
  if (!draggedButtonId.value || !targetButtonId || draggedButtonId.value === targetButtonId) {
    resetDragState()
    return
  }
  emit('moveGiraffe', draggedButtonId.value, targetButtonId)
  resetDragState()
}

function onDragEnd() {
  const draggedElementWrapper = getButtonRef(draggedButtonId.value || '')
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button');
    clearDragStyles(buttonElement);
  }
  resetDragState()
}

function resetDragState() {
  isDragging.value = false
  draggedButtonId.value = null
  dragOverButtonId.value = null
}

let currentTouchTargetId: string | null = null;

function onTouchStart(event: TouchEvent, buttonId: string) {
  onDragStart(event, buttonId)
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging.value || !draggedButtonId.value) return
  event.preventDefault()
  const touch = event.touches[0]
  const elementOver = document.elementFromPoint(touch.clientX, touch.clientY)
  
  if (elementOver) {
    const buttonWrapper = elementOver.closest('[data-button-id]')
    if (buttonWrapper) {
      const targetId = buttonWrapper.getAttribute('data-button-id')
      if (targetId && targetId !== draggedButtonId.value) {
        dragOverButtonId.value = targetId
        currentTouchTargetId = targetId
      } else if (targetId === draggedButtonId.value) {
        dragOverButtonId.value = null 
        currentTouchTargetId = null
      }
    } else {
       dragOverButtonId.value = null
       currentTouchTargetId = null
    }
  } else {
    dragOverButtonId.value = null
    currentTouchTargetId = null
  }
}

function onTouchEnd() {
  const draggedElementWrapper = getButtonRef(draggedButtonId.value || '')
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button');
    clearDragStyles(buttonElement);
  }

  if (draggedButtonId.value && currentTouchTargetId && draggedButtonId.value !== currentTouchTargetId) {
    onDrop(currentTouchTargetId)
  }
  resetDragState()
  currentTouchTargetId = null
}

const getDisplayNumber = (button: GiraffeButtonData) => {
  const giraffeData = props.giraffeHeightsData.find(g => g.id === button.id);
  return giraffeData ? giraffeData.height : button.displayValue;
}

</script>

<template>
  <div class="fixed bottom-0 left-0 right-0">
    <div class="w-full h-2 bg-brand-green-strip"></div>
    <div class="bg-brand-green-light p-4 min-h-[238px] flex flex-col justify-center" 
         @touchmove.prevent="onTouchMove" 
         @touchend.prevent="onTouchEnd"
    >
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center gap-4 w-full sm:max-w-[360px] mx-auto">
          <div class="flex justify-center gap-2 md:gap-4 w-full mb-4">
            <div
              v-for="button in localButtons"
              :key="button.id"
              :data-button-id="button.id" 
              @dragenter.prevent="onDragEnter(button.id)"
              @dragover.prevent="onDragOver"
              @drop.prevent="onDrop(button.id)"
              class="flex flex-col gap-1 items-center relative"
              :class="[
                'transform transition-all duration-150',
                {
                  'scale-110': dragOverButtonId === button.id && draggedButtonId !== button.id,
                }
              ]"
            >
              <GiraffeNumberButton
                :number="getDisplayNumber(button)" 
                :selected="selectedNumberValue === getDisplayNumber(button)"
                @select="handleNumberSelect(button)"
                @dragstart="(e) => onDragStart(e, button.id)"
                @dragend="onDragEnd"
                @touchstart.stop="(e) => onTouchStart(e, button.id)"
              />
              <MoveHorizontal 
                class="w-5 h-5 text-giraffe-stroke transition-opacity duration-200"
                :class="{ 'opacity-30': isDragging && draggedButtonId !== button.id, 'opacity-100': !isDragging }"
              />
            </div>
          </div>
          <div class="w-full">
            <BaseButton 
              label="Let's Check!" 
              variant="secondary"
              width="w-full"
              :disabled="isDragging"
              @click="handleCheck"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 