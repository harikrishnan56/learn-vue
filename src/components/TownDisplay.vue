<script setup lang="ts">
import Giraffe from './giraffe/Giraffe.vue'
import type { TownData } from '../stores/gameStore'
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  town: TownData
  mood?: 'happy'|'sad'|'confused'|'idle'
  speechText?: string|null
  showSpeechBubble?: boolean
  showPopulationInLabel?: boolean
  hideLabelText?: boolean
}>(),{
  mood: 'happy',
  speechText: null,
  showSpeechBubble: false,
  showPopulationInLabel: true,
  hideLabelText: false
})
const giraffeHeights = computed(()=>[100, 160, 80])
const label = computed(() => {
  if (props.showPopulationInLabel) {
    return `${props.town.label} - ${props.town.population}`
  } 
  return props.town.label
})
</script>

<template>
  <div class="flex flex-col items-center relative max-w-full">
    <Transition name="fade">
      <Giraffe
        v-if="props.showSpeechBubble && props.speechText"
        :height="0"
        :show-speech-bubble="true"
        :speech-text="props.speechText"
        :visible="true"
        displayMode="speech-only"
        class="absolute bottom-full mb-1 z-10"
      />
    </Transition>
    <div class="flex items-end space-x-2 sm:space-x-4">
      <Giraffe
        v-for="(h,i) in giraffeHeights"
        :key="i"
        :height="h"
        :mood="props.mood"
        :head-size="40"
        :body-width="30"
        :visible="true"
        :class="i===1 ? 'z-10' : ''"
        displayMode="full"
      />
    </div>
    <div v-if="!props.hideLabelText" class="mt-2 flex flex-col items-center">
      <div class="h-1 w-32 sm:w-40 bg-[#4FAB4C] rounded-full mb-1"></div>
      <div class="font-bold text-[#4FAB4C] text-sm sm:text-xl">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>