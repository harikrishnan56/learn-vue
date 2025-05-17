<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameHeader from '../components/GameHeader.vue'
import GameContent from '../components/GameContent.vue'
import GameControls from '../components/GameControls.vue'

interface GiraffeData {
  id: string
  height: number
}

const router = useRouter()

// Game content is shown by default now, as countdown happens before this screen loads
const showGameContent = ref(true)

// Handle feedback state when user checks their answer
const showFeedback = ref(false)
const isCorrect = ref(false)

const giraffes = ref<GiraffeData[]>([])
const selectedNumberDisplayValue = ref<number | null>(null)

// Create a computed property to pass to GameControls
const giraffeControlsData = computed(() => {
  return giraffes.value.map(g => ({ id: g.id, height: g.height }))
})

const generateGiraffes = (count = 3) => {
  const newGiraffes: GiraffeData[] = []
  const usedHeights = new Set<number>()
  for (let i = 0; i < count; ) {
    const height = Math.floor(Math.random() * 20) + 5 // Ensure height is at least 5 for visibility
    if (!usedHeights.has(height)) {
      usedHeights.add(height)
      newGiraffes.push({
        id: `g-${Date.now()}-${i}`, // More unique ID
        height
      })
      i++
    }
  }
  giraffes.value = newGiraffes
}

const handlePause = () => {
  console.log('Game paused')
}

const handleSettings = () => {
  router.push('/settings')
}

const handleCheck = () => {
  showFeedback.value = true
  const currentOrder = giraffes.value.map(g => g.height)
  const correctOrder = [...currentOrder].sort((a, b) => a - b)
  
  isCorrect.value = JSON.stringify(currentOrder) === JSON.stringify(correctOrder)
  
  if (isCorrect.value) {
    setTimeout(() => {
      showFeedback.value = false
      // Potentially move to next level or show success
      generateGiraffes() // For now, just regenerate for a new round
    }, 2000)
  } else {
    setTimeout(() => {
      showFeedback.value = false
    }, 2000)
  }
}

// Renamed to handleMoveGiraffe to match emit from GameControls
const handleMoveGiraffe = (sourceId: string, targetId: string) => {
  const sourceIndex = giraffes.value.findIndex(g => g.id === sourceId)
  const targetIndex = giraffes.value.findIndex(g => g.id === targetId)
  
  if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
    const temp = giraffes.value[sourceIndex]
    giraffes.value[sourceIndex] = giraffes.value[targetIndex]
    giraffes.value[targetIndex] = temp
  }
}

const handleNumberSelect = (displayValue: number) => {
  selectedNumberDisplayValue.value = displayValue
}

onMounted(() => {
  generateGiraffes()
})
</script>

<template>
  <div class="min-h-screen bg-brand-white relative">
    <!-- Fixed header -->
    <GameHeader 
      @pause="handlePause"
      @settings="handleSettings"
      class="fixed top-0 left-0 right-0 z-10"
    />
    
    <!-- Main content area -->
    <div class="pt-[76px]">
      <GameContent 
        :giraffes="giraffes"
        class="pb-0 h-[calc(100vh-316px)]"
      />
    </div>
    
    <!-- Fixed controls -->
    <GameControls
      :giraffe-heights-data="giraffeControlsData"
      @check="handleCheck"
      @selectNumber="handleNumberSelect"
      @moveGiraffe="handleMoveGiraffe"
      class="fixed bottom-0 left-0 right-0 z-10"
    />
    
    <!-- Feedback overlay -->
    <div 
      v-if="showFeedback" 
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div 
        :class="[
          'p-8 rounded-2xl text-center transform transition-all duration-300',
          isCorrect ? 'bg-brand-green text-white' : 'bg-brand-orange text-white'
        ]"
      >
        <h2 class="text-3xl font-bold mb-2">
          {{ isCorrect ? 'Correct!' : 'Try Again!' }}
        </h2>
        <p class="text-lg">
          {{ isCorrect ? 'Great job ordering the giraffes!' : 'The order isn\'t quite right yet.' }}
        </p>
      </div>
    </div>
  </div>
</template> 