<script setup lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { watchPostEffect, ref } from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const defaultContent = `
  <p><u>Underline</u></p>
  <p><span style="text-decoration-line: underline;">Underline</span></p>
  <p><span>Normal text</span></p>
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
    <div :class="Themes.EDITOR_VIEWPORT">
      <Toolbar />
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
