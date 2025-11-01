import { useMemo } from 'preact/hooks'
import type { Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/preact'

export function useSubmitKeymap(
  hotkey: 'Shift-Enter' | 'Enter',
  onSubmit: (hotkey: string) => void,
) {
  const keymap: Keymap = useMemo(() => {
    return {
      [hotkey]: () => {
        onSubmit(hotkey)
        return true
      },
    }
  }, [hotkey, onSubmit])

  useKeymap(keymap)
}
