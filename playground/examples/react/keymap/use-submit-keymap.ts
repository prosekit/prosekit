import type { Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/react'
import { useMemo } from 'react'

export function useSubmitKeymap(
  hotkey: 'Shift-Enter' | 'Enter',
  onSubmit: (hotkey: string) => void,
) {
  const keymap: Keymap = useMemo(() => {
    return {
      [hotkey]: () => {
        onSubmit(hotkey)
        // Return true to stop further keypress propagation.
        return true
      },
    }
  }, [hotkey, onSubmit])

  useKeymap(keymap)
}
