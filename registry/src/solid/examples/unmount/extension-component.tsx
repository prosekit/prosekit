import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/solid'
import { createMemo, type JSX } from 'solid-js'

export default function ExtensionComponent(props: {
  placeholder: string
}): JSX.Element {
  const extension = createMemo(() => {
    return definePlaceholder({ placeholder: props.placeholder })
  })

  useExtension(extension)

  return null
}
