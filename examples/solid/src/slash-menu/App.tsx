import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: addExampleExtension() });

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="example-editor"></div>
      <ToggleItalicButton />
      <SlashMenu />
    </ProseKit>
  )
}
