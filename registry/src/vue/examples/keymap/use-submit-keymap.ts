import type { Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/vue'
import {
  computed,
  type Ref,
} from 'vue'

export function useSubmitKeymap(
  hotkey: Ref<'Shift-Enter' | 'Enter'>,
  onSubmit: (hotkey: string) => void,
) {
  const keymap = computed<Keymap>(() => {
    return {
      [hotkey.value]: () => {
        onSubmit(hotkey.value)
        return true
      },
    }
  })

  useKeymap(keymap)
}
