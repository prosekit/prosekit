<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
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

import { defineExtension } from './extension'

export interface Props {
  defaultContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}

const props = defineProps<Props>()

const editor = createEditor({ extension: defineExtension(), defaultContent: props.defaultContent })

useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
