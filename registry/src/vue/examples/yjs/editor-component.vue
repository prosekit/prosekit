<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/yjs/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import type { Awareness } from 'prosekit/extensions/yjs'
import type * as Y from 'yjs'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

const props = defineProps<{
  doc: Y.Doc
  awareness: Awareness
}>()

const extension = defineExtension(props.doc, props.awareness)
const editor = createEditor({ extension })
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <Toolbar />
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
