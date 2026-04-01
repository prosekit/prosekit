<script lang="ts">
import { getId } from '@ocavue/utils'
import { onDestroy, onMount } from 'svelte'

import type { SvelteNodeViewProps } from '../svelte-node-view.ts'
import { state } from './test-state.ts'
import { fromStore } from 'svelte/store'

const props: SvelteNodeViewProps = $props()

const node = $derived(fromStore(props.node))

const url = $derived((node.current.attrs as { url: string }).url)

let intervalId: ReturnType<typeof setInterval>

onMount(() => {
  state.imageRefresh.mounted++
  intervalId = setInterval(() => {
    state.imageRefresh.setAttrs++
    props.setAttrs({ url: String(getId()) })
  }, 50)
})

onDestroy(() => {
  state.imageRefresh.unmounted++
  clearInterval(intervalId)
})
</script>

<div data-testid="image-refresh-view" data-url={url}></div>
