import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  union,
} from 'prosekit/core'
import {
  defineCommitViewer,
  type Commit,
} from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function DiffViewer({ commit }: { commit: Commit }) {
  const editor = useMemo(() => {
    const extension = union(
      defineBasicExtension(),
      defineReadonly(),
      defineCommitViewer(commit),
    )
    return createEditor({ extension })
  }, [commit])

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
