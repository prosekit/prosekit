<script lang="ts">
import { Themes } from '@prosekit/themes'
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
import { ProseKit } from 'prosekit/svelte'

export let commit: Commit

const extension = union([
  defineBasicExtension(),
  defineReadonly(),
  defineCommitViewer(commit),
])

const editor = createEditor({ extension })

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
