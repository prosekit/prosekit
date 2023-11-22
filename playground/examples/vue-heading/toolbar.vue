<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :active="editor.nodes.heading.isActive({ level: 1 })"
      :onChange="() => editor.commands.toggleHeading({ level: 1 })"
      :available="true"
    >
      H1
    </Toggle>

    <Toggle
      :active="editor.nodes.heading.isActive({ level: 2 })"
      :onChange="() => editor.commands.toggleHeading({ level: 2 })"
      :available="true"
    >
      H2
    </Toggle>

    <Toggle
      :active="editor.nodes.heading.isActive({ level: 3 })"
      :onChange="() => editor.commands.toggleHeading({ level: 3 })"
      :available="true"
    >
      H3
    </Toggle>
  </div>
</template>
