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

interface GiraffeDisplayState extends GiraffeData {
  speechText: string | null
  currentMood: 'happy' | 'confused' | 'idle' | 'sad'
}

const router = useRouter()

const showGameContent = ref(true)

const isOverallCorrect = ref(false)

const giraffes = ref<GiraffeData[]>([])
const selectedNumberDisplayValue = ref<number | null>(null)

const showSpeechBubblesGlobal = ref(false)
const giraffeDisplayStates = ref<GiraffeDisplayState[]>([])

const giraffeControlsData = computed(() => {
  return giraffes.value.map(g => ({ id: g.id, height: g.height }))
})

const gameContentData = computed(() => {
  return giraffes.value.map(g => {
    const displayState = giraffeDisplayStates.value.find(s => s.id === g.id)
    return {
      ...g,
      speechText: displayState?.speechText || null,
      currentMood: displayState?.currentMood || 'happy',
      showSpeechBubble: showSpeechBubblesGlobal.value
    }
  })
})

const generateGiraffes = (count = 3) => {
  const newGiraffes: GiraffeData[] = []
  const usedHeights = new Set<number>()
  for (let i = 0; i < count; ) {
    const height = Math.floor(Math.random() * 20) + 5 // Ensure height is at least 5 for visibility
    if (!usedHeights.has(height)) {
      usedHeights.add(height)
      newGiraffes.push({
        id: `g-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`,
        height
      })
      i++
    }
  }
  giraffes.value = newGiraffes
  giraffeDisplayStates.value = newGiraffes.map(g => ({
    ...g,
    speechText: null,
    currentMood: 'happy'
  }))
  showSpeechBubblesGlobal.value = false
}

const handlePause = () => {
  console.log('Game paused')
}

const handleSettings = () => {
  router.push('/settings')
}

const handleCheck = () => {
  const currentOrderHeights = giraffes.value.map(g => g.height)
  const correctOrderHeights = [...currentOrderHeights].sort((a, b) => a - b)
  isOverallCorrect.value = JSON.stringify(currentOrderHeights) === JSON.stringify(correctOrderHeights)

  const minActualHeight = Math.min(...giraffes.value.map(g => g.height))
  const maxActualHeight = Math.max(...giraffes.value.map(g => g.height))

  giraffeDisplayStates.value = giraffes.value.map((g, index) => {
    // Generate speech text based on giraffe height
    let text = `I'm taller than ${minActualHeight}`
    
    if (g.height === minActualHeight) {
      text = `I'm smallest`
    } else if (g.height === maxActualHeight) {
      text = `I'm tallest`
    }
    
    // Determine individual mood
    const isThisGiraffeCorrectlyPlaced = g.height === correctOrderHeights[index];
    let mood: 'happy' | 'sad' = 'happy'; // Default to happy
    
    if (isOverallCorrect.value) {
      mood = 'happy';
    } else {
      mood = isThisGiraffeCorrectlyPlaced ? 'happy' : 'sad';
    }

    return {
      ...g,
      speechText: text,
      currentMood: mood
    }
  })

  showSpeechBubblesGlobal.value = true

  if (isOverallCorrect.value) {
    setTimeout(() => {
      generateGiraffes()
    }, 2000)
  }
}

const handleMoveGiraffe = (sourceId: string, targetId: string) => {
  const sourceIndex = giraffes.value.findIndex(g => g.id === sourceId)
  const targetIndex = giraffes.value.findIndex(g => g.id === targetId)
  
  if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
    const temp = giraffes.value[sourceIndex]
    giraffes.value[sourceIndex] = giraffes.value[targetIndex]
    giraffes.value[targetIndex] = temp
    
    showSpeechBubblesGlobal.value = false
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
        :giraffes="gameContentData"
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
  </div>
</template> 