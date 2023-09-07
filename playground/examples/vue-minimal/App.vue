<script setup lang="ts">
import 'prosekit/basic/internal/preflight.css'
import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

const extension = addBasicExtension()
const editor = createEditor({ extension })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" class="EDITOR_CONTENT"></div>
  </ProseKit>
</template>
