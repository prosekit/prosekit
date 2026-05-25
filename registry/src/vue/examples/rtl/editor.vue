<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

import { sampleContent } from '../../sample/sample-doc-rtl.ts'
import { sampleUploader } from '../../sample/sample-uploader.ts'
import { BlockHandle } from '../../ui/block-handle/index.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'
import { InlineMenu } from '../../ui/inline-menu/index.ts'
import { SlashMenu } from '../../ui/slash-menu/index.ts'
import { TableHandle } from '../../ui/table-handle/index.ts'
import { Toolbar } from '../../ui/toolbar/index.ts'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const extension = defineBasicExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })
</script>

<template>
  <ProseKit :editor="editor">
    <div dir="rtl" class="CSS_EDITOR_VIEWPORT">
      <Toolbar :uploader="sampleUploader" />
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT"></div>
        <InlineMenu />
        <SlashMenu />
        <BlockHandle dir="rtl" />
        <TableHandle dir="rtl" />
        <DropIndicator />
      </div>
    </div>
  </ProseKit>
</template>
