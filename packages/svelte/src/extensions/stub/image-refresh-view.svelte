<script lang="ts">
import { getId } from '@ocavue/utils'
import { onDestroy, onMount } from 'svelte'

import type { SvelteNodeViewProps } from '../svelte-node-view.ts'
import { state } from './test-state.ts'

const {
  node,
  setAttrs,
  contentRef: _contentRef,
  view: _view,
  getPos: _getPos,
  selected: _selected,
  decorations: _decorations,
  innerDecorations: _innerDecorations,
}: SvelteNodeViewProps = $props()

const url = $derived(($node.attrs as { url: string }).url)

let intervalId: ReturnType<typeof setInterval>

onMount(() => {
  state.imageRefresh.mounted++
  intervalId = setInterval(() => {
    state.imageRefresh.setAttrs++
    setAttrs({ url: String(getId()) })
  }, 50)
})

onDestroy(() => {
  state.imageRefresh.unmounted++
  clearInterval(intervalId)
})
</script>

<div data-testid="image-refresh-view" data-url={url}></div>
