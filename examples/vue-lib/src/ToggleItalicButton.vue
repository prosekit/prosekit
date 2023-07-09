<script setup lang="ts">
import { useNoteEditor } from './use-note-editor'

const editor = useNoteEditor()
const onToggleItalic = () => editor.commands.toggleItalic()
</script>

<template>
  <button @mousedown.prevent="onToggleItalic">Toggle italic</button>
</template>
