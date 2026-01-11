import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { sampleUploader } from '../../sample/sample-uploader'
import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

export default function Editor(): JSX.Element {
  const extension = defineExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar uploader={sampleUploader} />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
