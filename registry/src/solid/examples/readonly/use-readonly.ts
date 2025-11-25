import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/solid'
import {
  createMemo,
  createSignal,
} from 'solid-js'

export function useReadonly() {
  const [readonly, setReadonly] = createSignal(true)

  const extension = createMemo(() => {
    return readonly() ? defineReadonly() : null
  })
  useExtension(extension)

  return { readonly, setReadonly }
}
