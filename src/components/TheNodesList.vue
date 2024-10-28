<script setup lang="ts">
import { ref, watch } from 'vue'
import {type Node} from "../interfaces.ts";

const props = defineProps<{
  nodes: Node[],
  deviceIndex: number,
  editNodeIndex: number | null,
  editNodeName: string
}>()

const emit = defineEmits<{
  (e: 'update:editNodeName', value: string): void,
  (e: 'addNode', deviceIndex: number): void,
  (e: 'startEditNode', nodeName: string, nodeIndex: number): void,
  (e: 'saveEditNode', deviceIndex: number, nodeIndex: number): void,
  (e: 'cancelEditNode'): void,
  (e: 'deleteNode', deviceIndex: number, nodeIndex: number): void,
  (e: 'moveNodeUp', deviceIndex: number, nodeIndex: number): void,
  (e: 'moveNodeDown', deviceIndex: number, nodeIndex: number): void,
}>()

const localEditNodeName = ref(props.editNodeName)

watch(
  () => props.editNodeName,
  (newValue) => {
    localEditNodeName.value = newValue
  }
)

const handleInputChange = () => {
  emit('update:editNodeName', localEditNodeName.value)
}
</script>

<template>
  <ul class="absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-[330px]">
    <li
      v-for="(node, nodeIndex) in nodes"
      :key="node.id"
      class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 w-full"
    >
      <div v-if="editNodeIndex === nodeIndex" class="flex justify-between items-center">
        <input v-model="localEditNodeName" @input="handleInputChange" class="border px-2 py-1 w-[150px] rounded-md" />
        <div class="w-full">
          <button @click="$emit('saveEditNode', deviceIndex, nodeIndex)" class="ml-2 text-green-600">✔️</button>
          <button @click="$emit('cancelEditNode')" class="ml-2 text-red-600">❌</button>
        </div>
      </div>
      <div v-else class="flex justify-between items-center w-full">
        {{ node.name }}
        <div>
           <button @click="$emit('moveNodeUp', deviceIndex, nodeIndex)" :disabled="nodeIndex === 0" class="ml-2">⬆️</button>
          <button @click="$emit('moveNodeDown', deviceIndex, nodeIndex)" :disabled="nodeIndex === nodes.length - 1" class="ml-2">⬇️</button>
          <button @click="$emit('startEditNode', node.name, nodeIndex)" class="ml-2 text-blue-500">✏️</button>
          <button @click="$emit('deleteNode', deviceIndex, nodeIndex)" class="text-red-500 ml-2">🗑️</button>
        </div>
      </div>
    </li>
    <li class="flex items-center">
      <button @click="$emit('addNode', deviceIndex)" class="text-blue-500 w-full text-left px-4 py-2 hover:bg-gray-100">
        + Добавить узел
      </button>
    </li>
  </ul>
</template>
