<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/loro/style.css'

import type { CursorAwareness, LoroDocType } from 'loro-prosemirror'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

interface Props {
  loro: LoroDocType
  awareness: CursorAwareness
}

const props: Props = $props()

const extension = defineExtension(props.loro, props.awareness)
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
