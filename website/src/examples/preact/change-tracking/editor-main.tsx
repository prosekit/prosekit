import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  union,
  type NodeJSON,
} from 'prosekit/core'
import {
  defineCommitRecorder,
  type CommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/preact'

export default function Editor({
  commitRecorder,
  defaultContent,
}: {
  commitRecorder: CommitRecorder
  defaultContent?: NodeJSON
}) {
  const editor = useMemo(() => {
    const extension = union(
      defineBasicExtension(),
      defineCommitRecorder(commitRecorder),
    )
    return createEditor({ extension, defaultContent })
  }, [commitRecorder, defaultContent])

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
