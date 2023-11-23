<script setup lang="ts">
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Toggle from './toggle.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="TOOLBAR">
  <Toggle
    pressed={$editor.marks.italic.isActive()}
    onClick={() => $editor.commands.toggleItalic()}
  >
    Italic
  </Toggle>
</div>
