import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

export function defineExampleExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  ])
}

export type ExampleExtension = ReturnType<typeof defineExampleExtension>
