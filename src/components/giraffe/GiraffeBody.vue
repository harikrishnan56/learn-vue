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
  const baseCount = Math.ceil(props.height / 30) 
  
  switch (props.patternDensity) {
    case 'low': return Math.max(2, Math.floor(baseCount * 0.6))
    case 'high': return Math.ceil(baseCount * 1.5)
    default: return baseCount
  }
}

// Generate pattern positions - arranged in alternating sides
const patternPositions = Array.from({ length: spotCount() }, (_, i) => {
  const isLeftSide = i % 2 === 0;
  return {
    x: isLeftSide ? props.width * 0.1 : props.width * 0.6, // Alternating left and right
    y: Math.floor((i * props.height / spotCount()) + 10),  // More evenly spaced vertically
    size: Math.floor(Math.random() * 4) + 10 
  }
})
</script>

<template>
  <div 
    class="relative overflow-hidden"
    :style="{ 
      width: `${width}px`, 
      height: `${height}px`,
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