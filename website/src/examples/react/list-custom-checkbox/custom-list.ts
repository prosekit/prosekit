import { defineNodeSpec } from 'prosekit/core'
import type {
  DOMOutputSpec,
  ProseMirrorNode,
} from 'prosekit/pm/model'
import { listToDOM } from 'prosemirror-flat-list'
import type { ListAttributes } from 'prosemirror-flat-list'

export function defineCustomList() {
  return defineNodeSpec({
    name: 'list',
    toDOM: (node) => {
      const { kind } = node.attrs as ListAttributes
      if (kind === 'task') {
        return listToDOM({ node, getMarkers: getTaskMarkers })
      } else {
        return listToDOM({ node })
      }
    },
  })
}

export function getTaskMarkers(node: ProseMirrorNode): DOMOutputSpec[] {
  const { checked } = node.attrs as ListAttributes
  return [
    [
      'div',
      { class: 'inline-flex items-center mr-3 box-border relative' },
      [
        'label',
        {
          class: 'flex items-center cursor-pointer relative box-border -left-1',
        },
        [
          'input',
          {
            type: 'checkbox',
            checked: checked ? '' : undefined,
            class: 'size-4.5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-600 checked:border-red-600 box-border',
          },
        ],
        [
          'span',
          {
            'data-checked': checked ? 'true' : 'false',
            'class': 'absolute text-white opacity-0 data-[checked=true]:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          },
          ['div', { class: 'i-lucide-check size-4.5 text-white' }],
        ],
      ],
    ],
  ]
}
