<script setup lang="ts">
import { computed } from 'vue'
import Giraffe from './giraffe/Giraffe.vue'

interface GiraffeGameData {
  id: string
  height: number
  speechText: string | null
  currentMood: 'happy' | 'confused' | 'idle' | 'sad'
  showSpeechBubble: boolean
}

const props = defineProps<{
  giraffes: GiraffeGameData[]
  animateObjectiveUp?: boolean
  giraffesVisible?: boolean[]
}>()

const heights = computed(() => props.giraffes.map(g => g.height))
const minHeight = computed(() => Math.min(...heights.value))
const maxHeight = computed(() => Math.max(...heights.value))
const minScale = 100
const maxScale = 200

// Set fixed width for all giraffes
const FIXED_WIDTH = 40
const HEAD_RATIO = 1.5

const getGiraffeHeight = (height: number) => {
  if (maxHeight.value === minHeight.value) {
    return (minScale + maxScale) / 2
  }
  return minScale + ((height - minHeight.value) / (maxHeight.value - minHeight.value)) * (maxScale - minScale)
}
</script>

<template>
  <main class="container mx-auto px-4 flex flex-col h-full">
    <div
      class="text-center mb-4 transition-all duration-500 ease-out"
      :class="{ '-translate-y-20 opacity-0': animateObjectiveUp }"
    >
      <h2 class="text-xl font-gabarito font-normal text-brand-blue">Order the giraffes based on their height</h2>
    </div>
    
    <div class="flex-grow flex flex-col justify-end">
      <div class="flex justify-around items-end w-full mx-auto max-w-xl mb-0">
        <div 
          v-for="(giraffe, index) in props.giraffes" 
          :key="giraffe.id" 
          class="flex flex-col items-center" 
        >
          <Giraffe
            :height="getGiraffeHeight(giraffe.height)"
            :id="giraffe.id"
            :head-size="FIXED_WIDTH * HEAD_RATIO"
            :body-width="FIXED_WIDTH"
            :mood="giraffe.currentMood"
            :speech-text="giraffe.speechText"
            :show-speech-bubble="giraffe.showSpeechBubble"
            :visible="props.giraffesVisible ? props.giraffesVisible[index] : true"
          />
        </div>
      </div>
    </div>
  </main>
</template> 