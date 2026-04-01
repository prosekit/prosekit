<script lang="ts">
import { getId } from '@ocavue/utils';

import { fromStore } from 'svelte/store';
import type { SvelteNodeViewProps } from '../index.ts';
import { state } from './image-refresh-state.ts';

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
