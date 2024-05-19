<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import Toolbar from './toolbar.vue'
import { defineExtension } from './extension'

const defaultHTML = `
  <p><i>This is italic</i></p>
  <p><em>This is italic too</em></p>
  <p><span>This is normal text</span></p>
`

const editor = createEditor({ extension: defineExtension(), defaultHTML })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_DOCUMENT">
        <Toolbar />
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
