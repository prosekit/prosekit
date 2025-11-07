<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { defaultContent } from '../../sample/sample-doc-full'
import { sampleUploader } from '../../sample/sample-uploader'
import { tags } from '../../sample/tag-data'
import { users } from '../../sample/user-data'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { SlashMenu } from '../../ui/slash-menu'
import { TableHandle } from '../../ui/table-handle'
import { TagMenu } from '../../ui/tag-menu'
import { Toolbar } from '../../ui/toolbar'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar :uploader="sampleUploader" />
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT"></div>
        <InlineMenu />
        <SlashMenu />
        <UserMenu :users="users" />
        <TagMenu :tags="tags" />
        <BlockHandle />
        <TableHandle />
        <DropIndicator />
      </div>
    </div>
  </ProseKit>
</template>
