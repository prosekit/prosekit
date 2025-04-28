import { createSignal } from 'solid-js'

import Button from './button'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar({
  onSubmit,
}: {
  onSubmit: (hotkey: string) => void
}) {
  const [hotkey, setHotkey] = createSignal<'Shift-Enter' | 'Enter'>(
    'Shift-Enter',
  )
  useSubmitKeymap(hotkey, onSubmit)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => hotkey() === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Shift + Enter</kbd>
      </Button>

      <Button
        pressed={() => hotkey() === 'Enter'}
        onClick={() => setHotkey('Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Enter</kbd>
      </Button>
    </div>
  )
}
