<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

function getCounts(editor: Editor) {
  const doc = editor.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  const wordCount = words.split(/\s+/).filter((word) => word).length
  const characterCount = doc ? doc.textContent.length : 0
  return { wordCount, characterCount }
}

const counts = useEditorDerivedValue(getCounts)
</script>

<div class="p-4 text-center italic tabular-nums">
  Word Count: {$counts.wordCount}
  <br />
  Character Count: {$counts.characterCount}
</div>
