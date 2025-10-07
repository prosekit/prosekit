import { useEditor } from 'prosekit/solid'
import { createMemo } from 'solid-js'

import type { EditorExtension } from './extension'

export default function WordCounter() {
  const editor = useEditor<EditorExtension>({ update: true })

  const wordCount = createMemo(() => {
    const doc = editor().state.doc
    const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
    return words.split(/\s+/).filter((s) => s).length
  })

  const characterCount = createMemo(() => {
    const doc = editor().state.doc
    return doc ? doc.textContent.length : 0
  })

  return (
    <div class="p-4 text-center italic tabular-nums">
      Word Count: {wordCount()}
      <br />
      Character Count: {characterCount()}
    </div>
  )
}
