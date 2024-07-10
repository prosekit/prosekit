import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/solid'

export function useSubmitKeymap(
  hotkey: () => 'Shift-Enter' | 'Enter',
  onSubmit: (hotkey: string) => void,
) {
  const keymap = (): Keymap => ({
    [hotkey()]: () => {
      onSubmit(hotkey())
      // Return true to stop further keypress propagation.
      return true
    },
  })

  useKeymap(keymap)
}
