<script setup lang="ts">
import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  union,
} from 'prosekit/core'
import {
  defineCommitViewer,
  type Commit,
} from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/vue'

const props = defineProps<{ commit: Commit }>()

const editor = createEditor({
  extension: union(
    defineBasicExtension(),
    defineReadonly(),
    defineCommitViewer(props.commit),
  ),
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
