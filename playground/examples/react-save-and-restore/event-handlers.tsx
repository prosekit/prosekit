import { defineUpdateHandler } from 'prosekit/core'
import { useExtension } from 'prosekit/react'
import { useMemo } from 'react'

export default function EventHandlers({ onUpdate }: { onUpdate: () => void }) {
  const extension = useMemo(() => {
    return defineUpdateHandler(onUpdate)
  }, [onUpdate])

  useExtension(extension)

  return null
}
