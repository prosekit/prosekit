import { ref, computed, type Ref } from 'vue'
import { type Keymap } from 'prosekit/core'
import { useKeymap } from 'prosekit/vue'

export function useSubmitKeymap(onSubmit: (hotkey: string) => void) {
  const hotkey = ref<'Shift-Enter' | 'Ctrl-Enter'>('Shift-Enter')
  
  const keymap: Ref<Keymap> = computed(() => {
    return {
      [hotkey.value]: () => {
        onSubmit(hotkey.value)
        // Returning true means that the keypress has been handled and should
        // not be propagated further.
        return true
      },
    }
  })
  
  useKeymap(keymap)
  
  return { hotkey }
}
