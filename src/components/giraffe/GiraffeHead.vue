<script setup lang="ts">
import happySvg from '@/assets/images/giraffe-happy.svg'
import confusedSvg from '@/assets/images/giraffe-confused.svg'
import idleSvg from '@/assets/images/giraffe-idle.svg'
import sadSvg from '@/assets/images/giraffe-sad.svg'

interface Props {
  size?: number
  faceDirection?: 'left' | 'right'
  mood?: 'happy' | 'confused' | 'idle' | 'sad'
}

const props = withDefaults(defineProps<Props>(), {
  size: 60,
  faceDirection: 'right',
  mood: 'happy'
})

const images = { happy: happySvg, confused: confusedSvg, idle: idleSvg, sad: sadSvg }
const imagePath = images[props.mood]
</script>

<template>
  <div 
    class="relative z-10" 
    :style="{ 
      width: `${props.size * 1.2}px`, 
      height: `${props.size * 1.2}px`
    }"
  >
    <img 
      :src="imagePath"
      :alt="props.mood"
      :style="{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        transform: props.faceDirection === 'left' ? 'scaleX(-1)' : undefined
      }"
    />
  </div>
</template> 