import { useState, useMemo } from 'preact/hooks'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/preact'

export function useReadonly() {
  const [readonly, setReadonly] = useState(false)
  const toggleReadonly = () => setReadonly((readonly) => !readonly)

  const extension = useMemo(() => {
    return readonly ? defineReadonly() : null
  }, [readonly])
  useExtension(extension)

  return { readonly, toggleReadonly }
}
