import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { DEFAULT_DRAG_AND_DROP_CONTENT } from '../../sample/default-content-drag-and-drop'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent: DEFAULT_DRAG_AND_DROP_CONTENT })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <BlockHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
