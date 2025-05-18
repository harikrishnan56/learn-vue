<script setup lang="ts">
import { computed } from 'vue'
import GiraffeHead from './GiraffeHead.vue'
import GiraffeBody from './GiraffeBody.vue'
import SpeechBubble from '../SpeechBubble.vue'

interface Props {
  height: number
  headSize?: number
  bodyWidth?: number
  patternDensity?: 'low' | 'medium' | 'high'
  faceDirection?: 'left' | 'right'
  mood?: 'happy' | 'confused' | 'idle' | 'sad'
  speechText?: string | null
  showSpeechBubble?: boolean
  displayNumber?: number | string | null
  showNumber?: boolean
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  headSize: 60,
  bodyWidth: 40,
  patternDensity: 'medium',
  faceDirection: 'right',
  mood: 'happy',
  speechText: null,
  showSpeechBubble: false,
  displayNumber: null,
  showNumber: false,
  visible: true,
})

const bodyHeight = () => {
  return props.height - (props.headSize * 0.7) // Overlap the head slightly
}

const bodyMargin = computed(() => `-${props.headSize * 0.3}px`)
</script>

<template>
  <div class="flex flex-col items-center relative" :class="{ 'opacity-0': !props.visible }">
    <SpeechBubble 
      v-if="props.showSpeechBubble && props.speechText"
      :text="props.speechText"
      :visible="props.showSpeechBubble"
      class="absolute bottom-full mb-2 z-20 left-1/2 transform -translate-x-1/2"
    />
    
    <div 
      v-if="props.showNumber && props.displayNumber !== null" 
      class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-20"
    >
      {{ props.displayNumber }}
    </div>
    
    <div class="flex flex-col items-center">
      <div class="relative">
        <!-- Giraffe component -->
        <div class="flex flex-col items-center">
          <GiraffeHead 
            :size="props.headSize"
            :face-direction="props.faceDirection"
            :mood="props.mood"
          />
          <div :style="{ marginTop: bodyMargin }"> <!-- Dynamic overlap margin -->
            <GiraffeBody 
              :height="bodyHeight()"
              :width="props.bodyWidth"
              :pattern-density="props.patternDensity"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 