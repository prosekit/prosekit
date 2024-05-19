<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Toggle from './toggle.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class={Themes.TOOLBAR}>
  <Toggle
    pressed={$editor.marks.bold.isActive()}
    onClick={() => $editor.commands.toggleBold()}
  >
    Bold
  </Toggle>
</div>
