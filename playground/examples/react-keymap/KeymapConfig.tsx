import { jsonFromNode, type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/react'
import { useMemo, useState } from 'react'

export function KeymapConfig() {
  const [submitHotkey, setSubmitHotkey] = useState<
    'Shift-Enter' | 'Ctrl-Enter'
  >('Shift-Enter')

  const keymap: Keymap = useMemo((): Keymap => {
    return {
      [submitHotkey]: (state) => {
        const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
        window.alert(`${submitHotkey} pressed! You document is: ${doc}`)
        // Returning true means that the keypress has been handled and should
        // not be propagated further.
        return true
      },
    }
  }, [submitHotkey])

  useKeymap(keymap)

  return (
    <fieldset className="border">
      <legend>Submit Document</legend>

      <div>
        <input
          type="radio"
          id="hotkey1"
          value="hotkey1"
          checked={submitHotkey === 'Shift-Enter'}
          onChange={() => setSubmitHotkey('Shift-Enter')}
        />
        <label htmlFor="hotkey1">
          <kbd>Shift</kbd> + <kbd>Enter</kbd>
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="hotkey2"
          value="hotkey2"
          checked={submitHotkey === 'Ctrl-Enter'}
          onChange={() => setSubmitHotkey('Ctrl-Enter')}
        />
        <label htmlFor="hotkey2">
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
        </label>
      </div>
    </fieldset>
  )
}
