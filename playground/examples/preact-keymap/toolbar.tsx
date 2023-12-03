import Toggle from './toggle'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar() {
  const { submitHotkey, toggleSubmitHotkey } = useSubmitKeymap()

  return (
    <div className="TOOLBAR">
      <Toggle
        pressed={submitHotkey === 'Shift-Enter'}
        onClick={toggleSubmitHotkey}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Shift</kbd> + <kbd>Enter</kbd>
      </Toggle>

      <Toggle
        pressed={submitHotkey === 'Ctrl-Enter'}
        onClick={toggleSubmitHotkey}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
      </Toggle>
    </div>
  )
}
