import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import { defineCommitRecorder, type CommitRecorder } from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export default function EditorMain(props: {
  commitRecorder: CommitRecorder
  initialContent?: NodeJSON
}): JSX.Element {
  const extension = union(
    defineBasicExtension(),
    defineCommitRecorder(props.commitRecorder),
  )
  const editor = createEditor({ extension, defaultContent: props.initialContent })

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
