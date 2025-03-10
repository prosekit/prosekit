import EditorComponent from './editor-component'

export default function Page() {
  return (
    <div className="h-full flex flex-col gap-2">
      <EditorComponent />
      <EditorComponent />
    </div>
  )
}
