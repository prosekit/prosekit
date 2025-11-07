<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { DEFAULT_DRAG_AND_DROP_CONTENT } from '../../sample/default-content-drag-and-drop'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: DEFAULT_DRAG_AND_DROP_CONTENT })

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
        <BlockHandle />
        <DropIndicator />
      </div>
    </div>
  </ProseKit>
</template>
