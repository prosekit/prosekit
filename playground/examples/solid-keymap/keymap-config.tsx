import { jsonFromNode, type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/solid'
import { createSignal, createEffect } from 'solid-js'

export default function KeymapConfig() {
  const [getSubmitHotkey, setSubmitHotkey] = createSignal<
    'Shift-Enter' | 'Ctrl-Enter'
  >('Shift-Enter')

  createEffect(() => {
    const submitHotkey = getSubmitHotkey()

    const keymap: Keymap = {
      [submitHotkey]: (state) => {
        const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
        window.alert(`${submitHotkey} pressed! You document is: ${doc}`)
        // Returning true means that the keypress has been handled and should
        // not be propagated further.
        return true
      },
    }

    useKeymap(keymap)
  })

  return (
    <fieldset class="border">
      <legend>Submit Document</legend>

      <div>
        <input
          type="radio"
          id="hotkey1"
          value="hotkey1"
          checked={getSubmitHotkey() === 'Shift-Enter'}
          onChange={() => setSubmitHotkey('Shift-Enter')}
        />
        <label for="hotkey1">
          <kbd>Shift</kbd> + <kbd>Enter</kbd>
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="hotkey2"
          value="hotkey2"
          checked={getSubmitHotkey() === 'Ctrl-Enter'}
          onChange={() => setSubmitHotkey('Ctrl-Enter')}
        />
        <label for="hotkey2">
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
        </label>
      </div>
    </fieldset>
  )
}
