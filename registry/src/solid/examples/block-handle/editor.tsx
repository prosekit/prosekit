import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { sampleContent } from '../../sample/sample-doc-block-handle'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'

import { defineExtension } from './extension'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps): JSX.Element {
  const extension = defineExtension()
  const defaultContent = props.initialContent ?? sampleContent
  const editor = createEditor({ extension, defaultContent })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
          <BlockHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
