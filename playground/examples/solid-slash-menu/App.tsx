/** @jsxImportSource solid-js */

import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: addExampleExtension() })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="EDITOR_CONTENT"></div>
      <ToggleItalicButton />
      <SlashMenu />
    </ProseKit>
  )
}
