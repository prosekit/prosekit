import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/react'
import { useMemo } from 'react'

export default function ExtensionComponent({
  placeholder,
}: {
  placeholder: string
}) {
  const extension = useMemo(
    () => definePlaceholder({ placeholder }),
    [placeholder],
  )

  useExtension(extension)

  return null
}
