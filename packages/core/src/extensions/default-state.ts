import { Selection, type EditorStateConfig } from '@prosekit/pm/state'

import { ProseKitError } from '../error'
import { stateFacet } from '../facets/state'
import type { Extension } from '../types/extension'
import type { NodeJson, SelectionJson } from '../types/model'
import { jsonFromElement, jsonFromHTML } from '../utils/parse'

export interface DefaultStateOptions {
  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   */
  defaultDoc?: NodeJson

  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   */
  defaultHTML?: string | HTMLElement

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.
   */
  defaultSelection?: SelectionJson
}

export function defineDefaultState({
  defaultDoc,
  defaultHTML,
  defaultSelection,
}: DefaultStateOptions): Extension {
  if (defaultHTML && defaultDoc) {
    throw new ProseKitError(
      'Only one of defaultHTML and defaultDoc can be provided',
    )
  }

  return stateFacet.extension([
    ({ schema }) => {
      const config: EditorStateConfig = {}

      if (defaultHTML) {
        if (typeof defaultHTML === 'string') {
          defaultDoc = jsonFromHTML(defaultHTML, schema)
        } else {
          defaultDoc = jsonFromElement(defaultHTML, schema)
        }
      }

      if (defaultDoc) {
        config.doc = schema.nodeFromJSON(defaultDoc)

        if (defaultSelection) {
          config.selection = Selection.fromJSON(config.doc, defaultSelection)
        }
      }

      return config
    },
  ])
}
