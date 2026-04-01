<script lang="ts">
import { getId } from '@ocavue/utils'
import { onDestroy, onMount } from 'svelte'

import type { SvelteNodeViewProps } from '../index.ts'
import { state } from './image-refresh-state.ts'
import { fromStore } from 'svelte/store'

const props: SvelteNodeViewProps = $props()

const node = $derived(fromStore(props.node))
const url = $derived((node.current.attrs as { url: string }).url)

$effect(() => {
  state.imageRefresh.mounted++
  const id = setInterval(() => {
    state.imageRefresh.setAttrs++
    props.setAttrs({ url: String(getId()) })
  }, 50)

  return () => {
    state.imageRefresh.unmounted++
    clearInterval(id)
  }
})
</script>

<div data-testid="image-refresh-view" data-url={url}></div>
