import { createSignal, type JSX } from 'solid-js'

import { Button } from '../../ui/button'

import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar(props: {
  onSubmit: (hotkey: string) => void
}): JSX.Element {
  const [hotkey, setHotkey] = createSignal<'Shift-Enter' | 'Enter'>('Shift-Enter')
  useSubmitKeymap(hotkey, props.onSubmit)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={hotkey() === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Shift + Enter</kbd>
      </Button>

      <Button pressed={hotkey() === 'Enter'} onClick={() => setHotkey('Enter')}>
        <span class="mr-1">Submit with</span>
        <kbd>Enter</kbd>
      </Button>
    </div>
  )
}
