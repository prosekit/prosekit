<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { typographyContent } from './typography-content'

const editor = createEditor({
  extension: defineBasicExtension(),
  defaultContent: typographyContent,
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar />
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
