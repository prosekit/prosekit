<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'

const props = defineProps<{
  defaultDoc?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineExtension()
const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
