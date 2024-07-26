import { Selection, type EditorStateConfig } from '@prosekit/pm/state'

import { defineFacetPayload } from '../facets/facet-extension'
import { stateFacet } from '../facets/state'
import type { PlainExtension } from '../types/extension'
import type { NodeJSON, SelectionJSON } from '../types/model'
import { getEditorContentJSON } from '../utils/editor-content'

/**
 * @public
 */
export interface DefaultStateOptions {
  /**
   * The starting document to use when creating the editor. It can be a
   * ProseMirror node JSON object, a HTML string, or a HTML element instance.
   */
  defaultContent?: NodeJSON | string | HTMLElement

  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultDoc?: NodeJSON

  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultHTML?: string | HTMLElement

  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultDoc` or `defaultHTML` is also provided.
   */
  defaultSelection?: SelectionJSON
}

/**
 * Define a default state for the editor.
 *
 * @public
 */
export function defineDefaultState(
  options: DefaultStateOptions,
): PlainExtension {
  const { defaultSelection, defaultContent, defaultDoc, defaultHTML } = options
  const defaultDocContent = defaultContent || defaultDoc || defaultHTML

  return defineFacetPayload(stateFacet, [
    ({ schema }) => {
      const config: EditorStateConfig = {}
      if (defaultDocContent) {
        const json = getEditorContentJSON(schema, defaultDocContent)
        config.doc = schema.nodeFromJSON(json)
        if (defaultSelection) {
          config.selection = Selection.fromJSON(config.doc, defaultSelection)
        }
      }
      return config
    },
  ]) as PlainExtension
}
