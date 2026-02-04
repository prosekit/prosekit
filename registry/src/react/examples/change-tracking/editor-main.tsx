import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import { defineCommitRecorder, type CommitRecorder } from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function EditorMain(props: {
  commitRecorder: CommitRecorder
  initialContent?: NodeJSON
}) {
  const editor = useMemo(() => {
    const extension = union(
      defineBasicExtension(),
      defineCommitRecorder(props.commitRecorder),
    )
    return createEditor({ extension, defaultContent: props.initialContent })
  }, [props.commitRecorder, props.initialContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
