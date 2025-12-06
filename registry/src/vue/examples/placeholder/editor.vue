<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/vue'

import { defineExtension } from './extension'

const props = defineProps<{
  initialContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: props.initialContent })

const handleDocChange = (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc))
useDocChange(handleDocChange, { editor })
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
