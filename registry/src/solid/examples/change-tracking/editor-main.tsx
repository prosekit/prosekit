import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

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
import { ProseKit } from 'prosekit/solid'
import {
  createMemo,
  type Accessor,
  type JSX,
} from 'solid-js'

export default function EditorMain(props: {
  commitRecorder: CommitRecorder
  defaultContent?: Accessor<NodeJSON | undefined>
  key?: Accessor<number>
}): JSX.Element {
  const editor = createMemo(() => {
    // Access key to trigger recreation when it changes
    props.key?.()
    const extension = union(
      defineBasicExtension(),
      defineCommitRecorder(props.commitRecorder),
    )
    return createEditor({ extension, defaultContent: props.defaultContent?.() })
  })

  return (
    <ProseKit editor={editor()}>
      <div class="CSS_EDITOR_VIEWPORT">
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor().mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
