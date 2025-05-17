<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameHeader from '../components/GameHeader.vue'
import GameContent from '../components/GameContent.vue'
import GameControls from '../components/GameControls.vue'

const router = useRouter()
const objective = ref('Order the giraffes by height')

// Game content is shown by default now, as countdown happens before this screen loads
const showGameContent = ref(true)

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

onMounted(() => {
  // Simulating countdown start if needed, or rely on CountdownOverlay's internal logic
})
</script>

<template>
  <div class="min-h-screen bg-brand-white">
    <!-- Game content is now always visible if this screen is active -->
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
    <div v-else>
      <!-- This part should ideally not be reached if logic is correct -->
      <p>Loading Game Screen...</p>
    </div>
  </div>
</template> 