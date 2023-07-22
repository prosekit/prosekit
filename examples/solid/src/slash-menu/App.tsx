import { addNodeView, createEditor } from 'prosekit/core'
import { HeadingAttrs } from 'prosekit/extensions/heading'
import { ProseKit, useExtension } from 'prosekit/solid'
import { createEffect, createSignal } from 'solid-js'

import SlashMenu from './SlashMenu'
import ToggleItalicButton from './ToggleItalicButton'
import { addExampleExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: addExampleExtension() })

  const [headingColor, toggleHeadingColor] = useHeadingColor()

  return (
    <>
      <button onClick={toggleHeadingColor}>Toggle heading color</button>

      <ProseKit editor={editor}>
        <div ref={editor.mount} class="example-editor"></div>
        <ToggleItalicButton />
        <EditorHooksRunner headingColor={headingColor} />
        <SlashMenu />
      </ProseKit>
    </>
  )
}

function EditorHooksRunner({ headingColor }: { headingColor: () => string }) {
  createEffect(() => {
    const color = headingColor()

    const extension = addNodeView({
      name: 'heading',
      constructor: (node) => {
        const attrs = node.attrs as HeadingAttrs
        const dom = document.createElement(`h${attrs.level}`)
        dom.style.background = color
        return { dom, contentDOM: dom }
      },
    })

    return useExtension({ extension })
  })

  return null
}

function useHeadingColor() {
  type Color = 'lightblue' | 'yellow'
  const [color, setColor] = createSignal<Color>('yellow')

  const toggleColor = () => {
    if (color() === 'yellow') {
      setColor('lightblue')
    } else {
      setColor('yellow')
    }
  }

  return [color, toggleColor] as const
}
