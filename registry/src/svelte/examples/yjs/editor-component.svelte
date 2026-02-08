<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/yjs/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import type { Awareness } from 'prosekit/extensions/yjs'
import type * as Y from 'yjs'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

interface Props {
  doc: Y.Doc
  awareness: Awareness
}

const props: Props = $props()

const extension = defineExtension(props.doc, props.awareness)
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar />
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
