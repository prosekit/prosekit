import { useMemo } from 'preact/hooks'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/preact'

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
