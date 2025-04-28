<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'bullet' })"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="CSS_ICON_LIST_BULLET" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="CSS_ICON_LIST_ORDERED" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="CSS_ICON_LIST_TASK" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="CSS_ICON_LIST_TOGGLE" />
    </Button>
  </div>
</template>
