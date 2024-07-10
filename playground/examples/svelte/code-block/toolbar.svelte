<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import Button from './button.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class={Themes.TOOLBAR}>
  <Button
    pressed={$editor.nodes.codeBlock.isActive()}
    disabled={!$editor.commands.setCodeBlock.canApply()}
    onClick={() => $editor.commands.setCodeBlock()}
    tooltip="Heading 1"
  >
    <div class={Themes.ICON_CODE_BLOCK} />
  </Button>
</div>
