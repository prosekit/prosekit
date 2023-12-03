<script lang="ts">
import Toggle from './toggle.svelte'
import { useSubmitKeymap } from './use-submit-keymap'

export let onSubmit: (hotkey: string) => void

const { hotkey } = useSubmitKeymap(onSubmit)
</script>

<div class="TOOLBAR">
  <div class="TOOLBAR">
    <Toggle
      pressed={$hotkey === 'Shift-Enter'}
      onClick={() => ($hotkey = 'Shift-Enter')}
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift</kbd>
      +
      <kbd>Enter</kbd>
    </Toggle>

    <Toggle
      pressed={$hotkey === 'Ctrl-Enter'}
      onClick={() => ($hotkey = 'Ctrl-Enter')}
    >
      <span class="mr-1">Submit with</span>
      <kbd>Ctrl</kbd>
      +
      <kbd>Enter</kbd>
    </Toggle>
  </div>
</div>
