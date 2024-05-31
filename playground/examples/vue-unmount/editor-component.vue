<script setup lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import ExtensionComponent from './extension-component.vue'

const props = defineProps<{ placeholder: string }>()

const editor = createEditor({ extension: defineBasicExtension() })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
      </div>
    </div>
    <ExtensionComponent :placeholder="props.placeholder" />
  </ProseKit>
</template>
