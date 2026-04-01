<script lang="ts">
import { getId } from '@ocavue/utils'
import { onDestroy, onMount } from 'svelte'

import type { SvelteNodeViewProps } from './svelte-node-view.ts'
import { state } from './svelte-node-view-spec-state.ts'

export let node: SvelteNodeViewProps['node']
export let setAttrs: SvelteNodeViewProps['setAttrs']
export let contentRef: SvelteNodeViewProps['contentRef']
export let view: SvelteNodeViewProps['view']
export let getPos: SvelteNodeViewProps['getPos']
export let selected: SvelteNodeViewProps['selected']
export let decorations: SvelteNodeViewProps['decorations']
export let innerDecorations: SvelteNodeViewProps['innerDecorations']

$: url = ($node.attrs as { url: string }).url

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
