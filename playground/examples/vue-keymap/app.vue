<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineBasicExtension } from 'prosekit/basic'

import KeymapConfig from './keymap-config.vue'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div ref="editorRef" class="EDITOR_CONTENT"></div>
      <KeymapConfig />
    </div>
  </ProseKit>
</template>
