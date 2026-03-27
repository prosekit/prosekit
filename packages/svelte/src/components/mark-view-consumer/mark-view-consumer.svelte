<script lang="ts">
import { useMarkViewFactory, type MarkViewFactory } from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { defineSvelteMarkViewFactory } from '../../extensions/svelte-mark-view.ts'
import { useExtension } from '../../hooks/use-extension.ts'

const markViewFactory: MarkViewFactory = useMarkViewFactory()
const extension = defineSvelteMarkViewFactory(markViewFactory)
useExtension(readable(extension))
</script>

<slot />
