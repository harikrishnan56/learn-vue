<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next'

interface Props {
  height: number
  giraffeColor: string
  id: string
  isSelected: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  giraffeColor: 'brand-yellow'
})

const emit = defineEmits<{
  (e: 'select'): void
}>()

const handleClick = () => {
  emit('select')
}
</script>

<template>
  <div 
    :class="[
      'relative flex items-center p-4 rounded-[10px] cursor-move transition-all duration-200',
      isSelected ? 'bg-brand-light-yellow border-2 border-brand-yellow' : 'bg-brand-gray-light border-2 border-transparent'
    ]"
    @click="handleClick"
  >
    <div class="absolute top-2 right-2">
      <GripVertical class="w-5 h-5 text-brand-gray-text" />
    </div>
    <div class="flex items-center gap-4 w-full">
      <div 
        :class="[
          'w-12 h-16 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-200 transform',
          isSelected ? 'scale-105' : ''
        ]"
        :style="{ backgroundColor: `var(--${props.giraffeColor})` }"
      >
        <span class="text-white font-bold text-xl">G</span>
      </div>
      <div class="flex-1">
        <h3 class="font-gabarito font-bold text-lg">{{ height }} cm</h3>
        <p class="text-sm text-brand-gray-text">Giraffe #{{ id }}</p>
      </div>
    </div>
  </div>
</template> 