<script setup lang="ts">
import GiraffeHead from './GiraffeHead.vue'
import GiraffeBody from './GiraffeBody.vue'

interface Props {
  height: number
  color?: string 
  headSize?: number
  bodyWidth?: number
  patternDensity?: 'low' | 'medium' | 'high'
  faceDirection?: 'left' | 'right'
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'brand-yellow',
  headSize: 60,
  bodyWidth: 40,
  patternDensity: 'medium',
  faceDirection: 'right',
  id: '1'
})

const bodyHeight = () => {
  // Body height should be total height minus head size
  return props.height - (props.headSize * 0.8) // Overlap the head slightly
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="relative">
      <!-- Label for giraffe height -->
      <div 
        class="absolute -left-[80px] top-1/2 transform -translate-y-1/2 bg-white px-3 py-1 rounded-md shadow-md"
      >
        <span class="text-sm font-gabarito font-bold">{{ height }}</span>
      </div>
      
      <!-- Giraffe component -->
      <div class="flex flex-col items-center">
        <GiraffeHead 
          :size="headSize" 
          :color="color" 
          :face-direction="faceDirection"
        />
        <div class="-mt-4"> <!-- Negative margin for slight overlap -->
          <GiraffeBody 
            :height="bodyHeight()" 
            :width="bodyWidth" 
            :color="color"
            :pattern-density="patternDensity"
          />
        </div>
      </div>
      
      <!-- Giraffe ID -->
      <div class="mt-2 text-center">
        <span class="text-xs text-brand-gray-text">Giraffe #{{ id }}</span>
      </div>
    </div>
  </div>
</template> 