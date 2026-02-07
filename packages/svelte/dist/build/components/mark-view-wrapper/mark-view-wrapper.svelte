<script lang="ts">
import { useMarkViewContext } from '@prosemirror-adapter/svelte'
import type { SvelteMarkViewProps } from '../../extensions/svelte-mark-view.js'
import type { MarkViewWrapperProps } from './props.js'

const { component: MarkViewComponent }: MarkViewWrapperProps = $props()

const markViewProps: SvelteMarkViewProps = {
  contentRef: useMarkViewContext('contentRef'),
  view: useMarkViewContext('view'),
  mark: useMarkViewContext('mark'),
}
</script>

{#if MarkViewComponent}
  <MarkViewComponent {...markViewProps} />
{/if}
