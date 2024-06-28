import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineCommitViewer, type Commit } from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'


export default function DiffViewer({ commit }: { commit: Commit }) {
  const editor = useMemo(() => {
    const extension = union([
      defineBasicExtension(),
      defineReadonly(),
      defineCommitViewer(commit),
    ])
    return createEditor({ extension })
  }, [])

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
