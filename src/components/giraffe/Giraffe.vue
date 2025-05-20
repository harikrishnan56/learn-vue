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
  multiLine?: boolean
  displayMode?: 'full' | 'speech-only'
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
  multiLine: false,
  displayMode: 'full'
})

const bodyHeight = () => {
  if (props.displayMode === 'speech-only') return 0;
  return Math.max(0, props.height - (props.headSize * 0.7))
}

const bodyMargin = computed(() => `-${(props.headSize * 0.3) + 5}px`)
</script>

<template>
  <Transition name="slide-up">
    <div v-if="props.visible" class="flex flex-col items-center relative">
      <SpeechBubble 
        v-if="props.showSpeechBubble && props.speechText"
        :text="props.speechText"
        :visible="props.showSpeechBubble"
        :multi-line="props.multiLine"
        class="absolute bottom-full mb-2 z-20 left-1/2 transform -translate-x-1/2"
      />
      
      <div 
        v-if="props.showNumber && props.displayNumber !== null && props.displayMode === 'full'" 
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-20"
      >
        {{ props.displayNumber }}
      </div>
      
      <div v-if="props.displayMode === 'full'" class="flex flex-col items-center">
        <div class="relative">
          <div class="flex flex-col items-center">
            <GiraffeHead 
              :size="props.headSize"
              :face-direction="props.faceDirection"
              :mood="props.mood"
            />
            <div :style="{ marginTop: bodyMargin }">
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
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> 