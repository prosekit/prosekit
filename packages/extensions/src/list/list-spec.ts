import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { DOMOutputSpec, ProseMirrorNode } from '@prosekit/pm/model'
import { createListSpec, listToDOM, type ListAttributes } from 'prosemirror-flat-list'

import type { ListAttrs } from './list-types'

/**
 * @internal
 */
export type ListSpecExtension = Extension<{
  Nodes: {
    list: ListAttrs
  }
}>

function getMarkers(node: ProseMirrorNode): DOMOutputSpec[] {
  const attrs = node.attrs as ListAttributes
  switch (attrs.kind) {
    case 'task':
      // Use a `label` element here so that the area around the checkbox is also checkable.
      return [
        [
          'label',
          [
            'input',
            { type: 'checkbox', checked: attrs.checked ? '' : undefined },
          ],
        ],
      ]
    default:
      // Always return an empty array so that the marker element is rendered. This
      // is required to make the drop indicator locate the correct position.
      return []
  }
}

/**
 * @internal
 */
export function defineListSpec(): ListSpecExtension {
  const spec = createListSpec()

  return defineNodeSpec<'list', ListAttrs>({
    ...spec,
    toDOM: (node) => {
      return listToDOM({ node, getMarkers })
    },
    name: 'list',
  })
}
