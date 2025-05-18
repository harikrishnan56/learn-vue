<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameHeader from '../components/GameHeader.vue'
import GameContent from '../components/GameContent.vue'
import GameControls from '../components/GameControls.vue'
import FeedbackOverlay from '../components/FeedbackOverlay.vue'
import CountdownOverlay from '../components/CountdownOverlay.vue'
import QuestionModal from '../components/QuestionModal.vue'
import Giraffe from '../components/giraffe/Giraffe.vue'

interface GiraffeData {
  id: string
  height: number
}

interface GiraffeDisplayState extends GiraffeData {
  speechText: string | null
  currentMood: 'happy' | 'confused' | 'idle' | 'sad'
}

interface NumberedGiraffeData {
  id: string
  displayValue: number | '?'
  height: number
}

const router = useRouter()

const gameMode = ref<'orderByHeight' | 'findMissingNumber'>('orderByHeight')
const showGameContent = ref(true)

const isOverallCorrect = ref(false)

const giraffes = ref<GiraffeData[]>([])
const selectedNumberDisplayValue = ref<number | null>(null)

const showSpeechBubblesGlobal = ref(false)
const showResultOverlay = ref(false)
const overlayType = ref<'success'|'error'>('success')
const giraffeDisplayStates = ref<GiraffeDisplayState[]>([])
const showSecondaryObjective = ref(false)
const secondaryObjectiveText = ref('New giraffe has joined the line!')

const showFindNumberObjectiveText = ref(false)
const showGrass = ref(false)
const showQuestionModal = ref(false)
const missingNumberGiraffes = ref<NumberedGiraffeData[]>([])
const missingNumberOptions = ref<number[]>([])
const correctMissingNumber = ref<number | null>(null)
const giraffesVisible = ref<boolean[]>([])

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
    const height = Math.floor(Math.random() * 20) + 5
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
    let text = `I'm taller than ${minActualHeight}`
    
    if (g.height === minActualHeight) {
      text = `I'm smallest`
    } else if (g.height === maxActualHeight) {
      text = `I'm tallest`
    }
    
    const isThisGiraffeCorrectlyPlaced = g.height === correctOrderHeights[index];
    let mood: 'happy' | 'sad' = 'happy';
    
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

  overlayType.value = isOverallCorrect.value ? 'success' : 'error'
  setTimeout(() => {
    showResultOverlay.value = true
  }, 1500)
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

function onContinue() {
  showResultOverlay.value = false
  showSpeechBubblesGlobal.value = false
  if (overlayType.value === 'success') {
    showSecondaryObjective.value = true
  }
}

function handleSecondaryComplete() {
  showSecondaryObjective.value = false
  gameMode.value = 'findMissingNumber'
  startFindMissingNumberSequence()
}

function startFindMissingNumberSequence() {
  showFindNumberObjectiveText.value = true
  
  setTimeout(() => {
    showFindNumberObjectiveText.value = false
    showGrass.value = true
    
    generateMissingNumberGiraffes()
    
    setTimeout(() => {
      startGiraffeSlideInSequence()
    }, 1000)
  }, 1500)
}

function generateMissingNumberGiraffes() {
  const baseSequence = [1, 2, 3, 4]
  const missingIndex = Math.floor(Math.random() * baseSequence.length)
  const missingValue = baseSequence[missingIndex]
  correctMissingNumber.value = missingValue
  
  const newGiraffes: NumberedGiraffeData[] = []
  
  for (let i = 0; i < baseSequence.length; i++) {
    newGiraffes.push({
      id: `num-g-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`,
      displayValue: i === missingIndex ? '?' : baseSequence[i],
      height: 100 + (i * 30)
    })
  }
  
  missingNumberGiraffes.value = newGiraffes
  giraffesVisible.value = new Array(newGiraffes.length).fill(false)
  
  const options = [missingValue]
  while (options.length < 3) {
    const option = Math.floor(Math.random() * 9) + 1
    if (!options.includes(option)) {
      options.push(option)
    }
  }
  
  missingNumberOptions.value = options.sort(() => Math.random() - 0.5)
}

function startGiraffeSlideInSequence() {
  for (let i = 0; i < missingNumberGiraffes.value.length; i++) {
    setTimeout(() => {
      giraffesVisible.value[i] = true
      
      if (i === missingNumberGiraffes.value.length - 1) {
        setTimeout(() => {
          showQuestionModal.value = true
        }, 1500)
      }
    }, i * 300)
  }
}

function handleMissingNumberSelect(selectedNumber: number) {
  if (selectedNumber === correctMissingNumber.value) {
    overlayType.value = 'success'
  } else {
    overlayType.value = 'error'
  }
  
  setTimeout(() => {
    showQuestionModal.value = false
    showGrass.value = false
    gameMode.value = 'orderByHeight'
    generateGiraffes()
  }, 1500)
}

onMounted(() => {
  generateGiraffes()
})
</script>

<template>
  <div class="min-h-screen bg-brand-white relative">
    <GameHeader 
      @pause="handlePause"
      @settings="handleSettings"
      class="fixed top-0 left-0 right-0 z-10"
    />
    
    <div class="pt-[76px]" v-if="gameMode === 'orderByHeight'">
      <GameContent 
        :giraffes="gameContentData"
        class="pb-0 h-[calc(100vh-320px)]"
      />
    </div>
    
    <div v-if="gameMode === 'findMissingNumber'" class="pt-[76px] h-[calc(100vh-76px)] relative">
      <div v-if="showFindNumberObjectiveText" class="absolute inset-0 flex items-center justify-center">
        <p class="text-lg font-gabarito font-medium text-brand-blue text-center">Find the missing number for the new giraffe</p>
      </div>
      
      <div v-if="showGrass" class="flex justify-around items-end w-full mx-auto max-w-xl absolute bottom-0 left-0 right-0 pb-[160px]">
        <div 
          v-for="(giraffe, index) in missingNumberGiraffes" 
          :key="giraffe.id" 
          class="flex flex-col items-center"
        >
          <Giraffe
            :height="giraffe.height"
            :head-size="60"
            :body-width="40"
            :display-number="giraffe.displayValue"
            :show-number="true"
            :visible="giraffesVisible[index]"
            mood="happy"
          />
        </div>
      </div>
      
      <div v-if="showGrass" class="absolute bottom-0 left-0 right-0 h-20 bg-brand-green-light z-10"></div>
    </div>
    
    <GameControls
      v-if="gameMode === 'orderByHeight'"
      :giraffe-heights-data="giraffeControlsData"
      @check="handleCheck"
      @selectNumber="handleNumberSelect"
      @moveGiraffe="handleMoveGiraffe"
      class="fixed bottom-0 left-0 right-0 z-10"
    />
    
    <QuestionModal
      :visible="showQuestionModal"
      :options="missingNumberOptions"
      @select="handleMissingNumberSelect"
    />
    
    <FeedbackOverlay :visible="showResultOverlay" :type="overlayType" @continue="onContinue" />
    <CountdownOverlay
      :is-visible="showSecondaryObjective"
      :objective-text="secondaryObjectiveText"
      @countdown-complete="handleSecondaryComplete"
    />
  </div>
</template> 