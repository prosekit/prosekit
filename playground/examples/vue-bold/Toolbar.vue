<script setup lang="ts">
import { useTypedEditorRef } from './use-typed-editor'

const editor = useTypedEditorRef()
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.bold.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleBold()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      Bold
    </button>
  </div>
</template>
