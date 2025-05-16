<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface StageDetails {
  title: string
  description: string
  previewAnimationSrc: string
}

const router = useRouter()
const route = useRoute()
const stageId = ref(route.params.stageId as string)

const stageDetails = ref<StageDetails>({
  title: 'The Tall Giraffe',
  description: 'A delightful game about giraffes of varying heights. Can you spot the tallest?',
  previewAnimationSrc: '/path/to/stage1-preview-animation.riv'
})

function startGame() {
  router.push({ name: 'game', params: { stageId: stageId.value } })
}
</script>

<template>
  <div class="flex flex-col items-center p-4 pt-8 max-w-md mx-auto">
    <div class="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <button @click="router.back()" class="text-blue-400 hover:text-blue-300">&lt; Back</button>
        <h1 class="text-2xl font-bold text-yellow-400">{{ stageDetails.title }}</h1>
        <div class="w-8"></div>
      </div>

      <div class="bg-gray-700 h-64 w-full my-4 rounded flex items-center justify-center text-gray-500">
        <span>Animated game preview/illustration goes here</span>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2 text-yellow-300">Description</h2>
        <p class="text-gray-300">{{ stageDetails.description }}</p>
      </div>

      <button
        @click="startGame"
        class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
      >
        Play Game
      </button>
    </div>
  </div>
</template> 