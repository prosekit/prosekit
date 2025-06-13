import './custom-list.css'

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
      { class: 'inline-flex items-center box-border relative' },
      [
        'label',
        {
          class: 'flex items-center cursor-pointer relative box-border -bottom-0.5 hover:scale-110 transition',
        },
        [
          'input',
          {
            type: 'checkbox',
            checked: checked ? '' : undefined,
            class:
              'size-5 cursor-pointer transition-all appearance-none rounded-md shadow-sm hover:shadow-md border border-solid border-gray-300  dark:border-gray-600 checked:bg-red-500 checked:border-red-500 box-border m-0',
          },
        ],
        [
          'span',
          {
            'data-checked': checked ? 'true' : 'false',
            'class': 'absolute text-white opacity-0 data-[checked=true]:opacity-100',
          },
          ['div', { class: 'i-lucide-check size-5' }],
        ],
      ],
    ],
  ]
}
