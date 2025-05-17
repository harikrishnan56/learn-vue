<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const selectedNumber = ref<number | null>(null)

const generateGiraffes = (count = 3) => {
  const newGiraffes: GiraffeData[] = []
  
  for (let i = 0; i < count; i++) {
    const height = Math.floor(Math.random() * 20) + 1
    
    newGiraffes.push({
      id: (i + 1).toString(),
      height
    })
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
  const correctOrder = [...currentOrder].sort((a, b) => b - a)
  
  const incorrectPositions = currentOrder.reduce((acc, height, index) => {
    if (height !== correctOrder[index]) {
      acc.push({
        position: index + 1,
        current: height,
        expected: correctOrder[index]
      })
    }
    return acc
  }, [] as { position: number; current: number; expected: number }[])
  
  isCorrect.value = incorrectPositions.length === 0
  
  if (isCorrect.value) {
    setTimeout(() => {
      showFeedback.value = false
      router.push('/game?level=2')
    }, 2000)
  } else {
    setTimeout(() => {
      showFeedback.value = false
    }, 2000)
  }
}

const handleDragGiraffe = (sourceId: string, targetId: string) => {
  const sourceIndex = giraffes.value.findIndex(g => g.id === sourceId)
  const targetIndex = giraffes.value.findIndex(g => g.id === targetId)
  
  if (sourceIndex !== -1 && targetIndex !== -1) {
    const [movedItem] = giraffes.value.splice(sourceIndex, 1)
    giraffes.value.splice(targetIndex, 0, movedItem)
  }
}

const handleNumberSelect = (value: number) => {
  selectedNumber.value = value
  console.log(`Selected number: ${value}`)
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
      :giraffe-heights="giraffes.map((g: GiraffeData) => g.height)"
      @check="handleCheck"
      @selectNumber="handleNumberSelect"
      @moveGiraffe="handleDragGiraffe"
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