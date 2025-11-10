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

interface Props {
  commitRecorder: CommitRecorder
  defaultContent?: NodeJSON
  key?: number
}

const props: Props = $props()

let extension = $derived(union(
  defineBasicExtension(),
  defineCommitRecorder(props.commitRecorder),
))
let editor = $derived(createEditor({ extension, defaultContent: props.defaultContent }))

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

{#key props.key}
  <ProseKit {editor}>
    <div class="CSS_EDITOR_VIEWPORT">
      <div class="CSS_EDITOR_SCROLLING">
        <div use:mount class="CSS_EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
{/key}
