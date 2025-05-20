<template>
  <div class="text-brand-green-strip text-xl font-gabarito font-bold">{{ label }}</div>
</template>

<script setup lang="ts">
interface Props {
  label: 'A' | 'B'
}

defineProps<Props>()
</script> 