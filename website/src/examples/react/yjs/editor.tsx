import EditorComponent from './editor-component'

export default function Page() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <EditorComponent />
      <EditorComponent />
    </div>
  )
}
