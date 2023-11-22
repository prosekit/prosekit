<script lang="ts">
import { useKeymap } from 'prosekit/svelte'
import { jsonFromNode, type Keymap } from 'prosekit/core'
import { derived } from 'svelte/store'
import { writable } from 'svelte/store'

let submitHotkey = writable<'Shift-Enter' | 'Ctrl-Enter'>('Shift-Enter')

let keymap = derived(submitHotkey, ($submitHotkey) => {
  return {
    [$submitHotkey]: (state) => {
      const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
      window.alert(`${$submitHotkey} pressed! You document is: ${doc}`)
      return true
    },
  } satisfies Keymap
})

useKeymap(keymap)
</script>

<fieldset class="border">
  <legend>Submit Document</legend>

  <div>
    <input
      type="radio"
      id="hotkey1"
      value={'Shift-Enter'}
      bind:group={$submitHotkey}
    />
    <label for="hotkey1">
      <kbd>Shift</kbd>
      +
      <kbd>Enter</kbd>
    </label>
  </div>

  <div>
    <input
      type="radio"
      id="hotkey2"
      value={'Ctrl-Enter'}
      bind:group={$submitHotkey}
    />
    <label for="hotkey2">
      <kbd>Ctrl</kbd>
      +
      <kbd>Enter</kbd>
    </label>
  </div>
</fieldset>
