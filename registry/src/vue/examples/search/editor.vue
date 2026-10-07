<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

import { sampleContent } from '../../sample/sample-doc-search.ts'
import { Search } from '../../ui/search/index.ts'

import { defineExtension } from './extension.ts'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const extension = defineExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({
  extension,
  defaultContent,
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <Search />
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
