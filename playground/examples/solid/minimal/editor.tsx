import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/solid'

export default function Editor(props: {
  defaultContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}) {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension, defaultContent: props.defaultContent })

  useDocChange((doc) => props.onDocUpdate?.(jsonFromNode(doc)), { editor })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.EDITOR_VIEWPORT}>
        <div class={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} class={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
