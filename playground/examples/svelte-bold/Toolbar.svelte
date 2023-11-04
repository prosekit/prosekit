<script setup lang="ts">
import { getEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = getEditor<EditorExtension>({ update: true })
</script>

<div class="TOOLBAR">
  <button
    data-state={$editor.marks.bold.isActive() ? 'on' : 'off'}
    on:click={() => $editor.commands.toggleBold()}
    on:mousedown|preventDefault
    class="TOGGLE_BUTTON"
  >
    Bold
  </button>
</div>
