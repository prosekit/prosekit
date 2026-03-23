<script lang="ts">
import { useKeymap } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

import { Button } from '../../ui/button'

interface Props {
  onSubmit: (hotkey: string) => void
}

const props: Props = $props()

let hotkey = $state<'Shift-Enter' | 'Enter'>('Shift-Enter')

const keymap = $derived({
  [hotkey]: () => {
    props.onSubmit(hotkey)
    return true
  },
})

useKeymap(toStore(() => keymap))

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
