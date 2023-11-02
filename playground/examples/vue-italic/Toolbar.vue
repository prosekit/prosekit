<script setup lang="ts">
import { useTypedEditorRef } from './use-typed-editor'

const editor = useTypedEditorRef()
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.italic.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleItalic()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      I
    </button>
  </div>
</template>
