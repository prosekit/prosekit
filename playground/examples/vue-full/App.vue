<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExampleExtension } from './extension'
import SlashMenu from './SlashMenu.vue'
import Toolbar from './Toolbar.vue'
import { createEditor } from 'prosekit/core'
import UserMenu from './UserMenu.vue'
import TagMenu from './TagMenu.vue'

const editor = createEditor({ extension: defineExampleExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <Toolbar />
    <div ref="editorRef" class="EDITOR_CONTENT"></div>
    <SlashMenu />
    <UserMenu />
    <TagMenu />
  </ProseKit>
</template>
