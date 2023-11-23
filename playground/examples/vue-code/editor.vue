<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

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
