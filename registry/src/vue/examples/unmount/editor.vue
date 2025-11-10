<script setup lang="ts">
import { ref } from 'vue'

import EditorComponent from './editor-component.vue'

const nextKey = ref(1)
const editorKeys = ref<number[]>([])

function addEditor() {
  const key = nextKey.value
  nextKey.value += 1
  editorKeys.value = [...editorKeys.value, key]
}

function removeEditor(key: number) {
  editorKeys.value = editorKeys.value.filter((k) => k !== key)
}

// Add the first editor on mount
if (nextKey.value === 1) {
  addEditor()
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <button class="border p-2" @click="addEditor">
        Add editor
      </button>
      <button
        v-for="key in editorKeys"
        :key="key"
        class="border p-2"
        @click="removeEditor(key)"
      >
        Unmount No.{{ key }}
      </button>
    </div>
    <div v-for="key in editorKeys" :key="key" class="h-32">
      <EditorComponent :placeholder="`Editor No.${key} of ${editorKeys.length}`" />
    </div>
  </div>
</template>
