<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

import BlockHandle from './block-handle.vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'
import SlashMenu from './slash-menu.vue'
import TagMenu from './tag-menu.vue'
import Toolbar from './toolbar.vue'
import UserMenu from './user-menu.vue'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar />
      <div class="CSS_EDITOR_SCROLLING">
        <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
        <InlineMenu />
        <SlashMenu />
        <UserMenu />
        <TagMenu />
        <BlockHandle />
      </div>
    </div>
  </ProseKit>
</template>
