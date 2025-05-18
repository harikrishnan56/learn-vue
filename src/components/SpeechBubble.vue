<template>
  <transition name="fade">
    <div 
      v-if="props.visible"
      class="speech-bubble-container"
    >
      <div 
        :class="[
          'relative bg-[#3A8737] text-white text-xs sm:text-sm font-semibold p-2 sm:p-3 rounded-lg shadow-md',
          props.multiLine ? 'whitespace-normal' : 'whitespace-nowrap'
        ]"
      >
        {{ props.text }}
        <div 
          class="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#3A8737]"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  visible: boolean;
  multiLine?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  multiLine: false
});
</script>

<style scoped>
.speech-bubble-container {
  display: inline-block;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 