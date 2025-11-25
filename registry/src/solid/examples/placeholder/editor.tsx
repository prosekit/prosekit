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
import type { JSX } from 'solid-js'

import { defineExtension } from './extension'

export default function Editor(props: {
  initialContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}): JSX.Element {
  const extension = defineExtension()
  const editor = createEditor({ extension, defaultContent: props.initialContent })

  const handleDocChange = (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc))
  useDocChange(handleDocChange, { editor })

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
