import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { sampleContent } from '../../sample/sample-doc-block-handle.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'
import { defineExtension } from '../block-handle/extension.ts'

import BlockSideMenu from './block-side-menu.tsx'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps): JSX.Element {
  const defaultContent = props.initialContent ?? sampleContent
  const extension = defineExtension()
  const editor = createEditor({ extension, defaultContent })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
          <BlockSideMenu />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
