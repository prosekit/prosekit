<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import InlineButtons from './InlineButtons.vue'

const editor = useEditor()
</script>

<template>
  <InlinePopover class="INLINE_MENU" :editor="editor">
    <InlineButtons />
  </InlinePopover>
</template>
