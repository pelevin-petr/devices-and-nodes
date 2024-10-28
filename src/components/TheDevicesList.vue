<script setup lang="ts">
import {ref} from 'vue'
import TheNodesList from "./TheNodesList.vue";
import {type Device} from "../interfaces.ts";


const devices = ref<Device[]>([
  {
    id: 1,
    name: 'Устройство 1',
    nodes: [{id: 1, name: 'Узел 1'}, {id: 2, name: 'Узел 2'}]
  },
  {
    id: 2,
    name: 'Устройство 2',
    nodes: [{id: 3, name: 'Узел 1'}]
  },
  {
    id: 3,
    name: 'Устройство 2',
    nodes: [{id: 4, name: 'Узел 1'}]
  },
  {
    id: 4,
    name: 'Устройство 2',
    nodes: [{id: 5, name: 'Узел 1'}]
  }
])
const editIndex = ref<null | number>(null)
const editName = ref<string>('')
const hoveredDeviceIndex = ref<null | number>(null)
const editNodeIndex = ref<null | number>(null)
const editNodeName = ref<string>('')

const addDevice = () => {
  devices.value.push({id: Date.now(), name: `Устройство ${devices.value.length + 1}`, nodes: []})
}

const startEdit = (index: number | null, name: string) => {
  editIndex.value = index
  editName.value = name
}

const saveEdit = (index: number) => {
  if (editIndex.value !== null) {
    devices.value[index].name = editName.value
    editIndex.value = null
  }
}

const cancelEdit = () => {
  editIndex.value = null
}

const deleteDevice = (index: number) => {
  devices.value.splice(index, 1)
}

const addNode = (deviceIndex: number) => {
  const newNode = {id: Date.now(), name: `Узел ${devices.value[deviceIndex].nodes.length + 1}`}
  devices.value[deviceIndex].nodes.push(newNode)
}

const startEditNode = (nodeName: string, nodeIndex: number) => {
  editNodeIndex.value = nodeIndex
  editNodeName.value = nodeName
}

const saveEditNode = (deviceIndex: number, nodeIndex: number) => {
  if (editNodeIndex.value !== null) {
    devices.value[deviceIndex].nodes[nodeIndex].name = editNodeName.value
    editNodeIndex.value = null
  }
}

const cancelEditNode = () => {
  editNodeIndex.value = null
}

const deleteNode = (deviceIndex: number, nodeIndex: number) => {
  devices.value[deviceIndex].nodes.splice(nodeIndex, 1)
}

const moveNodeUp = (deviceIndex: number, nodeIndex: number) => {
  if (nodeIndex > 0) {
    const nodes = devices.value[deviceIndex].nodes
    const temp = nodes[nodeIndex - 1]
    nodes[nodeIndex - 1] = nodes[nodeIndex]
    nodes[nodeIndex] = temp
  }
}

const moveNodeDown = (deviceIndex: number, nodeIndex: number) => {
  const nodes = devices.value[deviceIndex].nodes
  if (nodeIndex < nodes.length - 1) {
    const temp = nodes[nodeIndex + 1]
    nodes[nodeIndex + 1] = nodes[nodeIndex]
    nodes[nodeIndex] = temp
  }
}

</script>

<template>
  <div class="mx-auto w-[400px]">
    <ul>
      <li
          v-for="(device, index) in devices"
          :key="device.id"
          class="relative border border-gray-300 bg-slate-100 hover:bg-slate-200 h-[40px] flex items-center justify-between mb-2 rounded-md"
      >
        <div v-if="editIndex === index" class="flex w-full items-center px-2">
          <input v-model="editName" class="border px-2 py-1 rounded-md w-full"/>
          <button @click="saveEdit(index)" class="ml-2 text-green-600">
            ✔️
          </button>
          <button @click="cancelEdit" class="ml-2 text-red-600">
            ❌
          </button>
        </div>
        
        <div v-else class="flex items-center w-full px-2">
          
          {{ device.name }}
          <button class="ml-auto mr-4" @click="startEdit(index, device.name)">✏️</button>
          <button @click="deleteDevice(index)" class="mr-2">🗑️</button>
          
          <div class="relative ml-4" @mouseenter="hoveredDeviceIndex = index">
            <span class="cursor-pointer">&#10148;</span>
            <TheNodesList
                v-if="hoveredDeviceIndex === index"
                :nodes="device.nodes"
                :deviceIndex="index"
                :editNodeIndex="editNodeIndex!"
                v-model:editNodeName="editNodeName"
                @addNode="addNode"
                @startEditNode="startEditNode"
                @saveEditNode="saveEditNode"
                @cancelEditNode="cancelEditNode"
                @deleteNode="deleteNode"
                @moveNodeUp="moveNodeUp"
                @moveNodeDown="moveNodeDown"
            />
          </div>
        </div>
      </li>
    </ul>
    
    <div class="mx-auto w-[400px] mt-[5px]">
      <button
          class="w-full font-semibold border border-gray-300 bg-green-200 hover:bg-green-300 h-[40px] rounded-lg flex items-center justify-center"
          @click="addDevice">
        + Добавить устройство
      </button>
    </div>
  </div>
</template>

<style scoped>
ul li ul {
  display: none;
}

ul li:hover ul {
  display: block;
}
</style>

