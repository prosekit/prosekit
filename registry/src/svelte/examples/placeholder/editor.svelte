<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import { ProseKit, useDocChange } from 'prosekit/svelte'

import { defineExtension } from './extension'
import { untrack } from 'svelte';

const props: {
  initialContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
} = $props()

const extension = defineExtension()
const defaultContent = untrack(() => props.initialContent)
const editor = createEditor({ extension, defaultContent })

const handleDocChange = (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc))
useDocChange(handleDocChange, { editor })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
