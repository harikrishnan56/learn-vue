<script setup lang="ts">
interface Props {
  height: number
  width?: number
  patternDensity?: 'low' | 'medium' | 'high'
}

const props = withDefaults(defineProps<Props>(), {
  width: 40,
  patternDensity: 'medium'
})

// Calculate how many pattern spots to render based on height and density
const spotCount = () => {
  const baseCount = Math.ceil(props.height / 20)
  
  switch (props.patternDensity) {
    case 'low': return Math.max(2, Math.floor(baseCount * 0.6))
    case 'high': return Math.ceil(baseCount * 1.5)
    default: return baseCount
  }
}

// Generate pattern positions
const patternPositions = Array.from({ length: spotCount() }, (_, i) => {
  return {
    x: Math.floor(Math.random() * (props.width - 10)) + 5,
    y: Math.floor((i * props.height / spotCount()) + Math.random() * 10),
    size: Math.floor(Math.random() * 6) + 6
  }
})
</script>

<template>
  <div 
    class="relative overflow-hidden"
    :style="{ 
      width: `${width}px`, 
      height: `${height * 0.7}px`,
      borderRadius: `${width / 2}px ${width / 2}px 0 0`,
      backgroundColor: '#EFBA4C'
    }"
  >
    <!-- Giraffe pattern spots -->
    <div 
      v-for="(spot, index) in patternPositions" 
      :key="index"
      class="absolute rounded-full" 
      :style="{
        width: `${spot.size}px`,
        height: `${spot.size}px`,
        left: `${spot.x}px`,
        top: `${spot.y}px`,
        backgroundColor: '#E07F3A'
      }"
    ></div>
  </div>
</template> 