import { useMemo, useState } from 'preact/hooks'
import { jsonFromNode, type Keymap } from 'prosekit/core'
import type { Command } from 'prosekit/pm/state'
import { useKeymap } from 'prosekit/preact'

function createSubmitCommand(submitHotkey: string): Command {
  return (state) => {
    const doc = JSON.stringify(jsonFromNode(state.doc), null, 2)
    window.alert(`${submitHotkey} pressed! You document is: ${doc}`)
    // Returning true means that the keypress has been handled and should
    // not be propagated further.
    return true
  }
}

export function useSubmitKeymap() {
  const [submitHotkey, setSubmitHotkey] = useState<
    'Shift-Enter' | 'Ctrl-Enter'
  >('Shift-Enter')

  const toggleSubmitHotkey = () => {
    setSubmitHotkey((prev) =>
      prev === 'Shift-Enter' ? 'Ctrl-Enter' : 'Shift-Enter',
    )
  }

  const keymap: Keymap = useMemo(() => {
    return { [submitHotkey]: createSubmitCommand(submitHotkey) }
  }, [submitHotkey])

  useKeymap(keymap)

  return { submitHotkey, toggleSubmitHotkey }
}
