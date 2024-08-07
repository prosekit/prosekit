import { Priority, union, withPriority } from '@prosekit/core'
import { Awareness } from 'y-protocols/awareness'
import * as Y from 'yjs'

import { defineYjsCommands } from './commands'
import { defineYjsCursorPlugin, type YjsCursorOptions } from './cursor-plugin'
import { defineYjsKeymap } from './keymap'
import { type YjsSyncOptions, defineYjsSyncPlugin } from './sync-plugin'
import { defineYjsUndoPlugin, type YjsUndoOptions } from './undo-plugin'

export interface YjsOptions {
  fragment?: Y.XmlFragment | string

  ySyncOptions?: YjsSyncOptions

  yUndoOptions?: YjsUndoOptions

  yCursorOptions?: YjsCursorOptions
}

/**
 * @public
 */
function defineYjs(doc: Y.Doc, awareness: Awareness, options?: YjsOptions) {
  const { fragment, ySyncOptions, yUndoOptions, yCursorOptions } = options ?? {}

  const concreteFragment =
    fragment == null
      ? doc.getXmlFragment('prosemirror')
      : typeof fragment === 'string'
        ? doc.getXmlFragment(fragment)
        : fragment

  return withPriority(
    union([
      defineYjsKeymap(),
      defineYjsCommands(),
      defineYjsCursorPlugin(awareness, yCursorOptions),
      defineYjsUndoPlugin(yUndoOptions),
      defineYjsSyncPlugin({ ...ySyncOptions, fragment: concreteFragment }),
    ]),
    Priority.high,
  )
}

export {
  defineYjs,
  defineYjsKeymap,
  defineYjsCommands,
  defineYjsCursorPlugin,
  defineYjsUndoPlugin,
  defineYjsSyncPlugin,
}
