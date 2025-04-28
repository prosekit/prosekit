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

const defaultContent = '<h1 style="text-align:center;">Heading</h1>'
  + '<p style="text-align:left;">First paragraph</p>'
  + '<p style="text-align:center;">Second paragraph</p>'
  + '<p style="text-align:right;">Third paragraph</p>'

const editor = createEditor({ extension: defineExtension(), defaultContent })

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
        <div
          ref="editorRef"
          spellcheck="false"
          class="CSS_EDITOR_CONTENT"
        />
      </div>
    </div>
  </ProseKit>
</template>
