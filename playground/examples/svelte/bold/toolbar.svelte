<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class={Themes.TOOLBAR}>
  <Button
    pressed={$editor.marks.bold.isActive()}
    onClick={() => $editor.commands.toggleBold()}
    tooltip="Bold"
  >
    Bold
  </Button>
</div>
