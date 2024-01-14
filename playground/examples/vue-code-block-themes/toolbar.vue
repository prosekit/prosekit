<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import ThemeSelector from './theme-selector.vue'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="!editor.commands.insertNode.canApply({ type: 'codeBlock' })"
      :onClick="() => editor.commands.insertNode({ type: 'codeBlock' })"
    >
      <div className="ICON_CODE_BLOCK" />
    </Toggle>
    <ThemeSelector />
  </div>
</template>
