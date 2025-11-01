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

export default function EditorMain(props: {
  commitRecorder: CommitRecorder
  defaultContent?: NodeJSON
}) {
  const editor = useMemo(() => {
    const extension = union(
      defineBasicExtension(),
      defineCommitRecorder(props.commitRecorder),
    )
    return createEditor({ extension, defaultContent: props.defaultContent })
  }, [props.commitRecorder, props.defaultContent])

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
