<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from '../../../shared/svelte/button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'bullet' })}
    onClick={() => $editor.commands.toggleList({ kind: 'bullet' })}
    tooltip="Bullet"
  >
    <div class="CSS_ICON_LIST_BULLET"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'ordered' })}
    onClick={() => $editor.commands.toggleList({ kind: 'ordered' })}
    tooltip="Ordered"
  >
    <div class="CSS_ICON_LIST_ORDERED"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'task' })}
    onClick={() => $editor.commands.toggleList({ kind: 'task' })}
    tooltip="Task"
  >
    <div class="CSS_ICON_LIST_TASK"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'toggle' })}
    onClick={() => $editor.commands.toggleList({ kind: 'toggle' })}
    tooltip="Toggle"
  >
    <div class="CSS_ICON_LIST_TOGGLE"></div>
  </Button>
</div>
