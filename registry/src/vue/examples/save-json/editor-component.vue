<script setup lang="ts">
import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

const props = defineProps<{
  defaultContent: NodeJSON | undefined
  onDocChange: () => void
  onGetEditor: (editor: ReturnType<typeof createEditor>) => void
}>()

const extension = defineBasicExtension()
const editor = createEditor({ extension, defaultContent: props.defaultContent })

props.onGetEditor(editor)

function handleDocChange() {
  props.onDocChange()
}

useDocChange(handleDocChange, { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_SCROLLING">
      <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
    </div>
  </ProseKit>
</template>
