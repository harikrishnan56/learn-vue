<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Giraffe from './giraffe/Giraffe.vue'

interface GiraffeData {
  id: string
  height: number
  color: string
}

// Colors for different giraffes
const giraffeColors = [
  'brand-yellow',
  'brand-orange',
  'brand-teal',
  'brand-green-light'
]

// Generate random giraffes with heights
const giraffes = ref<GiraffeData[]>([])

// Drag state
const draggedGiraffe = ref<GiraffeData | null>(null)
const dragOverGiraffe = ref<GiraffeData | null>(null)

// Function to generate random giraffes
const generateGiraffes = (count = 4) => {
  const newGiraffes: GiraffeData[] = []
  
  for (let i = 0; i < count; i++) {
    // Generate height between 1-20 (game units)
    const height = Math.floor(Math.random() * 20) + 1
    
    newGiraffes.push({
      id: (i + 1).toString(),
      height,
      color: giraffeColors[i % giraffeColors.length] // Keep fixed color based on index
    })
  }
  
  giraffes.value = newGiraffes
}

// Scale the visual representation based on heights
const getGiraffeScale = (height: number) => {
  const minHeight = 1
  const maxHeight = 20
  const minScale = 100
  const maxScale = 200
  
  // Calculate scale proportionally to height
  return minScale + ((height - minHeight) / (maxHeight - minHeight)) * (maxScale - minScale)
}

// Generate giraffes on component mount
onMounted(() => {
  generateGiraffes(4)
})

// Drag and drop handlers
function handleDragStart(e: DragEvent, giraffe: GiraffeData) {
  draggedGiraffe.value = giraffe
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  return false
}

function handleDragEnter(e: DragEvent, giraffe: GiraffeData) {
  if (draggedGiraffe.value && draggedGiraffe.value.id !== giraffe.id) {
    dragOverGiraffe.value = giraffe
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  
  if (!draggedGiraffe.value || !dragOverGiraffe.value || draggedGiraffe.value.id === dragOverGiraffe.value.id) {
    return
  }
  
  // Find indexes
  const draggedIndex = giraffes.value.findIndex(g => g.id === draggedGiraffe.value?.id)
  const dropIndex = giraffes.value.findIndex(g => g.id === dragOverGiraffe.value?.id)
  
  if (draggedIndex !== -1 && dropIndex !== -1) {
    // Remove dragged item
    const [movedItem] = giraffes.value.splice(draggedIndex, 1)
    // Insert at new position
    giraffes.value.splice(dropIndex, 0, movedItem)
  }
  
  // Reset
  draggedGiraffe.value = null
  dragOverGiraffe.value = null
  
  return false
}

function handleDragEnd() {
  draggedGiraffe.value = null
  dragOverGiraffe.value = null
}

// Helper to determine if an item is being dragged over
const isDragOver = (id: string) => 
  dragOverGiraffe.value?.id === id && draggedGiraffe.value?.id !== id
</script>

<template>
  <main class="container mx-auto px-4 py-6">
    <div class="flex flex-col items-center max-w-xl mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-xl font-gabarito font-normal text-brand-blue mb-2">Order the giraffes based on their height</h2>
      </div>
      
      <div class="flex justify-around items-end w-full mb-8">
        <div 
          v-for="giraffe in giraffes" 
          :key="giraffe.id" 
          class="flex flex-col items-center cursor-move"
          draggable="true"
          @dragstart="(e) => handleDragStart(e, giraffe)"
          @dragover="handleDragOver"
          @dragenter="(e) => handleDragEnter(e, giraffe)"
          @drop="handleDrop"
          @dragend="handleDragEnd"
          :class="[
            'transform transition-transform duration-200',
            isDragOver(giraffe.id) ? 'translate-y-2' : ''
          ]"
        >
          <Giraffe
            :height="getGiraffeScale(giraffe.height)"
            :color="giraffe.color"
            :id="giraffe.id"
            :head-size="30 + (giraffe.height - 1) / 5"
            :body-width="20 + (giraffe.height - 1) / 10"
          />
          <div class="mt-2 text-center">
            <span class="font-gabarito font-bold">{{ giraffe.height }}</span>
          </div>
        </div>
      </div>
      
      <div class="w-full p-4 bg-brand-gray-light rounded-lg">
        <p class="text-center text-brand-gray-dark">
          Drag and rearrange the giraffes from tallest to shortest
        </p>
      </div>
    </div>
  </main>
</template> 