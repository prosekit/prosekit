<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import EditorComponent from './editor-component.vue'

const editorKeys = ref<number[]>([])
const nextKey = ref(1)

const addEditor = () => {
  const key = nextKey.value
  nextKey.value += 1
  editorKeys.value.push(key)
}

const removeEditor = (key: number) => {
  editorKeys.value = editorKeys.value.filter((k) => k !== key)
}

watchEffect(() => {
  if (nextKey.value === 1) {
    addEditor()
  }
})
</script>

<template>
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <button @click="addEditor" className="border p-2">Add editor</button>
      <button
        v-for="key in editorKeys"
        :key="key"
        @click="() => removeEditor(key)"
        className="border p-2"
      >
        Unmount No.{{ key }}
      </button>
    </div>

    <div v-for="key in editorKeys" :key="key" className="h-32">
      <EditorComponent
        :placeholder="`Editor No.${key} of ${editorKeys.length}`"
      />
    </div>
  </div>
</template>
