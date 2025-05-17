<script setup lang="ts">
interface Props {
  number: number
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <button
    @click="emit('select')"
    :class="[
      'w-[98px] h-[61px] rounded-[10px] border-2 transition-all duration-200 text-xl font-gabarito font-bold',
      selected ? 'bg-giraffe-fill border-giraffe-stroke text-giraffe-stroke' : 'bg-brand-gray-light border-transparent text-brand-gray-text hover:bg-opacity-80'
    ]"
  >
    {{ number }}
  </button>
</template> 