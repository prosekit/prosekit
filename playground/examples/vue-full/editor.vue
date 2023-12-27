<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import InlineMenu from './inline-menu.vue'
import SlashMenu from './slash-menu.vue'
import TagMenu from './tag-menu.vue'
import Toolbar from './toolbar.vue'
import UserMenu from './user-menu.vue'
import { defineExtension } from './extension'

const editor = createEditor({ extension: defineExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <Toolbar />
        <div ref="editorRef" class="EDITOR_CONTENT"></div>
        <InlineMenu />
        <SlashMenu />
        <UserMenu />
        <TagMenu />
      </div>
    </div>
  </ProseKit>
</template>
