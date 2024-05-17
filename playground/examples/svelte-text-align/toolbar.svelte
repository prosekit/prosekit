<script lang="ts">
import Toggle from './toggle.svelte'
import type { EditorExtension } from './extension'
import { useEditor } from 'prosekit/svelte'
import type { Editor } from 'prosekit/core'

const editor = useEditor<EditorExtension>({ update: true })

const isTextAlignActive = (editor: Editor<EditorExtension>, value: string) => {
  return Object.values(editor.nodes).some((node) => {
    return node.isActive({ textAlign: value })
  })
}
</script>

<div class="TOOLBAR">
  <Toggle
    pressed={isTextAlignActive($editor, 'left')}
    disabled={!$editor.commands.setTextAlign.canApply('left')}
    onClick={() => $editor.commands.setTextAlign('left')}
  >
    Left
  </Toggle>

  <Toggle
    pressed={isTextAlignActive($editor, 'center')}
    disabled={!$editor.commands.setTextAlign.canApply('center')}
    onClick={() => $editor.commands.setTextAlign('center')}
  >
    Center
  </Toggle>

  <Toggle
    pressed={isTextAlignActive($editor, 'right')}
    disabled={!$editor.commands.setTextAlign.canApply('right')}
    onClick={() => $editor.commands.setTextAlign('right')}
  >
    Right
  </Toggle>

  <Toggle
    pressed={isTextAlignActive($editor, 'justify')}
    disabled={!$editor.commands.setTextAlign.canApply('justify')}
    onClick={() => $editor.commands.setTextAlign('justify')}
  >
    Justify
  </Toggle>
</div>
