<script lang="ts">
import { useMarkViewFactory, type MarkViewFactory } from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { defineSvelteMarkViewFactory } from '../../extensions/svelte-mark-view'
import { useExtension } from '../../hooks/use-extension'

const markViewFactory: MarkViewFactory = useMarkViewFactory()
const extension = defineSvelteMarkViewFactory(markViewFactory)
useExtension(readable(extension))
</script>

<slot />
