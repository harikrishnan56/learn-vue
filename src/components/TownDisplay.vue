<script setup lang="ts">
import Giraffe from './giraffe/Giraffe.vue'
import type { TownData } from '../stores/gameStore'
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  town: TownData
  mood?: 'happy'|'sad'|'confused'|'idle'
  speechText?: string|null
  showSpeechBubble?: boolean
}>(),{
  mood: 'happy',
  speechText: null,
  showSpeechBubble: false
})
const giraffeHeights = computed(()=>{ return [65, 95, 75] })
const label = computed(()=>`${props.town.label} - ${props.town.population}`)
</script>

<template>
  <div class="flex flex-col items-center relative">
    <Giraffe
      v-if="props.showSpeechBubble && props.speechText"
      :height="0"
      :show-speech-bubble="true"
      :speech-text="props.speechText"
      :visible="true"
      class="absolute bottom-full mb-1 z-10"
    />
    <div class="flex items-end space-x-[-10px]">
      <Giraffe
        v-for="(h,i) in giraffeHeights"
        :key="i"
        :height="h"
        :mood="props.mood"
        :head-size="40"
        :body-width="25"
        :visible="true"
        :class="{
          'z-0': i === 0, 
          'z-20': i === 1, 
          'z-10': i === 2
        }"
      />
    </div>
    <div class="mt-2 text-lg font-semibold text-[#3A8737] bg-[#4FAB4C] bg-opacity-60 px-4 py-1 rounded-lg shadow-md">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
</style>