<script lang="ts">
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
import { ProseKit } from 'prosekit/svelte'

export let commitRecorder: CommitRecorder
export let defaultContent: NodeJSON | undefined = undefined
export let key: number = 0

$: extension = union(
  defineBasicExtension(),
  defineCommitRecorder(commitRecorder),
)
$: editor = createEditor({ extension, defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

{#key key}
  <ProseKit {editor}>
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div use:mount class="CSS_EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
{/key}
