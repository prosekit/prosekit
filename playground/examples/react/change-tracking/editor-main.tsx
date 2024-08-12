import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import {
  type CommitRecorder,
  defineCommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

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
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
