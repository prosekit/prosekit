<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

const props = defineProps<{
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineBasicExtension()
const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
    </div>
  </ProseKit>
</template>
