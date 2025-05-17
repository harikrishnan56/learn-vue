<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'icon'
  width?: string
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  width: 'w-auto',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const buttonClasses = computed(() => {
  let base = 'px-4 py-2 rounded-[10px] text-sm font-gabarito font-normal flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2'
  if (props.width === 'w-[108px]') {
    base += ' h-[38px]'
  } else {
    base += ' h-[38px]'
  }

  if (props.variant === 'primary') {
    return `${base} bg-brand-teal text-brand-white border border-brand-teal-dark shadow-button-teal hover:bg-opacity-90 focus:ring-brand-teal`
  }
  if (props.variant === 'icon') {
    return `${base} bg-brand-white text-brand-icon-dark border border-brand-gray-border shadow-button-gray hover:bg-brand-gray-light focus:ring-brand-teal-dark`
  }
  return `${base} bg-brand-white text-brand-black border border-brand-gray-border shadow-button-gray hover:bg-brand-gray-light focus:ring-brand-teal-dark`
})

function handleClick() {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button 
    :class="[buttonClasses, props.width, { 'opacity-50 cursor-not-allowed': props.disabled }]" 
    @click="handleClick" 
    :disabled="disabled"
  >
    <span v-if="icon">
      <svg v-if="icon === 'bookmark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brand-icon-dark">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </span>
    <span v-if="label">{{ label }}</span>
  </button>
</template> 