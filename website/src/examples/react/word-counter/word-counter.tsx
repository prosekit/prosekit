import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import type { EditorExtension } from './extension'

function getWordCount(editor: Editor<EditorExtension>) {
  const doc = editor.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  const wordCount = words.split(/\s+/).filter((s) => s).length
  const characterCount = doc ? doc.textContent.length : 0
  return { wordCount, characterCount }
}

export default function WordCounter() {
  const { wordCount, characterCount } = useEditorDerivedValue(getWordCount)

  return (
    <div className="p-4 text-center italic tabular-nums">
      Word Count: {wordCount}
      <br />
      Character Count: {characterCount}
    </div>
  )
}
