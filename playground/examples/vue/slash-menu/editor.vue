<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import SlashMenu from './slash-menu.vue'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
        <SlashMenu />
      </div>
    </div>
  </ProseKit>
</template>
