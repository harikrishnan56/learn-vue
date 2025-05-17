<script setup lang="ts">
import { computed } from 'vue'
import Giraffe from './giraffe/Giraffe.vue'

interface GiraffeData {
  id: string
  height: number
}

const props = defineProps<{ giraffes: GiraffeData[] }>()

const heights = computed(() => props.giraffes.map(g => g.height))
const minHeight = computed(() => Math.min(...heights.value))
const maxHeight = computed(() => Math.max(...heights.value))
const minScale = 100
const maxScale = 200

const HEAD_RATIO = 0.3
const BODY_RATIO = 0.2

const getGiraffeScale = (height: number) => {
  if (maxHeight.value === minHeight.value) {
    return (minScale + maxScale) / 2
  }
  return minScale + ((height - minHeight.value) / (maxHeight.value - minHeight.value)) * (maxScale - minScale)
}
</script>

<template>
  <main class="container mx-auto px-4 flex flex-col h-full">
    <div class="text-center mb-4">
      <h2 class="text-xl font-gabarito font-normal text-brand-blue">Order the giraffes from shortest to tallest</h2>
    </div>
    
    <div class="flex justify-around items-end w-full mx-auto max-w-xl mt-auto">
      <div 
        v-for="giraffe in props.giraffes" 
        :key="giraffe.id" 
        class="flex flex-col items-center" 
      >
        <Giraffe
          :height="getGiraffeScale(giraffe.height)"
          :id="giraffe.id"
          :head-size="getGiraffeScale(giraffe.height) * HEAD_RATIO"
          :body-width="getGiraffeScale(giraffe.height) * BODY_RATIO"
        />
      </div>
    </div>
  </main>
</template> 