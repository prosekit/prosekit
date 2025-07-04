<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { defineExtension } from './extension'
import TableHandle from './table-handle.vue'

const defaultContent = `
<table><tbody>
  <tr>
    <td>A1</td>
    <td>B1</td>
    <td>C1</td>
    <td>D1</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>B2</td>
    <td>C2</td>
    <td>D2</td>
  </tr>
</tbody></table>
`

const editor = createEditor({ extension: defineExtension(), defaultContent })
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
      <TableHandle />
    </div>
  </ProseKit>
</template>
