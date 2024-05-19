<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import ExtensionComponent from './extension-component.vue'
import InlineMenu from './inline-menu.vue'

const props = defineProps<{ placeholder: string }>()

const editor = createEditor({ extension: defineBasicExtension() })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <div ref="editorRef" spellcheck="false" class="EDITOR_CONTENT"></div>
        <InlineMenu />
      </div>
    </div>
    <ExtensionComponent :placeholder="props.placeholder" />
  </ProseKit>
</template>
