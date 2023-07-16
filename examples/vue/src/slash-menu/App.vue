<script setup lang="ts">
import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { addExampleExtension } from './extension'
import ToggleItalicButton from './ToggleItalicButton.vue'
import SlashMenu from './SlashMenu.vue'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: addExampleExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" class="example-editor"></div>
    <ToggleItalicButton />
    <SlashMenu />
  </ProseKit>
</template>
