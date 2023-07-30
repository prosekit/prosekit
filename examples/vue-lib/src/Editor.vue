<script setup lang="ts">
import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { addExampleExtension } from './extension'
import SlashMenu from './SlashMenu.vue'
import { createEditor } from 'prosekit/core'
import UserMenu from './UserMenu.vue'
import TagMenu from './TagMenu.vue'

const editor = createEditor({ extension: addExampleExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" class="example-editor"></div>
    <UserMenu />
    <TagMenu />
    <SlashMenu />
  </ProseKit>
</template>
