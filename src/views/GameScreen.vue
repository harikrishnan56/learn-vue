<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import GameHeader from '../components/GameHeader.vue'
import GameContent from '../components/GameContent.vue'
import GameControls from '../components/GameControls.vue'
import FeedbackOverlay from '../components/FeedbackOverlay.vue'
import CountdownOverlay from '../components/CountdownOverlay.vue'
import QuestionModal from '../components/QuestionModal.vue'
import TertiaryQuestionModal from '../components/TertiaryQuestionModal.vue'
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
const route = useRoute()
const gameStore = useGameStore()
const stage = computed(() => gameStore.currentStage)
const stageTasks = computed(() => gameStore.getCurrentStageTasks)
const stageParam = route.query.stage ? parseInt(route.query.stage as string) : NaN
if (!isNaN(stageParam)) gameStore.setStage(stageParam)
const gameMode = ref<'orderByHeight' | 'findMissingNumber' | 'comparisonQuiz'>('orderByHeight')
const showGameContent = ref(true)
const isOverallCorrect = ref(false)
const giraffes = ref<GiraffeData[]>([])
const selectedNumberDisplayValue = ref<number | null>(null)
const showSpeechBubblesGlobal = ref(false)
const showResultOverlay = ref(false)
const overlayType = ref<'success' | 'error'>('success')
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

// State for orderByHeight animation sequence
const objectiveTextAnimatingUp = ref(false)
const showHeaderElements = ref(false)
const showGrassAndControlsShell = ref(false) // For GameControls main visibility (grass bg)
const giraffesOrderVisible = ref<boolean[]>([]) // For orderByHeight giraffes slide-in
const showOrderButtons = ref(false) // For buttons inside GameControls in orderByHeight
const initialOrderByHeightAnimationComplete = ref(false)

const findNumObjectiveAnimatingUp = ref(false)
const initialFindNumAnimationComplete = ref(false)

const showFindNumControlsShell = ref(false) // For GameControls background in findMissingNumber mode

// Tertiary task state
const tertiaryQuizGiraffes = ref<Array<GiraffeDisplayState & { label: string }>>([])
const tertiaryQuestionText = ref<string>('')
const tertiaryOptions = ref<Array<{ id: string, label: string }>>([])
const correctTertiaryAnswerId = ref<string | null>(null)
const selectedTertiaryOption = ref<string | null>(null)
const tertiaryQuizObjectiveAnimatingUp = ref<boolean>(false)
const tertiaryGiraffesVisible = ref<boolean[]>([])
const showTertiaryQuestionModal = ref<boolean>(false)
const initialTertiaryQuizAnimationComplete = ref<boolean>(false)
const showTertiaryGrass = ref<boolean>(false)
const showTertiaryControlsShell = ref<boolean>(false)

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
  // Initialize visibility for orderByHeight mode when giraffes are generated
  if (gameMode.value === 'orderByHeight') {
    giraffesOrderVisible.value = new Array(newGiraffes.length).fill(false)
  }
}

const resetOrderByHeightAnimationState = () => {
  objectiveTextAnimatingUp.value = false
  showHeaderElements.value = false
  showGrassAndControlsShell.value = false
  giraffesOrderVisible.value = new Array(giraffes.value.length).fill(false)
  showOrderButtons.value = false
  initialOrderByHeightAnimationComplete.value = false
}

const startOrderByHeightAnimation = () => {
  if (initialOrderByHeightAnimationComplete.value) {
    return
  }

  if (giraffes.value.length === 0) {
    generateGiraffes()
  }
  if (giraffesOrderVisible.value.length !== giraffes.value.length) {
    giraffesOrderVisible.value = new Array(giraffes.value.length).fill(false);
  }

  objectiveTextAnimatingUp.value = false 
  showHeaderElements.value = false
  showGrassAndControlsShell.value = false
  showOrderButtons.value = false
  for(let i = 0; i < giraffesOrderVisible.value.length; i++) giraffesOrderVisible.value[i] = false;

  setTimeout(() => {
    objectiveTextAnimatingUp.value = true
    showHeaderElements.value = true
    showGrassAndControlsShell.value = true

    setTimeout(() => {
      if (giraffes.value.length > 0) {
        for (let i = 0; i < giraffes.value.length; i++) {
          setTimeout(() => {
            if (i < giraffesOrderVisible.value.length) {
              giraffesOrderVisible.value[i] = true
            }
            if (i === giraffes.value.length - 1) {
              setTimeout(() => {
                showOrderButtons.value = true
                initialOrderByHeightAnimationComplete.value = true 
              }, 500 + 100)
            }
          }, i * 300)
        }
      } else {
        showOrderButtons.value = true
        initialOrderByHeightAnimationComplete.value = true 
      }
    }, 1000)
  }, 1500)
}

const resetFindMissingNumberAnimationState = () => {
  findNumObjectiveAnimatingUp.value = false
  showHeaderElements.value = false 
  showGrass.value = false
  showFindNumControlsShell.value = false
  if (missingNumberGiraffes.value.length > 0) {
    giraffesVisible.value = new Array(missingNumberGiraffes.value.length).fill(false)
  } else {
    giraffesVisible.value = []
  }
  showQuestionModal.value = false
  initialFindNumAnimationComplete.value = false
}

const generateMissingNumberGiraffes = () => {
  const secondaryTask = stageTasks.value?.secondary
  const rangeMax = secondaryTask?.data?.rangeMax ?? 9
  const sequenceLength = 4
  const baseSequence: number[] = []
  while (baseSequence.length < sequenceLength) {
    const n = Math.floor(Math.random() * rangeMax) + 1
    if (!baseSequence.includes(n)) baseSequence.push(n)
  }
  baseSequence.sort((a, b) => a - b)
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
  giraffeDisplayStates.value = newGiraffes.map(g => ({ id: g.id, height: g.height, speechText: null, currentMood: 'happy' }))
  const lowerBound = missingIndex > 0 ? baseSequence[missingIndex - 1] : 0
  const upperBound = missingIndex < sequenceLength - 1 ? baseSequence[missingIndex + 1] : rangeMax + 1
  const options = [missingValue]
  while (options.length < 3) {
    const candidate = Math.floor(Math.random() * rangeMax) + 1
    if (options.includes(candidate)) continue
    if (candidate <= lowerBound || candidate >= upperBound) {
      options.push(candidate)
    }
  }
  missingNumberOptions.value = options.sort(() => Math.random() - 0.5)
}

const startFindMissingNumberAnimation = () => {
  if (initialFindNumAnimationComplete.value) {
    return;
  }
  generateMissingNumberGiraffes() 
  if (giraffesVisible.value.length !== missingNumberGiraffes.value.length) {
      giraffesVisible.value = new Array(missingNumberGiraffes.value.length).fill(false);
  }

  resetFindMissingNumberAnimationState();
  initialFindNumAnimationComplete.value = false;

  setTimeout(() => { 
    findNumObjectiveAnimatingUp.value = true; showHeaderElements.value = true; showGrass.value = true; showFindNumControlsShell.value = true;
    setTimeout(() => {
      if (missingNumberGiraffes.value.length > 0) {
        for (let i = 0; i < missingNumberGiraffes.value.length; i++) {
          setTimeout(() => {
            if (i < giraffesVisible.value.length) giraffesVisible.value[i] = true
            if (i === missingNumberGiraffes.value.length - 1) {
              setTimeout(() => {
                showQuestionModal.value = true;
                initialFindNumAnimationComplete.value = true;
                giraffeDisplayStates.value = missingNumberGiraffes.value.map(g => ({ id: g.id, height: g.height, speechText: String(g.displayValue), currentMood: 'happy' }));
                showSpeechBubblesGlobal.value = true;
              }, 600)
            }
          }, i * 300)
        }
      } else {
        showQuestionModal.value = true; initialFindNumAnimationComplete.value = true
      }
    }, 1000)
  }, 1500)
}

const resetTertiaryQuizAnimationState = () => {
  tertiaryQuizObjectiveAnimatingUp.value = false
  showHeaderElements.value = false
  showTertiaryGrass.value = false
  showTertiaryControlsShell.value = false
  tertiaryGiraffesVisible.value = new Array(tertiaryQuizGiraffes.value.length).fill(false)
  showTertiaryQuestionModal.value = false
  initialTertiaryQuizAnimationComplete.value = false
}

const generateTertiaryQuizData = () => {
  const tertiaryTask = stageTasks.value?.tertiary
  if (!tertiaryTask || tertiaryTask.type !== 'comparisonQuiz') return
  
  // Get question text from task configuration
  tertiaryQuestionText.value = tertiaryTask.data?.questionText || "Who is the tallest Giraffe?"
  
  // Generate 4 giraffes with different heights
  const giraffeCount = 4
  const labels = ['A', 'B', 'C', 'D']
  const newGiraffes: Array<GiraffeDisplayState & { label: string }> = []
  const usedHeights = new Set<number>()
  
  for (let i = 0; i < giraffeCount; i++) {
    let height
    do {
      height = Math.floor(Math.random() * 20) + 5
    } while (usedHeights.has(height))
    
    usedHeights.add(height)
    newGiraffes.push({
      id: `tertiary-g-${Date.now()}-${i}-${Math.random().toString(36).substring(7)}`,
      height,
      label: labels[i],
      speechText: labels[i],
      currentMood: 'happy'
    })
  }
  
  // Sort giraffes by height to find the tallest
  const sortedGiraffes = [...newGiraffes].sort((a, b) => b.height - a.height)
  const tallestGiraffe = sortedGiraffes[0]
  correctTertiaryAnswerId.value = tallestGiraffe.id
  
  tertiaryQuizGiraffes.value = newGiraffes
  tertiaryGiraffesVisible.value = new Array(newGiraffes.length).fill(false)
  
  // Set options from task configuration or use default A, B, C, D
  tertiaryOptions.value = tertiaryTask.data?.options || 
    labels.map(label => ({ id: `opt${label}`, label }))
}

const startTertiaryQuizAnimation = () => {
  if (initialTertiaryQuizAnimationComplete.value) {
    return
  }
  
  generateTertiaryQuizData()
  if (tertiaryGiraffesVisible.value.length !== tertiaryQuizGiraffes.value.length) {
    tertiaryGiraffesVisible.value = new Array(tertiaryQuizGiraffes.value.length).fill(false)
  }
  
  resetTertiaryQuizAnimationState()
  initialTertiaryQuizAnimationComplete.value = false
  
  setTimeout(() => {
    tertiaryQuizObjectiveAnimatingUp.value = true
    showHeaderElements.value = true
    showTertiaryGrass.value = true
    showTertiaryControlsShell.value = true
    
    setTimeout(() => {
      if (tertiaryQuizGiraffes.value.length > 0) {
        for (let i = 0; i < tertiaryQuizGiraffes.value.length; i++) {
          setTimeout(() => {
            if (i < tertiaryGiraffesVisible.value.length) {
              tertiaryGiraffesVisible.value[i] = true
            }
            
            if (i === tertiaryQuizGiraffes.value.length - 1) {
              setTimeout(() => {
                // Show speech bubbles with labels
                giraffeDisplayStates.value = tertiaryQuizGiraffes.value.map(g => ({
                  id: g.id,
                  height: g.height,
                  speechText: g.label,
                  currentMood: 'happy'
                }))
                showSpeechBubblesGlobal.value = true
                
                // After speech bubbles are visible, show question modal
                setTimeout(() => {
                  showTertiaryQuestionModal.value = true
                  initialTertiaryQuizAnimationComplete.value = true
                }, 1500)
              }, 600)
            }
          }, i * 300)
        }
      } else {
        showTertiaryQuestionModal.value = true
        initialTertiaryQuizAnimationComplete.value = true
      }
    }, 1000)
  }, 1500)
}

watch(giraffes, (newGiraffesValue) => {
  if (gameMode.value === 'orderByHeight') {
    if (newGiraffesValue && newGiraffesValue.length > 0) {
      if (giraffesOrderVisible.value.length !== newGiraffesValue.length) {
        giraffesOrderVisible.value = new Array(newGiraffesValue.length).fill(false);
      }
      startOrderByHeightAnimation()
    } else {
      resetOrderByHeightAnimationState()
    }
  }
}, { deep: true });

watch(gameMode, (newMode) => {
  resetOrderByHeightAnimationState(); resetFindMissingNumberAnimationState(); resetTertiaryQuizAnimationState();
  if (newMode === 'orderByHeight') {
    const ensureOrderGiraffes = !giraffes.value.every(g => g.id.startsWith('g-'))
    if (giraffes.value.length === 0 || ensureOrderGiraffes) {
      generateGiraffes()
    } else {
      startOrderByHeightAnimation()
    }
  } else if (newMode === 'findMissingNumber') {
    startFindMissingNumberAnimation()
  } else if (newMode === 'comparisonQuiz') {
    startTertiaryQuizAnimation()
  }
});

const handlePause = () => console.log('Game paused')
const handleSettings = () => router.push('/settings')

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
  
  if (gameMode.value === 'orderByHeight') {
    if (overlayType.value === 'success') {
      showSecondaryObjective.value = true
    }
  } else if (gameMode.value === 'findMissingNumber') {
    if (overlayType.value === 'success') {
      showQuestionModal.value = false
      showGrass.value = false
      
      // Check if we should proceed to tertiary task
      const hasTertiaryTask = stageTasks.value?.tertiary?.type === 'comparisonQuiz'
      if (stage.value === 2 && hasTertiaryTask) {
        gameMode.value = 'comparisonQuiz'
      } else {
        gameMode.value = 'orderByHeight'
      }
    } else {
      // For error in findMissingNumber, allow another try
      showQuestionModal.value = true
    }
  } else if (gameMode.value === 'comparisonQuiz') {
    if (overlayType.value === 'success') {
      // After completing tertiary task, go back to primary task
      showTertiaryQuestionModal.value = false
      showTertiaryGrass.value = false
      gameMode.value = 'orderByHeight'
    } else {
      // For error in tertiary task, allow another try
      showTertiaryQuestionModal.value = true
    }
  }
}

function handleSecondaryComplete() {
  showSecondaryObjective.value = false
  gameMode.value = 'findMissingNumber'
}

function handleMissingNumberSelect(selectedNumber: number) {
  const isCorrect = selectedNumber === correctMissingNumber.value
  showQuestionModal.value = false
  giraffeDisplayStates.value = missingNumberGiraffes.value.map(giraffe => ({
    id: giraffe.id,
    height: giraffe.height,
    speechText: String(giraffe.displayValue === '?' ? selectedNumber : giraffe.displayValue),
    currentMood: 'happy'
  }))
  showSpeechBubblesGlobal.value = true

  setTimeout(() => {
    showSpeechBubblesGlobal.value = false
    setTimeout(() => {
      giraffeDisplayStates.value = missingNumberGiraffes.value.map((giraffe, index) => {
        let text = ''
        let mood: 'happy' | 'confused' | 'idle' | 'sad' = 'happy'
        const total = missingNumberGiraffes.value.length
        
        if (isCorrect) {
          if (index === 0) {
            text = "I'm the shortest"
          } else if (index === total - 1) {
            text = "I'm the tallest!"
          } else if (index === 1) {
            const firstValue = missingNumberGiraffes.value[0].displayValue
            text = `I'm taller than ${firstValue}`
          } else if (index === total - 2) {
            const prev = missingNumberGiraffes.value[index - 1].displayValue
            const next = missingNumberGiraffes.value[index + 1].displayValue
            text = `I'm between ${prev} & ${next}`
          }
          mood = 'happy'
        } else {
          if (giraffe.displayValue === '?') {
            const prevGiraffe = index > 0 ? missingNumberGiraffes.value[index - 1] : null
            const nextGiraffe = index < total - 1 ? missingNumberGiraffes.value[index + 1] : null
            
            if (prevGiraffe && nextGiraffe) {
              text = `I should be between ${prevGiraffe.displayValue} & ${nextGiraffe.displayValue}`
            } else if (prevGiraffe) {
              text = `I should be taller than ${prevGiraffe.displayValue}`
            } else if (nextGiraffe) {
              text = `I should be shorter than ${nextGiraffe.displayValue}`
            }
            mood = 'sad'
          } else {
            text = `I'm ${giraffe.displayValue}`
            mood = 'confused'
          }
        }
        return { id: giraffe.id, height: giraffe.height, speechText: text, currentMood: mood }
      })
      showSpeechBubblesGlobal.value = true
      setTimeout(() => {
        overlayType.value = isCorrect ? 'success' : 'error'
        showResultOverlay.value = true
      }, 1500)
    }, 500)
  }, 1000)
}

function getGiraffeMood(id: string): 'happy' | 'confused' | 'idle' | 'sad' {
  const displayState = giraffeDisplayStates.value.find(s => s.id === id)
  return displayState?.currentMood || 'happy'
}

function getGiraffeSpeechText(id: string): string | null {
  const displayState = giraffeDisplayStates.value.find(s => s.id === id)
  return displayState?.speechText || null
}

function handleTertiaryOptionSelect(optionId: string) {
  showTertiaryQuestionModal.value = false
  selectedTertiaryOption.value = optionId
  
  // Find the giraffe corresponding to the selected option
  const selectedGiraffeLabel = tertiaryOptions.value.find(opt => opt.id === optionId)?.label
  const selectedGiraffe = tertiaryQuizGiraffes.value.find(g => g.label === selectedGiraffeLabel)
  
  // Check if the answer is correct
  const isCorrect = selectedGiraffe?.id === correctTertiaryAnswerId.value
  
  // First phase: show just the labels
  showSpeechBubblesGlobal.value = true
  
  // After a delay, update speech bubbles with feedback
  setTimeout(() => {
    showSpeechBubblesGlobal.value = false
    
    setTimeout(() => {
      // Update speech bubbles with feedback
      giraffeDisplayStates.value = tertiaryQuizGiraffes.value.map(g => {
        let text = ''
        let mood: 'happy' | 'confused' | 'idle' | 'sad' = 'happy'
        
        if (isCorrect) {
          // Correct answer feedback
          if (g.id === correctTertiaryAnswerId.value) {
            text = "I'm the tallest!"
            mood = 'happy'
          } else {
            text = "That's right!"
            mood = 'happy'
          }
        } else {
          // Incorrect answer feedback
          if (g.id === correctTertiaryAnswerId.value) {
            text = "I'm actually the tallest!"
            mood = 'confused'
          } else if (g.id === selectedGiraffe?.id) {
            text = "Hmm..."
            mood = 'sad'
          } else {
            text = "Try again!"
            mood = 'confused'
          }
        }
        
        return {
          id: g.id,
          height: g.height,
          speechText: text,
          currentMood: mood
        }
      })
      
      showSpeechBubblesGlobal.value = true
      
      // Show feedback overlay after a delay
      setTimeout(() => {
        overlayType.value = isCorrect ? 'success' : 'error'
        showResultOverlay.value = true
      }, 1500)
    }, 500)
  }, 1000)
}

onMounted(() => {
  resetOrderByHeightAnimationState(); resetFindMissingNumberAnimationState(); resetTertiaryQuizAnimationState();
  if (gameMode.value === 'orderByHeight') {
    if (giraffes.value.length === 0) generateGiraffes(); else startOrderByHeightAnimation();
  } else if (gameMode.value === 'findMissingNumber') {
    startFindMissingNumberAnimation();
  } else if (gameMode.value === 'comparisonQuiz') {
    startTertiaryQuizAnimation();
  }
})
</script>

<template>
  <div class="min-h-screen bg-brand-white relative">
    <GameHeader 
      @pause="handlePause"
      @settings="handleSettings"
      class="fixed top-0 left-0 right-0 z-10"
      :visible="showHeaderElements || gameMode !== 'orderByHeight'"
      :objective-text="
        gameMode === 'findMissingNumber' ? 'Find the missing number for the new giraffe' : 
        gameMode === 'comparisonQuiz' ? 'Let\'s compare more giraffes!' : 
        'Order the giraffes based on their height'
      "
      :show-objective="
        gameMode === 'findMissingNumber' ? findNumObjectiveAnimatingUp : 
        gameMode === 'comparisonQuiz' ? tertiaryQuizObjectiveAnimatingUp : 
        objectiveTextAnimatingUp
      "
    />
    
    <div v-if="gameMode === 'orderByHeight'" class="absolute top-[76px] bottom-0 left-0 right-0">
      <GameContent
        :giraffes="gameContentData"
        class="h-full pb-[278px]"
        :animate-objective-up="objectiveTextAnimatingUp"
        :giraffes-visible="giraffesOrderVisible"
      />
    </div>
    
    <div v-if="gameMode === 'findMissingNumber'" class="pt-[76px] h-[calc(100vh-76px)] relative">
      <div v-if="!findNumObjectiveAnimatingUp" class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
           :class="{ '-translate-y-20 opacity-0': findNumObjectiveAnimatingUp }" >
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
            :visible="giraffesVisible[index]"
            :mood="getGiraffeMood(giraffe.id)"
            :speech-text="getGiraffeSpeechText(giraffe.id)"
            :show-speech-bubble="showSpeechBubblesGlobal"
            :multi-line="missingNumberGiraffes.length > 3"
          />
        </div>
      </div>
      
      <Transition name="fade">
        <div v-if="showGrass" class="absolute bottom-0 left-0 right-0 h-20 bg-brand-green-light z-0"></div>
      </Transition>
    </div>
    
    <div v-if="gameMode === 'comparisonQuiz'" class="pt-[76px] h-[calc(100vh-76px)] relative">
      <div v-if="showTertiaryGrass" class="flex justify-around items-end w-full mx-auto max-w-xl absolute bottom-0 left-0 right-0 pb-[160px]">
        <div 
          v-for="(giraffe, index) in tertiaryQuizGiraffes" 
          :key="giraffe.id" 
          class="flex flex-col items-center"
        >
          <Giraffe
            :height="giraffe.height"
            :head-size="60"
            :body-width="40"
            :visible="tertiaryGiraffesVisible[index]"
            :mood="getGiraffeMood(giraffe.id)"
            :speech-text="getGiraffeSpeechText(giraffe.id)"
            :show-speech-bubble="showSpeechBubblesGlobal"
            :multi-line="tertiaryQuizGiraffes.length > 3"
          />
        </div>
      </div>
      
      <Transition name="fade">
        <div v-if="showTertiaryGrass" class="absolute bottom-0 left-0 right-0 h-20 bg-brand-green-light z-0"></div>
      </Transition>
    </div>
    
    <GameControls
      v-if="gameMode === 'orderByHeight'"
      :giraffe-heights-data="giraffeControlsData"
      @check="handleCheck"
      @selectNumber="handleNumberSelect"
      @moveGiraffe="handleMoveGiraffe"
      class="fixed bottom-0 left-0 right-0 z-10"
      :controls-visible="showGrassAndControlsShell" 
      :buttons-visible="showOrderButtons"
    />
    
    <!-- Container for GameControls (shell) and QuestionModal in findMissingNumber mode -->
    <div v-if="gameMode === 'findMissingNumber'" class="fixed bottom-0 left-0 right-0 z-10">
      <GameControls :controls-visible="showFindNumControlsShell" :show-interactive-content="false" />
      <div class="absolute bottom-0 left-0 right-0">
        <QuestionModal :visible="showQuestionModal" :options="missingNumberOptions" @select="handleMissingNumberSelect" class="w-full" />
      </div>
    </div>
    
    <!-- Container for GameControls (shell) and TertiaryQuestionModal in comparisonQuiz mode -->
    <div v-if="gameMode === 'comparisonQuiz'" class="fixed bottom-0 left-0 right-0 z-10">
      <GameControls :controls-visible="showTertiaryControlsShell" :show-interactive-content="false" />
      <div class="absolute bottom-0 left-0 right-0">
        <TertiaryQuestionModal 
          :visible="showTertiaryQuestionModal" 
          :options="tertiaryOptions" 
          :question-text="tertiaryQuestionText"
          @select="handleTertiaryOptionSelect" 
          class="w-full" 
        />
      </div>
    </div>
    
    <FeedbackOverlay :visible="showResultOverlay" :type="overlayType" :game-mode="gameMode" @continue="onContinue" />
    <CountdownOverlay
      :is-visible="showSecondaryObjective"
      :objective-text="secondaryObjectiveText"
      @countdown-complete="handleSecondaryComplete"
    />
  </div>
</template> 