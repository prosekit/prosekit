import type { Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/solid'
import type { Accessor } from 'solid-js'

export function useSubmitKeymap(
  hotkey: Accessor<'Shift-Enter' | 'Enter'>,
  onSubmit: (hotkey: string) => void,
): void {
  const keymap = () => {
    const currentHotkey = hotkey()
    return {
      [currentHotkey]: () => {
        onSubmit(currentHotkey)
        return true
      },
    } satisfies Keymap
  }

  useKeymap(keymap)
}
