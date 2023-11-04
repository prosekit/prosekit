<script lang="ts">
import 'prosekit/core/style.css'
import 'prosekit/extensions/list/style.css'

import { createEditor, type NodeJson } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onMount, onDestroy } from 'svelte'
import { defineExtension } from './extension'

const defaultDoc: NodeJson = {
  type: 'doc',
  content: [
    {
      type: 'list',
      attrs: { kind: 'bullet' },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Bullet List' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered' },
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Ordered List' }],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Task List ' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'toggle', collapsed: true },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Toggle List' }] },
        {
          type: 'list',
          attrs: {
            kind: 'bullet',
          },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Hidden' }] },
          ],
        },
      ],
    },
  ],
}

const editor = createEditor({ extension: defineExtension(), defaultDoc })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.unmount())
</script>

<ProseKit {editor}>
  <div bind:this={place} class="EDITOR_CONTENT"></div>
</ProseKit>
