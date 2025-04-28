<script lang="ts">
import { writable } from 'svelte/store'
import Button from './button.svelte'
import { useSubmitKeymap } from './use-submit-keymap'

export let onSubmit: (hotkey: string) => void

const hotkey = writable<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, onSubmit)
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$hotkey === 'Shift-Enter'}
    onClick={() => ($hotkey = 'Shift-Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Shift + Enter</kbd>
  </Button>

  <Button pressed={$hotkey === 'Enter'} onClick={() => ($hotkey = 'Enter')}>
    <span class="mr-1">Submit with</span>
    <kbd>Enter</kbd>
  </Button>
</div>
