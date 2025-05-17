<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import GiraffeItem from './GiraffeItem.vue'

interface Giraffe {
  id: string
  height: number
  color: string
}

const giraffes = reactive<Giraffe[]>([
  { id: '1', height: 15, color: 'brand-yellow' },
  { id: '2', height: 8, color: 'brand-orange' },
  { id: '3', height: 12, color: 'brand-teal' },
  { id: '4', height: 18, color: 'brand-green' },
])

const selectedGiraffeId = ref<string | null>(null)
const draggedItem = ref<null | Giraffe>(null)
const dragOverItem = ref<null | Giraffe>(null)

const selectGiraffe = (id: string) => {
  selectedGiraffeId.value = id
}

const handleDragStart = (e: DragEvent, giraffe: Giraffe) => {
  draggedItem.value = giraffe
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', giraffe.id)
  }
}

const handleDragEnter = (e: DragEvent, giraffe: Giraffe) => {
  e.preventDefault()
  dragOverItem.value = giraffe
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  return false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  // If no items to swap, do nothing
  if (!draggedItem.value || !dragOverItem.value || draggedItem.value.id === dragOverItem.value.id) {
    return
  }
  
  // Find indexes
  const draggedIndex = giraffes.findIndex(item => item.id === draggedItem.value?.id)
  const dropIndex = giraffes.findIndex(item => item.id === dragOverItem.value?.id)
  
  if (draggedIndex !== -1 && dropIndex !== -1) {
    // Remove dragged item
    const [movedItem] = giraffes.splice(draggedIndex, 1)
    // Insert at new position
    giraffes.splice(dropIndex, 0, movedItem)
  }
  
  // Reset
  draggedItem.value = null
  dragOverItem.value = null
  
  return false
}

const handleDragEnd = () => {
  draggedItem.value = null
  dragOverItem.value = null
}

const isDragOver = (id: string) => dragOverItem.value?.id === id && draggedItem.value?.id !== id

// Helper function to determine if giraffes are sorted by height
const areSortedByHeight = computed(() => {
  for (let i = 0; i < giraffes.length - 1; i++) {
    if (giraffes[i].height < giraffes[i + 1].height) {
      return false
    }
  }
  return true
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-md mx-auto">
    <div v-for="giraffe in giraffes" 
         :key="giraffe.id"
         draggable="true"
         @dragstart="handleDragStart($event, giraffe)"
         @dragenter="handleDragEnter($event, giraffe)"
         @dragover="handleDragOver"
         @drop="handleDrop"
         @dragend="handleDragEnd"
         :class="[
           'transform transition-transform duration-200',
           isDragOver(giraffe.id) ? 'translate-y-2' : ''
         ]"
    >
      <GiraffeItem 
        :height="giraffe.height" 
        :id="giraffe.id" 
        :giraffe-color="giraffe.color"
        :is-selected="giraffe.id === selectedGiraffeId"
        @select="selectGiraffe(giraffe.id)"
      />
    </div>
  </div>
</template> 