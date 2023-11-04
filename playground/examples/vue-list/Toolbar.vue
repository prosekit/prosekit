<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import ToggleButton from './ToggleButton.vue'

const editor = useEditor<EditorExtension>()
</script>

<template>
  <div class="TOOLBAR">
    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'bullet' })"
      :available="editor.commands.toggleList.canApply({ kind: 'bullet' })"
      @change="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="ICON_LIST_BULLET"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'ordered' })"
      :available="editor.commands.toggleList.canApply({ kind: 'ordered' })"
      @change="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="ICON_LIST_ORDERED"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'task' })"
      :available="editor.commands.toggleList.canApply({ kind: 'task' })"
      @change="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="ICON_LIST_TASK"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.list.isActive({ kind: 'toggle' })"
      :available="editor.commands.toggleList.canApply({ kind: 'toggle' })"
      @change="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="ICON_LIST_TOGGLE"></div>
    </ToggleButton>
  </div>
</template>
