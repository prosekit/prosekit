<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { sampleContent } from '../../sample/sample-doc-search'
import { Search } from '../../ui/search'

import { defineExtension } from './extension'

const props = defineProps<{
  initialContent?: NodeJSON
}>()

const extension = defineExtension()
const defaultContent = props.defaultContent ?? sampleContent
const editor = createEditor({
  extension,
  defaultContent,
})

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <Search />
        <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
