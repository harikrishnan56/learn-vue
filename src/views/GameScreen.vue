<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GameHeader from '../components/GameHeader.vue'
import GameContent from '../components/GameContent.vue'
import GameControls from '../components/GameControls.vue'
import CountdownOverlay from '../components/CountdownOverlay.vue'

const router = useRouter()
const isCountdownVisible = ref(true)
const showGameContent = ref(false)
const objective = ref('Order the giraffes by height')

const handleCountdownComplete = () => {
  isCountdownVisible.value = false
  showGameContent.value = true
}

const handlePause = () => {
  console.log('Game paused')
}

const handleSettings = () => {
  router.push('/settings')
}

const handlePreview = () => {
  console.log('Preview clicked')
}

const handleSave = () => {
  console.log('Save clicked')
}
</script>

<template>
  <div class="min-h-screen bg-brand-white">
    <CountdownOverlay
      :is-visible="isCountdownVisible"
      @countdown-complete="handleCountdownComplete"
    />
    
    <div v-if="showGameContent" class="min-h-screen pb-[76px] pt-[76px]">
      <GameHeader 
        :objective="objective"
        @pause="handlePause"
        @settings="handleSettings"
      />
      
      <GameContent />
      
      <GameControls
        @preview="handlePreview"
        @save="handleSave"
      />
    </div>
  </div>
</template> 