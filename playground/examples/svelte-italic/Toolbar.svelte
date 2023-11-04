<script setup lang="ts">
import { getEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = getEditor<EditorExtension>({ update: true })
</script>

<div class="TOOLBAR">
  <button
    data-state={$editor.marks.italic.isActive() ? 'on' : 'off'}
    on:click={() => $editor.commands.toggleItalic()}
    on:mousedown|preventDefault
    class="TOGGLE_BUTTON"
  >
    Italic
  </button>
</div>
