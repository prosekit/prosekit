import { useExampleEditor } from './use-example-editor'

export default function ToggleItalicButton() {
  const editor = useExampleEditor()

  const onToggleItalic = (event: MouseEvent) => {
    event.preventDefault()
    editor().commands.toggleItalic()
  }

  return <button onMouseDown={onToggleItalic}>Toggle italic</button>
}
