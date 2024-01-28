import { defineKeymap, type Keymap } from '@prosekit/core'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { useExtension, type UseExtensionOptions } from './use-extension'

export function useKeymap(
  keymap: MaybeRefOrGetter<Keymap>,
  options?: UseExtensionOptions,
) {
  const extension = computed(() => defineKeymap(toValue(keymap)))
  return useExtension(extension, options)
}
