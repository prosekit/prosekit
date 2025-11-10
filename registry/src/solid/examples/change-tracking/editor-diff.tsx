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
import { ProseKit } from 'prosekit/solid'
import type { JSX } from 'solid-js'

export default function EditorDiff(props: { commit: Commit }): JSX.Element {
  const extension = union(
    defineBasicExtension(),
    defineReadonly(),
    defineCommitViewer(props.commit),
  )
  const editor = createEditor({ extension })

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
