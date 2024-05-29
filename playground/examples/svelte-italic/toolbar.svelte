<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Button from './button.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class={Themes.TOOLBAR}>
  <Button
    pressed={$editor.marks.italic.isActive()}
    onClick={() => $editor.commands.toggleItalic()}
  >
    Italic
  </Button>
</div>
