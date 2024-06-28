import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineCommitRecorder, type CommitRecorder } from './commit'

export default function Editor({
  commitRecorder,
}: {
  commitRecorder: CommitRecorder
}) {
  const editor = useMemo(() => {
    const extension = union([
      defineBasicExtension(),
      defineCommitRecorder(commitRecorder),
    ])
    return createEditor({ extension })
  }, [commitRecorder])

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
