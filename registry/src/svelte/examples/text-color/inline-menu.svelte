<script lang="ts">
import type { Editor } from 'prosekit/core'
import {
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
  { label: 'red', value: '#ef4444' },
  { label: 'orange', value: '#f97316' },
  { label: 'yellow', value: '#eab308' },
  { label: 'green', value: '#22c55e' },
  { label: 'blue', value: '#3b82f6' },
  { label: 'indigo', value: '#6366f1' },
  { label: 'violet', value: '#a855f7' },
]

function getColorState(editor: Editor<EditorExtension>) {
  return [{
    label: 'default',
    value: 'unset',
    isActive: !editor.marks.textColor.isActive(),
    onClick: () => editor.commands.removeTextColor(),
  }].concat(colors.map((color) => ({
    label: color.label,
    value: color.value,
    isActive: editor.marks.textColor.isActive({ color: color.value }),
    onClick: () => editor.commands.addTextColor({ color: color.value }),
  })))
}

const colorState = useEditorDerivedValue(getColorState)

let open = $state(false)

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
  onOpenChange={(value) => open = value}
>
  {#each $colorState as color (color.label)}
    <Button
      pressed={color.isActive}
      tooltip={color.label}
      onClick={color.onClick}
    >
      <span style:color={color.value}>A</span>
    </Button>
  {/each}
</InlinePopover>
