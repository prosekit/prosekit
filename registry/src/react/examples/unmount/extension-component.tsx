import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/react'
import { useMemo } from 'react'

export default function ExtensionComponent(props: {
  placeholder: string
}) {
  const extension = useMemo(
    () => definePlaceholder({ placeholder: props.placeholder }),
    [props.placeholder],
  )

  useExtension(extension)

  return null
}
