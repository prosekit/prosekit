import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import BlockHandle from './block-handle'
import { DEFAULT_DRAG_AND_DROP_CONTENT } from './default-content-drag-and-drop'
import DropIndicator from './drop-indicator'
import { defineExtension } from './extension'

export default function Editor() {
  const editor = createEditor({
    extension: defineExtension(),
    defaultContent: DEFAULT_DRAG_AND_DROP_CONTENT,
  })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT" />
          <BlockHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
