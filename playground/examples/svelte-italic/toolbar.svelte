<script setup lang="ts">
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Toggle from './toggle.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="TOOLBAR">
  <Toggle
    active={$editor.marks.italic.isActive()}
    available={true}
    onChange={() => $editor.commands.toggleItalic()}
  >
    Italic
  </Toggle>
</div>
