import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { defaultContent } from '../../sample/sample-doc-block-handle'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'

import { defineExtension } from './extension'

export default function Editor(): JSX.Element {
  const extension = defineExtension()
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
