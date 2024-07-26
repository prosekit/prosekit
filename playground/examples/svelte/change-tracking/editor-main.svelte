<script lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union, type NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  defineCommitRecorder,
} from 'prosekit/extensions/commit'
import { ProseKit } from 'prosekit/svelte'

export let commitRecorder: CommitRecorder
export let defaultContent: NodeJSON

const extension = union([
  defineBasicExtension(),
  defineCommitRecorder(commitRecorder),
])

const editor = createEditor({ extension, defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>
