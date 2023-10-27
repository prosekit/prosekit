import 'prosekit/core/style.css'
import 'prosekit/extensions/list/style.css'

import { createEditor, type NodeJson } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultDoc })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="EDITOR_CONTENT"></div>
    </ProseKit>
  )
}

const defaultDoc: NodeJson = {
  type: 'doc',
  content: [
    {
      type: 'list',
      attrs: { kind: 'bullet' },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Bullet List' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered' },
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Ordered List' }],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Task List ' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'toggle', collapsed: true },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Toggle List' }] },
        {
          type: 'list',
          attrs: {
            kind: 'bullet',
          },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Hidden' }] },
          ],
        },
      ],
    },
  ],
}
