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
  isGameStarted.value = true
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-brand-white">
    <div v-if="!isGameStarted" class="w-full max-w-[360px] flex flex-col items-center">
      <div class="mb-16">
        <img src="../assets/logo.svg" alt="The Tall Giraff" class="w-[240px] h-auto" />
      </div>
      
      <div class="w-full space-y-4">
        <BaseButton
          label="Play"
          variant="primary"
          width="w-full"
          @click="showPreview"
        />
        
        <BaseButton
          label="Settings"
          variant="secondary"
          width="w-full"
          @click="router.push({ name: 'settings' })"
        />
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