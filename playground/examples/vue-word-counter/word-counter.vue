<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { computed } from 'vue'

const editor = useEditor<EditorExtension>({ update: true })

const wordCount = computed(() => {
  if (!editor.value.mounted) {
    return 0
  }
  const text = editor.value.view.state.doc.textContent
  return text.split(/\s+/).length
})
</script>

<template>
  <div class="p-4 text-center italic tabular-nums">
    Word Count: {{ wordCount }}
  </div>
</template>
