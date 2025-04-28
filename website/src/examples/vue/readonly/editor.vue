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
import Toolbar from './toolbar.vue'

const editor = createEditor({
  extension: defineExtension(),
  defaultContent: 'The content is readonly. Press the buttons above to toggle the readonly mode.',
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
