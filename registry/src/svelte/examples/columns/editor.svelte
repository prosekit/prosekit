<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/columns/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { untrack } from 'svelte'

import { sampleContent } from '../../sample/sample-doc-columns.ts'

import ColumnsUi from './columns-ui.svelte'
import { defineExtension } from './extension.ts'
import Toolbar from './toolbar.svelte'

export interface Props {
  initialContent?: NodeJSON
}

const props: Props = $props()

const extension = defineExtension()
const defaultContent = untrack(() => props.initialContent ?? sampleContent)
const editor = createEditor({ extension, defaultContent })
</script>

<ProseKit editor={editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <ColumnsUi />
    </div>
  </div>
</ProseKit>
