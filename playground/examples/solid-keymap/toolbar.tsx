import Toggle from './toggle'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar({
  onSubmit,
}: {
  onSubmit: (hotkey: string) => void
}) {
  const { hotkey, setHotkey } = useSubmitKeymap(onSubmit)

  return (
    <div class="TOOLBAR">
      <Toggle
        pressed={() => hotkey() === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Shift + Enter</kbd>
      </Toggle>

      <Toggle
        pressed={() => hotkey() === 'Enter'}
        onClick={() => setHotkey('Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Enter</kbd>
      </Toggle>
    </div>
  )
}
