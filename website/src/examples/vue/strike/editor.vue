<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const defaultContent = `
  <p><s>Strikethrough</s></p>
  <p><del>Strikethrough</del></p>
  <p><span style="text-decoration: line-through;">Strikethrough</span></p>
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
    <div :class="Themes.CSS_EDITOR_VIEWPORT">
      <Toolbar />
      <div :class="Themes.CSS_EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
