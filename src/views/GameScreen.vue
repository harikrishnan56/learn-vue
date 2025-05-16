<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  stageId: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()

const showLetsGoModal = ref(false)
const showCountdown = ref(false)
const countdownNumber = ref<number | string>('Ready?')
const showGameObjective = ref(false)

onMounted(() => {
  showLetsGoModal.value = true
})

function handleLetsGo() {
  showLetsGoModal.value = false
  startCountdown()
}

async function startCountdown() {
  showCountdown.value = true
  const sequence: (string | number)[] = ['Ready?', 3, 2, 1]
  
  for (const item of sequence) {
    countdownNumber.value = item
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  showCountdown.value = false
  showGameObjective.value = true
}

const countdownOverlayClass = computed(() => 
  showCountdown.value ? 'bg-blue-600' : 'bg-transparent'
)

function quitGame() {
  router.push({ name: 'level-preview', params: { stageId: props.stageId } })
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
    <div
      v-if="showLetsGoModal"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click.self="quitGame"
    >
      <div class="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <button @click="quitGame" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <h2 class="text-2xl font-bold mb-4">Compare the numbers and find out who is taller?</h2>
        <div class="bg-gray-200 h-40 w-full my-6 rounded flex items-center justify-center text-gray-400">
          <span>Preview Area</span>
        </div>
        <button
          @click="handleLetsGo"
          class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
        >
          Let's Go!
        </button>
      </div>
    </div>

    <div
      v-if="showCountdown"
      :class="countdownOverlayClass"
      class="fixed inset-0 flex items-center justify-center text-white text-8xl font-bold z-40 transition-colors duration-300"
    >
      <span>{{ countdownNumber }}</span>
    </div>

    <div v-if="showGameObjective" class="flex flex-col items-center w-full max-w-2xl">
      <div class="absolute top-4 left-4">
        <button @click="quitGame" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Quit
        </button>
      </div>
      <div class="absolute top-4 right-4">
        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Pause
        </button>
      </div>

      <h1 class="text-3xl font-bold my-8 text-center">Order the giraffes based on their height.</h1>
      <div class="w-full h-96 bg-gray-700 rounded-lg p-4 text-center">
        <p class="mt-16">Game Area for Stage: {{ props.stageId }}</p>
      </div>
    </div>
  </div>
</template> 