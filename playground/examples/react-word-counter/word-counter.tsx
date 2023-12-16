import { useEditor } from 'prosekit/react'

export default function WordCounter() {
  const editor = useEditor({ update: true })

  const text = editor.mounted ? editor.view.state.doc.textContent : ''
  const wordCount = text.split(/\s+/).length

  return (
    <div className="p-4 text-center italic tabular-nums">
      Word Count: {wordCount}
    </div>
  )
}
