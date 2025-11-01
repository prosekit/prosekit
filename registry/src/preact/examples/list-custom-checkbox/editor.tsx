import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import './custom-list.css'

import { useMemo } from 'preact/hooks'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Custom list checkbox design and strikethrough for completed tasks. Please check ' },
        { type: 'text', text: 'custom-list.css', marks: [{ type: 'code' }] },
        { type: 'text', text: ' for the styles.' },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: true },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Completed Task' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Incomplete Task' }] },
      ],
    },
  ],
}

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT" data-custom-list-css-enabled>
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
