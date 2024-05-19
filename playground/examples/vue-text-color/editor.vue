<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultHTML =
  '<p>Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#ef4444;">Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#22c55e;">Select some text and click the buttons to change the color, or input a custom color.</p>' +
  '<p style="color:#3b82f6;">Select some text and click the buttons to change the color, or input a custom color.</p>'

const editor = createEditor({ extension: defineExtension(), defaultHTML })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_DOCUMENT">
        <div
          ref="editorRef"
          spellcheck="false"
          :class="Themes.EDITOR_CONTENT"
        ></div>
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
