<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

const extension = defineBasicExtension()
const editor = createEditor({ extension })
</script>

<template>
  <ProseKit :editor="editor">
    <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_MINIMAL_EDITOR" />
  </ProseKit>
</template>
