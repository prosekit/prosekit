<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { InlinePopover } from 'prosekit/vue/inline-popover'

import { ref } from 'vue'

const editor = useEditor<EditorExtension>({ update: true })

const linkUrl = ref('')
const linkInput = ref<HTMLElement | null>(null)

function addLink() {
  const href = linkUrl.value.trim()

  if (href.length) {
    editor.value.commands.addLink({ href })
  } else {
    editor.value.commands.toggleLink({ href: '' })
  }
  linkUrl.value = ''
}
</script>

<template>
  <InlinePopover class="INLINE_MENU" :editor="editor">
    <form class="flex gap-2" @submit.prevent="addLink">
      <input
        ref="linkInput"
        v-model="linkUrl"
        class="outline-none px-1 w-full"
        type="text"
        placeholder="https://"
      />
      <button type="submit">Add link</button>
      <button
        v-if="editor.marks.link.isActive()"
        @click="addLink()"
        @mousedown.prevent
      >
        Remove link
      </button>
    </form>
    <div @mousedown.prevent>@mousedown.prevent</div>
    <div>Click here close the popup</div>
  </InlinePopover>
</template>
