<script lang="ts">
import { useMarkViewContext } from '@prosemirror-adapter/svelte'
import type { SvelteMarkViewProps } from '../../extensions/svelte-mark-view.ts'
import type { MarkViewWrapperProps } from './props.ts'

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
