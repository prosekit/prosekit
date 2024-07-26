<script setup lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultContent =
  '<p>' +
  '<span style="color: #ef4444">Select</span> ' +
  '<span style="color: #f97316">some</span> ' +
  '<span style="color: #eab308">text</span> ' +
  '<span style="color: #22c55e">to</span> ' +
  '<span style="color: #3b82f6">change</span> ' +
  '<span style="color: #6366f1">the</span> ' +
  '<span style="color: #a855f7">color</span> ' +
  '</p>'

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
      <div :class="Themes.EDITOR_SCROLLING">
        <div
          ref="editorRef"
          spellcheck="false"
          :class="Themes.EDITOR_CONTENT"
        />
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
