<script lang="ts">
import { useMarkViewFactory, type MarkViewFactory } from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { defineSvelteMarkViewFactory } from '../../extensions/svelte-mark-view.js'
import { useExtension } from '../../hooks/use-extension.js'

const markViewFactory: MarkViewFactory = useMarkViewFactory()
const extension = defineSvelteMarkViewFactory(markViewFactory)
useExtension(readable(extension))
</script>

<slot />
