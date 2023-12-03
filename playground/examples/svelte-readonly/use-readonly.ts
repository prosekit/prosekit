import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/svelte'
import { derived, writable } from 'svelte/store'

export function useReadonly() {
  const readonly = writable(true)

  const extension = derived(readonly, ($readonly) =>
    $readonly ? defineReadonly() : null,
  )
  useExtension(extension)

  return { readonly }
}
