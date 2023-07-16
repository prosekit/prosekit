import { addNodeView, createEditor } from 'prosekit/core'
import { HeadingAttrs } from 'prosekit/extensions/heading'
import { ProseKit, useExtension } from 'prosekit/react'
import { useMemo, useReducer } from 'react'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: addExampleExtension() })
  }, [])

  const [headingColor, toggleHeadingColor] = useHeadingColor()

  return (
    <>
      <button onClick={toggleHeadingColor}>Toggle heading color</button>

      <ProseKit editor={editor}>
        <div ref={editor.mount} className="example-editor"></div>
        <ToggleItalicButton />
        <EditorHooksRunner headingColor={headingColor} />
        <SlashMenu />
      </ProseKit>
    </>
  )
}

function EditorHooksRunner({ headingColor }: { headingColor: string }) {
  const extension = useMemo(() => {
    return addNodeView({
      name: 'heading',
      constructor: (node) => {
        const attrs = node.attrs as HeadingAttrs
        const dom = document.createElement(`h${attrs.level}`)
        dom.style.background = headingColor
        return { dom, contentDOM: dom }
      },
    })
  }, [headingColor])

  useExtension({ extension })
  return null
}

function useHeadingColor() {
  type Color = 'lightblue' | 'yellow'
  return useReducer((color: Color): Color => {
    if (color === 'lightblue') return 'yellow'
    else {
      return 'lightblue'
    }
  }, 'lightblue' satisfies Color)
}
