import { Selection, type EditorStateConfig } from '@prosekit/pm/state'

import { stateSlot } from '../editor/slots'
import type { Extension } from '../types/extension'
import type { NodeJson, SelectionJson } from '../types/model'

export interface DefaultStateOptions {
  /**
   * A JSON representation of a ProseMirror document.
   */
  doc?: NodeJson
  /**
   * A JSON representation of a ProseMirror selection.
   */
  selection?: SelectionJson
}

export function defineDefaultState(options: DefaultStateOptions): Extension {
  return stateSlot.extension([
    ({ schema }) => {
      const config: EditorStateConfig = {}

      if (options.doc) {
        config.doc = schema.nodeFromJSON(options.doc)

        if (options.selection) {
          config.selection = Selection.fromJSON(config.doc, options.selection)
        }
      }

      return config
    },
  ])
}
