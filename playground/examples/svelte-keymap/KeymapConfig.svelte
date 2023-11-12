<script lang="ts">
import { useKeymap } from 'prosekit/svelte'
import { jsonFromNode, type Keymap } from 'prosekit/core'
import { onDestroy } from 'svelte'

let submitHotkey: 'Shift-Enter' | 'Ctrl-Enter' = 'Shift-Enter'

let cleanup: VoidFunction | null = null

$: {
  let keymap: Keymap = {
    [submitHotkey]: (state) => {
      const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
      window.alert(`${submitHotkey} pressed! You document is: ${doc}`)
      return true
    },
  }

  cleanup?.()
  cleanup = useKeymap(keymap)
}

onDestroy(() => {
  cleanup?.()
  cleanup = null
})
</script>

<fieldset class="border">
  <legend>Submit Document</legend>

  <div>
    <input
      type="radio"
      id="hotkey1"
      value={'Shift-Enter'}
      bind:group={submitHotkey}
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
      bind:group={submitHotkey}
    />
    <label for="hotkey2">
      <kbd>Ctrl</kbd>
      +
      <kbd>Enter</kbd>
    </label>
  </div>
</fieldset>
