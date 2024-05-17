<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const defaultHTML =
  '<h1 style="text-align:center;">Heading</h1>' +
  '<p style="text-align:left;">First paragraph</p>' +
  '<p style="text-align:center;">Second paragraph</p>' +
  '<p style="text-align:right;">Third paragraph</p>'

const editor = createEditor({ extension: defineExtension(), defaultHTML })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <Toolbar />
        <div ref="editorRef" spellcheck="false" class="EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
