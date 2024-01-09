<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import { derived } from 'svelte/store'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

const wordCount = derived(editor, ($editor) => {
  const doc = $editor.mounted && $editor.view.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  return words.split(/\s+/).filter((s) => s).length
})

const characterCount = derived(editor, ($editor) => {
  const doc = $editor.mounted && $editor.view.state.doc
  return doc ? doc.textContent.length : 0
})
</script>

<div class="p-4 text-center italic tabular-nums">
  Word Count: {$wordCount}
  <br />
  Character Count: {$characterCount}
</div>
