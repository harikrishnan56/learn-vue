<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToStage1Preview() {
  router.push({ name: 'level-preview', params: { stageId: 'stage1' } })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-5xl font-bold mb-12 text-yellow-400">Giraff Game</h1>
    <button
      @click="goToStage1Preview"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-2xl"
    >
      Play Stage 1
    </button>
  </div>
</template>