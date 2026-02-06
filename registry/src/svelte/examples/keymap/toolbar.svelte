<script lang="ts">
import { useKeymap } from 'prosekit/svelte'
import { derived, writable } from 'svelte/store'

import { Button } from '../../ui/button'

interface Props {
  onSubmit: (hotkey: string) => void
}

const props: Props = $props()

let hotkey = $state<'Shift-Enter' | 'Enter'>('Shift-Enter')

// Create a store from the reactive hotkey value
const hotkeyStore = writable<'Shift-Enter' | 'Enter'>('Shift-Enter')

// Update store when hotkey changes
$effect(() => {
  hotkeyStore.set(hotkey)
})

// Create keymap derived from the hotkey store
const keymap = derived(hotkeyStore, ($hotkey) => ({
  [$hotkey]: () => {
    props.onSubmit($hotkey)
    return true
  },
}))

useKeymap(keymap)

function setHotkey(value: 'Shift-Enter' | 'Enter') {
  hotkey = value
}
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={hotkey === 'Shift-Enter'}
    onClick={() => setHotkey('Shift-Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Shift + Enter</kbd>
  </Button>

  <Button
    pressed={hotkey === 'Enter'}
    onClick={() => setHotkey('Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Enter</kbd>
  </Button>
</div>
