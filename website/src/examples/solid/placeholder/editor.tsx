import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/solid'

import { defineExtension } from './extension'

export default function Editor(props: {
  defaultContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}) {
  const editor = createEditor({ extension: defineExtension(), defaultContent: props.defaultContent })

  useDocChange((doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
