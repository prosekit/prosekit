import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/svelte'
import { derived, writable, type Readable } from 'svelte/store'

export function useSubmitKeymap(onSubmit: (hotkey: string) => void) {
  const hotkey = writable<'Shift-Enter' | 'Ctrl-Enter'>('Shift-Enter')

  const keymap: Readable<Keymap> = derived(hotkey, (hotkey) => {
    return {
      [hotkey]: () => {
        onSubmit(hotkey)
        // Returning true means that the keypress has been handled and should
        // not be propagated further.
        return true
      },
    }
  })

  useKeymap(keymap)

  return { hotkey }
}
