<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.nodes.horizontalRule.isActive()"
      tooltip="Divider"
      @click="() => editor.commands.insertHorizontalRule()"
    >
      <div class="CSS_ICON_MINUS"></div>
    </Button>
  </div>
</template>
