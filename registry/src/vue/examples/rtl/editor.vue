<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { sampleContent } from '../../sample/sample-doc-rtl'
import { sampleUploader } from '../../sample/sample-uploader'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { SlashMenu } from '../../ui/slash-menu'
import { TableHandle } from '../../ui/table-handle'
import { Toolbar } from '../../ui/toolbar'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const extension = defineBasicExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT" dir="rtl">
      <Toolbar :uploader="sampleUploader" />
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT"></div>
        <InlineMenu />
        <SlashMenu />
        <BlockHandle placement="right" />
        <TableHandle />
        <DropIndicator />
      </div>
    </div>
  </ProseKit>
</template>
