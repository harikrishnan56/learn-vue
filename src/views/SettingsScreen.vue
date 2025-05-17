<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col items-center p-4 pt-8 max-w-md mx-auto">
    <div class="w-full bg-gray-800 p-6 rounded-lg shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <button @click="goBack" class="text-blue-400 hover:text-blue-300">&lt; Back</button>
        <h1 class="text-2xl font-bold text-yellow-400">Settings</h1>
        <div class="w-8"></div>
      </div>

      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <span class="text-white">Sound Effects</span>
          <button class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">
            On
          </button>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-white">Background Music</span>
          <button class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">
            On
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 