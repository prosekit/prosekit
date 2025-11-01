import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export default function Editor(): JSX.Element {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="CSS_MINIMAL_EDITOR"></div>
    </ProseKit>
  )
}
