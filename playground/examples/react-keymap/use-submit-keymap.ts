import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/react'
import { useMemo, useState } from 'react'

export function useSubmitKeymap(onSubmit: (hotkey: string) => void) {
  const [hotkey, setHotkey] = useState<'Shift-Enter' | 'Enter'>('Shift-Enter')

  const keymap: Keymap = useMemo(() => {
    return {
      [hotkey]: () => {
        onSubmit(hotkey)
        // Returning true means that the keypress has been handled and should
        // not be propagated further.
        return true
      },
    }
  }, [hotkey, onSubmit])

  useKeymap(keymap)

  return { hotkey, setHotkey }
}
