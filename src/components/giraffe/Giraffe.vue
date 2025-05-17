<script setup lang="ts">
import { computed } from 'vue'
import GiraffeHead from './GiraffeHead.vue'
import GiraffeBody from './GiraffeBody.vue'

interface Props {
  height: number
  headSize?: number
  bodyWidth?: number
  patternDensity?: 'low' | 'medium' | 'high'
  faceDirection?: 'left' | 'right'
  mood?: 'happy' | 'confused' | 'idle' | 'sad'
}

const props = withDefaults(defineProps<Props>(), {
  headSize: 60,
  bodyWidth: 40,
  patternDensity: 'medium',
  faceDirection: 'right',
  mood: 'happy'
})

const bodyHeight = () => {
  return props.height - (props.headSize * 0.8) // Overlap the head slightly
}

const bodyMargin = computed(() => `-${props.headSize * 0.3}px`)
</script>

<template>
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
</template> 