<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import { defineCommitRecorder, type CommitRecorder } from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/vue'

const props = defineProps<{
  commitRecorder: CommitRecorder
  initialContent?: NodeJSON
}>()

const editor = createEditor({
  extension: union(
    defineBasicExtension(),
    defineCommitRecorder(props.commitRecorder),
  ),
  defaultContent: props.initialContent,
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
