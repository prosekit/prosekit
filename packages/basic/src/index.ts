import {
  addBaseKeymap,
  addBaseCommands,
  addDoc,
  addParagraph,
  addText,
  defineExtension,
  Priority,
  withPriority,
} from '@prosekit/core'
import { addCodeBlock } from '@prosekit/extensions/code-block'
import { addHeading } from '@prosekit/extensions/heading'
import { addItalic } from '@prosekit/extensions/italic'
import { addList } from '@prosekit/extensions/list'

/** @public */
export function addBasicExtension() {
  return defineExtension([
    addDoc(),
    addText(),
    addHeading(),
    addList(),
    addCodeBlock(),
    addBaseKeymap(),
    addBaseCommands(),
    addItalic(),
    withPriority(addParagraph(), Priority.high),
  ])
}

export type BasicExtension = ReturnType<typeof addBasicExtension>
