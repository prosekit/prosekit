<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { computed } from 'vue'

const editor = useEditor<EditorExtension>({ update: true })

const wordCount = computed(() => {
  const doc = editor.value.mounted && editor.value.view.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  return words.split(/\s+/).filter((s) => s).length
})

const characterCount = computed(() => {
  const doc = editor.value.mounted && editor.value.view.state.doc
  return doc ? doc.textContent.length : 0
})
</script>

<template>
  <div class="p-4 text-center italic tabular-nums">
    Word Count: {{ wordCount }}
    <br />
    Character Count: {{ characterCount }}
  </div>
</template>
