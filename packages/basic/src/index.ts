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
import { addBold } from '@prosekit/extensions/bold'
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
    addBaseKeymap(),
    addBaseCommands(),
    addItalic(),
    addBold(),
    withPriority(addParagraph(), Priority.high),
  ])
}

export type BasicExtension = ReturnType<typeof addBasicExtension>
