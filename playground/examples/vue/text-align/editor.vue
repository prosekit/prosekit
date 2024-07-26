<script setup lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'

const defaultContent =
  '<h1 style="text-align:center;">Heading</h1>' +
  '<p style="text-align:left;">First paragraph</p>' +
  '<p style="text-align:center;">Second paragraph</p>' +
  '<p style="text-align:right;">Third paragraph</p>'

const editor = createEditor({ extension: defineExtension(), defaultContent })

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
        <div
          ref="editorRef"
          spellcheck="false"
          :class="Themes.EDITOR_CONTENT"
        />
      </div>
    </div>
  </ProseKit>
</template>
