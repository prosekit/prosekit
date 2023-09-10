<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

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
    <div ref="editorRef" class="EDITOR_CONTENT"></div>
    <ToggleItalicButton />
    <SlashMenu />
  </ProseKit>
</template>
