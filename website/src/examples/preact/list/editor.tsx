import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

const defaultContent: NodeJSON = {
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
