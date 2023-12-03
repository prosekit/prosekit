import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/solid'
import { createSignal } from 'solid-js'

export function useSubmitKeymap(onSubmit: (hotkey: string) => void) {
  const [hotkey, setHotkey] = createSignal<'Shift-Enter' | 'Ctrl-Enter'>(
    'Shift-Enter',
  )

  const keymap = (): Keymap => ({
    [hotkey()]: () => {
      onSubmit(hotkey())
      // Returning true means that the keypress has been handled and should
      // not be propagated further.
      return true
    },
  })

  useKeymap(keymap)

  return { hotkey, setHotkey }
}
