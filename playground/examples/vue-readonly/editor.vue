<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import Toolbar from './toolbar.vue'
import { createEditor } from 'prosekit/core'

const editor = createEditor({
  extension: defineExtension(),
  defaultHTML:
    'The content is readonly. Press the buttons above to toggle the readonly mode.',
})
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
