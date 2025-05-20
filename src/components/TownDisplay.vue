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
const giraffeHeights = computed(()=>{ return [60, 80, 70] })
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
    <div class="town-container flex flex-col items-center relative">
      <div class="flex items-end space-x-[-15px] relative z-10 pb-2">
        <Giraffe
          v-for="(h,i) in giraffeHeights"
          :key="i"
          :height="h"
          :mood="props.mood"
          :head-size="40"
          :body-width="25"
          :visible="true"
          :class="{'z-0': i !==1, 'z-5': i===1 }"
        />
      </div>
      <div class="town-label text-xl font-semibold text-[#3A8737] relative z-20">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.town-container {
  position: relative;
  width: 180px;
}

.town-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100% - 30px);
  background-color: #83CA54;
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, 
                    transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, 
                    transparent 75%, transparent);
  background-size: 20px 20px;
  z-index: 1;
  border-radius: 8px;
}

.town-label {
  position: relative;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: -5px;
}
</style>