import Toggle from './toggle'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar({
  onSubmit,
}: {
  onSubmit: (hotkey: string) => void
}) {
  const { hotkey, setHotkey } = useSubmitKeymap(onSubmit)

  return (
    <div className="TOOLBAR">
      <Toggle
        pressed={hotkey === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span className="mr-1">Submit with</span>
        <kbd>Shift</kbd> + <kbd>Enter</kbd>
      </Toggle>

      <Toggle
        pressed={hotkey === 'Ctrl-Enter'}
        onClick={() => setHotkey('Ctrl-Enter')}
      >
        <span className="mr-1">Submit with</span>
        <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
      </Toggle>
    </div>
  )
}
