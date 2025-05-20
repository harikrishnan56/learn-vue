<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { MoveHorizontal } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import GameButton from './GameButton.vue'
import BinaryComparisonLabel from './BinaryComparisonLabel.vue'

interface GiraffeButtonData {
  id: string
  displayValue: number
  originalIndex: number
}

interface TownPopulationsDisplayData {
  pop1: number;
  pop2: number;
}

interface Props {
  giraffeHeightsData?: { id: string; height: number }[]
  controlsVisible?: boolean
  buttonsVisible?: boolean
  showInteractiveContent?: boolean
  binaryLabels?: Array<'A' | 'B'>
  townPopulationsForDisplay?: TownPopulationsDisplayData | null
}

const props = withDefaults(defineProps<Props>(), {
  giraffeHeightsData: () => [],
  controlsVisible: true,
  buttonsVisible: true,
  showInteractiveContent: true,
  binaryLabels: () => [],
  townPopulationsForDisplay: null
})

const selectedNumberValue = ref<number | null>(null)
const localButtons = ref<GiraffeButtonData[]>([])
const draggedButtonId = ref<string | null>(null)
const dragOverButtonId = ref<string | null>(null)
const isDragging = ref(false)

watch(
  () => props.giraffeHeightsData,
  (newGiraffeData) => {
    if (newGiraffeData) {
      localButtons.value = newGiraffeData.map((g, index) => ({
        id: g.id,
        displayValue: g.height,
        originalIndex: index
      }))
    }
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
  return document.querySelector(`[data-button-id='${id}']`) as HTMLElement | null
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
  if (!props.showInteractiveContent) return;
  isDragging.value = true
  draggedButtonId.value = buttonId
  const draggedElementWrapper = getButtonRef(buttonId)
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button')
    applyDragStyles(buttonElement)
  }
  if (event instanceof DragEvent && event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', buttonId)
  }
}

function onDragEnter(buttonId: string) {
  if (!props.showInteractiveContent) return;
  if (!draggedButtonId.value || draggedButtonId.value === buttonId) return
  dragOverButtonId.value = buttonId
}

function onDragOver(event: DragEvent | TouchEvent) {
  if (!props.showInteractiveContent) return;
  if (!draggedButtonId.value) return
  event.preventDefault()
  if (event instanceof DragEvent && event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function onDrop(targetButtonId: string) {
  if (!props.showInteractiveContent) return;
  if (!draggedButtonId.value || !targetButtonId || draggedButtonId.value === targetButtonId) {
    resetDragState()
    return
  }
  emit('moveGiraffe', draggedButtonId.value, targetButtonId)
  resetDragState()
}

function onDragEnd() {
  if (!props.showInteractiveContent) return;
  const draggedElementWrapper = getButtonRef(draggedButtonId.value || '')
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button')
    clearDragStyles(buttonElement)
  }
  resetDragState()
}

function resetDragState() {
  isDragging.value = false
  draggedButtonId.value = null
  dragOverButtonId.value = null
}

let currentTouchTargetId: string | null = null

function onTouchStart(event: TouchEvent, buttonId: string) {
  if (!props.showInteractiveContent) return;
  onDragStart(event, buttonId)
}

function onTouchMove(event: TouchEvent) {
  if (!props.showInteractiveContent) return;
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
  if (!props.showInteractiveContent) return;
  const draggedElementWrapper = getButtonRef(draggedButtonId.value || '')
  if (draggedElementWrapper) {
    const buttonElement = draggedElementWrapper.querySelector('button')
    clearDragStyles(buttonElement)
  }
  if (draggedButtonId.value && currentTouchTargetId && draggedButtonId.value !== currentTouchTargetId) {
    onDrop(currentTouchTargetId)
  }
  resetDragState()
  currentTouchTargetId = null
}

const getDisplayNumber = (button: GiraffeButtonData) => {
  const giraffeData = props.giraffeHeightsData?.find(g => g.id === button.id)
  return giraffeData ? giraffeData.height : button.displayValue
}
</script>

<template>
  <Transition name="fade">
    <div v-if="props.controlsVisible" class="w-full">
      <div class="w-full h-2 bg-brand-green-strip"></div>
      <div
        class="bg-brand-green-light p-4 min-h-[238px] relative"
        @touchmove.prevent="onTouchMove" 
        @touchend.prevent="onTouchEnd"
      >
        <!-- Town Populations Display - shown for findTownPopulation mode -->
        <div 
          v-if="props.townPopulationsForDisplay && !props.showInteractiveContent"
          class="w-full flex justify-around items-center bg-[#83CA54] py-3 px-4 sm:px-8 text-xl font-semibold text-white mb-4 rounded-md"
        >
          <div>{{ props.townPopulationsForDisplay.pop1 }}</div>
          <div class="text-2xl">?</div>
          <div>{{ props.townPopulationsForDisplay.pop2 }}</div>
        </div>

        <!-- Binary Labels - shown only in binary comparison mode (no interactive content) -->
        <div 
          v-if="props.binaryLabels && props.binaryLabels.length > 0 && !props.showInteractiveContent && !props.townPopulationsForDisplay"
          class="flex justify-around items-center w-full max-w-xl mx-auto mb-2" 
        >
          <BinaryComparisonLabel 
            v-for="label in props.binaryLabels" 
            :key="label" 
            :label="label"
          />
        </div>

        <div v-if="!props.showInteractiveContent">
          <slot name="modalContent"></slot>
        </div>

        <!-- Interactive Controls - shown only in orderByHeight mode -->
        <div 
          v-if="props.buttonsVisible && props.showInteractiveContent"
          class="flex flex-col items-center justify-center gap-4 w-full sm:max-w-[360px] mx-auto h-full pt-2"
        >
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
                  'scale-110': dragOverButtonId === button.id && draggedButtonId !== button.id
                }
              ]"
            >
              <GameButton
                :value="getDisplayNumber(button)"
                :selected="selectedNumberValue === getDisplayNumber(button)"
                variant="primary"
                draggable
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
              @touchstart="handleCheck"
              @touchend="() => {}"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 