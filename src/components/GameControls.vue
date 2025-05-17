<script setup lang="ts">
import { ref } from 'vue'
import { GripVertical } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import GiraffeNumberButton from './GiraffeNumberButton.vue'

const selectedNumber = ref<number | null>(null)

const emit = defineEmits<{
  (e: 'check'): void
  (e: 'selectNumber', value: number): void
}>()

function handleCheck() {
  emit('check')
}

function handleNumberSelect(number: number) {
  selectedNumber.value = number
  emit('selectNumber', number)
}
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0">
    <div class="w-full h-2 bg-brand-green-strip"></div>
    <div class="bg-brand-green-light p-4 min-h-[238px] flex flex-col justify-center">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center gap-4 max-w-[360px] mx-auto">
          <div class="flex items-center gap-2 w-full">
            <GripVertical class="text-white" />
            <span class="text-sm text-white font-gabarito">Drag to reorder</span>
          </div>
          <div class="flex justify-center gap-4 w-full mb-4">
            <GiraffeNumberButton
              v-for="number in [3, 4, 5]"
              :key="number"
              :number="number"
              :selected="selectedNumber === number"
              @select="handleNumberSelect(number)"
            />
          </div>
          <div class="w-full">
            <BaseButton 
              label="Let's Check!" 
              variant="secondary"
              width="w-full"
              @click="handleCheck"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 