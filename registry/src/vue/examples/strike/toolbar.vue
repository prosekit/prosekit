<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="false"
      :disabled="!editor.commands.toggleStrike.canExec()"
      @click="editor.commands.toggleStrike()"
    >
      Strikethrough
    </Button>
  </div>
</template>
