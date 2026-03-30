import { Selection, type EditorStateConfig } from '@prosekit/pm/state'

import { defineFacetPayload } from '../facets/facet-extension.ts'
import { stateFacet } from '../facets/state.ts'
import type { PlainExtension } from '../types/extension.ts'
import type { NodeJSON, SelectionJSON } from '../types/model.ts'
import { getEditorContentJSON } from '../utils/editor-content.ts'

/**
 * @public
 */
export interface DefaultStateOptions {
  /**
   * The starting document to use when creating the editor. It can be a
   * ProseMirror node JSON object, an HTML string, or a DOM element instance.
   */
  defaultContent?: NodeJSON | string | Element

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultContent` is also provided.
   */
  defaultSelection?: SelectionJSON
}

/**
 * Define a default state for the editor.
 *
 * @param options
 *
 * @public
 */
export function defineDefaultState({
  defaultSelection,
  defaultContent,
}: DefaultStateOptions): PlainExtension {
  return defineFacetPayload(stateFacet, [
    ({ schema }) => {
      const config: EditorStateConfig = {}
      if (defaultContent) {
        const json = getEditorContentJSON(schema, defaultContent)
        config.doc = schema.nodeFromJSON(json)
        if (defaultSelection) {
          config.selection = Selection.fromJSON(config.doc, defaultSelection)
        }
      }
      return config
    },
  ]) as PlainExtension
}
