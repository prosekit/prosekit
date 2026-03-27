<script lang="ts">
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineCommitViewer, type Commit } from 'prosekit/extensions/commit'
import { defineReadonly } from 'prosekit/extensions/readonly'
import { ProseKit } from 'prosekit/svelte'

interface Props {
  commit: Commit
}

const props: Props = $props()

let extension = $derived(union(
  defineBasicExtension(),
  defineReadonly(),
  defineCommitViewer(props.commit),
))
let editor = $derived(createEditor({ extension }))
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
