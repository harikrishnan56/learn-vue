<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  // TODO: Implement pause functionality
  console.log('Game paused')
}

const handleSettings = () => {
  router.push('/settings')
}

const handlePreview = () => {
  // TODO: Implement preview functionality
  console.log('Preview clicked')
}

const handleSave = () => {
  // TODO: Implement save functionality
  console.log('Save clicked')
}
</script>

<template>
  <div class="min-h-screen bg-brand-white">
    <!-- Countdown and objective overlay -->
    <CountdownOverlay
      :is-visible="isCountdownVisible"
      @countdown-complete="handleCountdownComplete"
    />
    
    <!-- Game content -->
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