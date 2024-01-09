import { defineDocChangeHandler } from 'prosekit/core'
import { useExtension } from 'prosekit/react'
import { useMemo } from 'react'

export default function EventHandlers({
  onDocChange,
}: {
  onDocChange: () => void
}) {
  const extension = useMemo(() => {
    return defineDocChangeHandler(onDocChange)
  }, [onDocChange])

  useExtension(extension)

  return null
}
