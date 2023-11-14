<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import Toolbar from './Toolbar.vue'
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
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <Toolbar />
        <div ref="editorRef" class="EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
