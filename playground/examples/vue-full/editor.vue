<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import BlockHandle from './block-handle.vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'
import SlashMenu from './slash-menu.vue'
import TagMenu from './tag-menu.vue'
import Toolbar from './toolbar.vue'
import UserMenu from './user-menu.vue'
import { Themes } from '@prosekit/themes'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <Toolbar />
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
        <InlineMenu />
        <SlashMenu />
        <UserMenu />
        <TagMenu />
        <BlockHandle />
      </div>
    </div>
  </ProseKit>
</template>
