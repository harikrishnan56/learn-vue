<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

const emit = defineEmits<{
  (e: 'preview'): void
  (e: 'save'): void
}>()
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-gray-border p-4 z-10">
    <div class="flex items-center justify-between max-w-screen-xl mx-auto">
      <div class="flex items-center gap-2">
        <GripVertical class="text-brand-gray-dark" />
        <span class="text-sm text-brand-gray-dark font-gabarito">Drag to reorder</span>
      </div>
      <div class="flex items-center gap-4">
        <BaseButton 
          label="Preview" 
          variant="secondary"
          width="w-[108px]"
          @click="emit('preview')"
        />
        <BaseButton 
          label="Save" 
          variant="primary"
          width="w-[108px]"
          @click="emit('save')"
        />
      </div>
    </div>
  </div>
</template> 