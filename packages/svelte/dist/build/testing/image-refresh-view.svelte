<script lang="ts">
import type { ImageAttrs } from '@prosekit/testing'
import { fromStore } from 'svelte/store'
import type { SvelteNodeViewProps } from '../index.js'
import { state } from './image-refresh-state.js'

const props: SvelteNodeViewProps = $props()

const node = $derived(fromStore(props.node))
const url = $derived((node.current.attrs as ImageAttrs).src)

$effect(() => {
  state.imageRefresh.mounted++
  const id = setInterval(() => {
    state.imageRefresh.setAttrs++
    props.setAttrs({ src: String(Math.random()) })
  }, 50)

  return () => {
    state.imageRefresh.unmounted++
    clearInterval(id)
  }
})
</script>

<div data-testid="image-refresh-view" data-url={url}></div>
