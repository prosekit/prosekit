/** @jsxImportSource preact */

import 'prosekit/basic/internal/preflight.css'
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { useMemo } from 'preact/hooks'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: addExampleExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="EDITOR_CONTENT"></div>
      <ToggleItalicButton />
      <SlashMenu />
    </ProseKit>
  )
}
