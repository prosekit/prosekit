'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import './style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { defineExtension } from './extension.ts'

const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Select the first paragraph below, then blur the editor.' }],
    },
    {
      type: 'nestedEditable',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Selected text inside the nested editable NodeView.' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Click this target paragraph after blurring.' }],
        },
      ],
    },
  ],
}

export default function Editor() {
  const [legacy, setLegacy] = useState(false)
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(legacy), defaultContent })
  }, [legacy])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <p>
          {legacy
            ? 'Legacy mode removes the decoration only on focus. Its failure is browser and DOM-shape dependent.'
            : 'Fixed mode removes the decoration on pointerdown before focus.'}
        </p>
        <button onClick={() => setLegacy(value => !value)} type="button">
          Switch to {legacy ? 'fixed' : 'legacy'} mode
        </button>
        <p>Select the first nested paragraph, click “Blur editor”, then click the target paragraph once.</p>
        <button data-testid="blur-editor" type="button">Blur editor</button>
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
