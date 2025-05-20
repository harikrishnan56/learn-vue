<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import GamePreviewOverlay from '../components/GamePreviewOverlay.vue'

const router = useRouter()
const isPreviewVisible = ref(false)
const isGameStarted = ref(false)

function showPreview() {
  isPreviewVisible.value = true
}

function hidePreview() {
  isPreviewVisible.value = false
}

function startGame() {
  hidePreview()
  router.push('/game')
}

function startGameWithStage(stageNumber: number) {
  router.push({ path: '/game', query: { stage: stageNumber.toString() } })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-brand-white">
    <div v-if="!isGameStarted" class="w-full max-w-[360px] flex flex-col items-center">
      <div class="mb-16">
        <img src="../assets/logo.svg" alt="The Tall Giraff" class="w-[240px] h-auto" />
      </div>
      
      <div class="w-full space-y-4">
        <BaseButton label="Play" variant="primary" width="w-full" @click="showPreview" />
        <BaseButton label="Level 2" variant="secondary" width="w-full" @click="startGameWithStage(2)" />
        <BaseButton label="Level 3" variant="secondary" width="w-full" @click="startGameWithStage(3)" />
        <BaseButton label="Level 4" variant="secondary" width="w-full" @click="startGameWithStage(4)" />
      </div>
    </div>

    <div v-else class="w-full h-full">
      <!-- Game content will go here -->
    </div>

    <GamePreviewOverlay
      :is-visible="isPreviewVisible"
      @close="hidePreview"
      @game-start="startGame"
    />
  </div>
</template>