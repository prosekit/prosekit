import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/svelte'
import { derived, type Readable } from 'svelte/store'

export function useSubmitKeymap(
  hotkey: Readable<'Shift-Enter' | 'Enter'>,
  onSubmit: (hotkey: string) => void,
) {
  const keymap: Readable<Keymap> = derived(hotkey, (hotkey) => {
    return {
      [hotkey]: () => {
        onSubmit(hotkey)
        // Return true to stop further keypress propagation.
        return true
      },
    }
  })

  useKeymap(keymap)
}
