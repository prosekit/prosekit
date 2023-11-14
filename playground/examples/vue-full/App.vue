<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import InlineMenu from './InlineMenu.vue'
import SlashMenu from './SlashMenu.vue'
import TagMenu from './TagMenu.vue'
import Toolbar from './Toolbar.vue'
import UserMenu from './UserMenu.vue'
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
