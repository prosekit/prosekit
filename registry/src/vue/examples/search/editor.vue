<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import { Search } from '../../ui/search'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({
  extension,
  defaultContent: '<p>Baa, baa, black sheep,</p>'
    + '<p>Have you any wool?</p>'
    + '<p>Yes, sir, yes, sir,</p>'
    + '<p>Three bags full;</p>'
    + '<p>One for the master,</p>'
    + '<p>And one for the dame,</p>'
    + '<p>And one for the little boy</p>'
    + '<p>Who lives down the lane.</p>',
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
