import {
  Priority,
  addBaseCommands,
  addBaseKeymap,
  addDoc,
  addHistory,
  addParagraph,
  addText,
  defineExtension,
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
    addHistory(),
    addList(),
    addBaseKeymap(),
    addBaseCommands(),
    addItalic(),
    addBold(),
    withPriority(addParagraph(), Priority.high),
  ])
}

export type BasicExtension = ReturnType<typeof addBasicExtension>
