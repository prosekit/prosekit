<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

import ExtensionComponent from './extension-component.vue'

const props = defineProps<{
  placeholder: string
}>()

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
    <ExtensionComponent :placeholder="props.placeholder" />
  </ProseKit>
</template>
