<script setup lang="ts">
import { ref, watch } from 'vue'
import GameButton from './GameButton.vue'
import type { TownData } from '../stores/gameStore'
import BaseButton from './BaseButton.vue'

interface Props {
  towns: Pick<TownData,'id'|'label'>[]
  initialOrder?: string[]
}
const props = defineProps<Props>()

interface Emits {
  (e: 'order-updated', newOrder: string[]): void
  (e: 'check'): void
}
const emit = defineEmits<Emits>()

const ordered = ref<Pick<TownData,'id'|'label'>[]>([])
watch(
  () => props.towns,
  (newTowns: Pick<TownData,'id'|'label'>[]) => {
    if (props.initialOrder && props.initialOrder.length === newTowns.length) {
      ordered.value = props.initialOrder
        .map(id => newTowns.find(t => t.id === id))
        .filter((x): x is Pick<TownData,'id'|'label'> => Boolean(x));
    } else {
      ordered.value = [...newTowns];
    }
  },
  { immediate: true, deep: true }
)
let dragItem=ref<Pick<TownData,'id'|'label'>|null>(null)
let dragIndex=ref<number>(-1)
function onDragStart(item: Pick<TownData,'id'|'label'>, index: number){dragItem.value=item;dragIndex.value=index}
function onDragOver(e: DragEvent){e.preventDefault()}
function onDrop(index:number){
  if(dragItem.value&&dragIndex.value!==-1&&dragIndex.value!==index){
    const newArr=[...ordered.value]
    newArr.splice(dragIndex.value,1)
    newArr.splice(index,0,dragItem.value!)   
    ordered.value=newArr
    emit('order-updated',newArr.map(t=>t.id))
  }
  dragItem.value=null
  dragIndex.value=-1
}
function onCheck(){emit('check')}
</script>

<template>
  <div class="pt-8 sm:pt-12 pb-6 sm:pb-8 px-2 sm:px-4 bg-[#4FAB4C] rounded-t-xl shadow-lg w-full flex flex-col items-center space-y-4 sm:space-y-6 h-[180px] sm:h-[200px]">
    <div class="flex flex-wrap justify-center gap-2">
      <div
        v-for="(t,i) in ordered"
        :key="t.id"
        draggable
        @dragstart="onDragStart(t,i)"
        @dragover="onDragOver"
        @drop.prevent="onDrop(i)"
        class="cursor-move"
      >
        <GameButton :value="t.label" variant="secondary" :selected="false" :draggable="true" />
      </div>
    </div>
    <BaseButton label="Let's Check!" variant="secondary" @click="onCheck" class="w-auto px-8 sm:px-15 py-2 sm:py-3" />
  </div>
</template>

<style scoped>
</style> 