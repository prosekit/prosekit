import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'
import type { JSX } from 'solid-js'

function getWordCount(editor: Editor) {
  const doc = editor.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  const wordCount = words.split(/\s+/).filter((s) => s).length
  const characterCount = doc ? doc.textContent.length : 0
  return { wordCount, characterCount }
}

export default function WordCounter(): JSX.Element {
  const counts = useEditorDerivedValue(getWordCount)

  return (
    <div class="p-4 text-center italic tabular-nums">
      Word Count: {counts().wordCount}
      <br />
      Character Count: {counts().characterCount}
    </div>
  )
}
