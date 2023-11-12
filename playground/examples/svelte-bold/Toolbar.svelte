<script setup lang="ts">
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
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
