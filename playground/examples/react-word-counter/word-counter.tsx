import { useEditor } from 'prosekit/react'

export default function WordCounter() {
  const editor = useEditor({ update: true })

  const doc = editor.mounted && editor.view.state.doc
  const words = doc ? doc.textBetween(0, doc.content.size, ' ') : ''
  const wordCount = words.split(/\s+/).filter((s) => s).length
  const characterCount = doc ? doc.textContent.length : 0

  return (
    <div className="p-4 text-center italic tabular-nums">
      Word Count: {wordCount}
      <br />
      Character Count: {characterCount}
    </div>
  )
}
