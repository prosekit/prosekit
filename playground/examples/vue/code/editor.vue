<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'
import { createEditor } from 'prosekit/core'

const defaultHTML = `
  <p><code>This is code</code></p>
  <p><span>This is normal text</span></p>
`

const editor = createEditor({ extension: defineExtension(), defaultHTML })
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
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
