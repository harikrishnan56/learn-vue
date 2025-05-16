<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()

function goToPlay() {
  router.push({ name: 'level-preview', params: { stageId: 'stage1' } })
}

function goToSettings() {
  router.push({ name: 'settings' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-brand-white">
    <div class="w-full max-w-[360px] flex flex-col items-center">
      <div class="mb-16">
        <img src="../assets/logo.svg" alt="The Tall Giraff" class="w-[240px] h-auto" />
      </div>
      
      <div class="w-full space-y-4">
        <BaseButton
          label="Play"
          variant="primary"
          width="w-full"
          @click="goToPlay"
        />
        
        <BaseButton
          label="Settings"
          variant="secondary"
          width="w-full"
          @click="goToSettings"
        />
      </div>
    </div>
  </div>
</template>