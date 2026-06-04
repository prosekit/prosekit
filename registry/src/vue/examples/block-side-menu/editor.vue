<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

import { sampleContent } from '../../sample/sample-doc-block-handle.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'
import { defineExtension } from '../block-handle/extension.ts'

import BlockSideMenu from './block-side-menu.vue'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const extension = defineExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
        <BlockSideMenu />
        <DropIndicator />
      </div>
    </div>
  </ProseKit>
</template>
