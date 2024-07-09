<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Button from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'bullet' })"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div :class="Themes.ICON_LIST_BULLET"></div>
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'ordered' })"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div :class="Themes.ICON_LIST_ORDERED"></div>
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'task' })"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div :class="Themes.ICON_LIST_TASK"></div>
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'toggle' })"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div :class="Themes.ICON_LIST_TOGGLE"></div>
    </Button>
  </div>
</template>
