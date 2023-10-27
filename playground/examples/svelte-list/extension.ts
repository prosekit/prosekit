import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineList } from 'prosekit/extensions/list'

export function defineExampleExtension() {
  return union([
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineList(),
  ])
}

export type ExampleExtension = ReturnType<typeof defineExampleExtension>
