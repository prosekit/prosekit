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
import InlineMenu from './inline-menu.vue'

const defaultContent = `
  <p>Here is an <a href="https://www.example.com">example link</a></p>
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
      <InlineMenu />
      <div :class="Themes.CSS_EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
