<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      tooltip="Heading 1"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      H1
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      tooltip="Heading 2"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      H2
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      tooltip="Heading 3"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      H3
    </Button>
  </div>
</template>
