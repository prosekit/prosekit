import type { Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/vue'
import { computed, type Ref } from 'vue'

export function useSubmitKeymap(
  hotkey: Ref<'Shift-Enter' | 'Enter'>,
  onSubmit: (hotkey: string) => void,
) {
  const keymap: Ref<Keymap> = computed(() => {
    return {
      [hotkey.value]: () => {
        onSubmit(hotkey.value)
        // Return true to stop further keypress propagation.
        return true
      },
    }
  })

  useKeymap(keymap)
}
