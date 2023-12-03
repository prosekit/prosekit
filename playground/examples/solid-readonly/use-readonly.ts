import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/solid'
import { createSignal } from 'solid-js'

export function useReadonly() {
  const [getReadonly, setReadonly] = createSignal(false)
  const toggleReadonly = () => setReadonly((readonly) => !readonly)
  const getExtension = () => (getReadonly() ? defineReadonly() : null)

  useExtension(getExtension)

  return { getReadonly, toggleReadonly }
}
