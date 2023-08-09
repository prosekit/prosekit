<script setup lang="ts">
import { useExampleEditor } from './use-example-editor'

const editor = useExampleEditor()
const onToggleItalic = () => editor.commands.toggleItalic()
</script>

<template>
  <button @mousedown.prevent="onToggleItalic">Toggle italic</button>
</template>
