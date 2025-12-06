<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-table'
import { TableHandle } from '../../ui/table-handle'

import { defineExtension } from './extension'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })
</script>

<ProseKit editor={editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <TableHandle />
    </div>
  </div>
</ProseKit>
