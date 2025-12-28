<script lang="ts">
import type { Editor } from 'prosekit/core'
import {
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/svelte'
import { InlinePopover } from 'prosekit/svelte/inline-popover'
import {
  derived,
  writable,
} from 'svelte/store'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const colors = [
  { name: 'default', value: '' },
  { name: 'red', value: '#ef4444' },
  { name: 'orange', value: '#f97316' },
  { name: 'yellow', value: '#eab308' },
  { name: 'green', value: '#22c55e' },
  { name: 'blue', value: '#3b82f6' },
  { name: 'indigo', value: '#6366f1' },
  { name: 'violet', value: '#a855f7' },
]

function hasTextColor(editor: Editor<EditorExtension>, color: string) {
  return editor.marks.textColor.isActive({ color })
}

function getColorState(editor: Editor<EditorExtension>) {
  return colors.map((color) => ({
    name: color.name,
    value: color.value,
    isActive: hasTextColor(editor, color.value),
  }))
}

const editor = useEditor<EditorExtension>()
const colorState = useEditorDerivedValue(getColorState)

let open = $state(false)

function toggleTextColor(color: string) {
  if (!color || hasTextColor($editor, color)) {
    $editor.commands.removeTextColor()
  } else {
    $editor.commands.addTextColor({ color })
  }
}

function handleOpenChange(value: boolean) {
  open = value
}

// Create a store from the reactive open value
const openStore = writable(false)

// Update store when open changes
$effect(() => {
  openStore.set(open)
})

// Create keymap derived from the open store
const keymap = derived(openStore, ($open) => ({
  Escape: () => {
    if ($open) {
      open = false
      return true
    }
    return false
  },
}))

useKeymap(keymap)
</script>

<InlinePopover
  class="CSS_INLINE_MENU_MAIN"
  {open}
  onOpenChange={handleOpenChange}
>
  {#each $colorState as color (color.name)}
    <Button
      pressed={color.isActive}
      tooltip={color.name}
      onClick={() => toggleTextColor(color.value)}
    >
      <span style:color={color.value}>A</span>
    </Button>
  {/each}
</InlinePopover>
