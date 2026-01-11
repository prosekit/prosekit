import {
  createSignal,
  type JSX,
} from 'solid-js'

import EditorComponent from './editor-component'

export default function Editor(): JSX.Element {
  const [room] = createSignal(Math.random().toString(36).substring(2, 15))

  return (
    <div class="h-full flex flex-col gap-2">
      <EditorComponent room={room()} />
      <EditorComponent room={room()} />
    </div>
  )
}
