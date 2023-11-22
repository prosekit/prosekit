import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/solid'
import { createEffect, createSignal } from 'solid-js'

export function useReadonly() {
  const [getReadonly, setReadonly] = createSignal(false)
  const toggleReadonly = () => setReadonly((readonly) => !readonly)

  createEffect(() => {
    const readonly = getReadonly()
    const extension = readonly ? defineReadonly() : null
    useExtension(extension)
  })

  return { getReadonly, toggleReadonly }
}
