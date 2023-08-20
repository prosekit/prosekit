/** @jsxImportSource solid-js */

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: addExampleExtension() })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="example-editor EDITOR_BOX"></div>
      <ToggleItalicButton />
      <SlashMenu />
    </ProseKit>
  )
}
