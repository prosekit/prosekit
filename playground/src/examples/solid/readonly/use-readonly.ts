import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/solid'
import { createSignal } from 'solid-js'

export function useReadonly() {
  const [getReadonly, setReadonly] = createSignal(true)
  const getExtension = () => (getReadonly() ? defineReadonly() : null)

  useExtension(getExtension)

  return { getReadonly, setReadonly }
}
