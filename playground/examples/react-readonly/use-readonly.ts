import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/react'
import { useState, useMemo } from 'react'

export function useReadonly() {
  const [readonly, setReadonly] = useState(false)

  const extension = useMemo(() => {
    return readonly ? defineReadonly() : null
  }, [readonly])
  useExtension(extension)

  return { readonly, setReadonly }
}
