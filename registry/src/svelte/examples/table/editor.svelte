<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { defaultContent } from '../../sample/sample-doc-table'
import { TableHandle } from '../../ui/table-handle'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })
</script>

<ProseKit editor={editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div use:editor.mount class="CSS_EDITOR_CONTENT"></div>
      <TableHandle />
    </div>
  </div>
</ProseKit>
