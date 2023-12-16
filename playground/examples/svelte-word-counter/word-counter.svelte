<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import { derived } from 'svelte/store'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

const wordCount = derived(editor, ($editor) => {
  if (!$editor.mounted) {
    return 0
  }
  const text = $editor.view.state.doc.textContent
  return text.split(/\s+/).length
})
</script>

<div class="p-4 text-center italic tabular-nums">
  Word Count: {$wordCount}
</div>
