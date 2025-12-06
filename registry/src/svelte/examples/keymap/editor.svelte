<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension })

let submissions = $state<string[]>([])

function pushSubmission(hotkey: string) {
  const docString = JSON.stringify(editor.getDocJSON())
  const submission = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submissions = [...submissions, submission]
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar onSubmit={pushSubmission} />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
  <fieldset class="CSS_KEYMAP_FIELDSET">
    <legend>Submit Records</legend>
    <ol>
      {#each submissions as submission, index (index)}
        <li>
          <pre>{submission}</pre>
        </li>
      {/each}
    </ol>
    {#if submissions.length === 0}
      <div>No submissions yet</div>
    {/if}
  </fieldset>
</ProseKit>
