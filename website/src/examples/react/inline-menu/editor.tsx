import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu'

const defaultContent = '<p><b>Try to select some text</b></p>'
  + '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus. Nam aliquam sem et tortor consequat id porta. Interdum posuere lorem ipsum dolor sit amet. Lectus sit amet est placerat in egestas erat. Egestas sed tempus urna et pharetra pharetra. Sit amet cursus sit amet dictum sit amet. Porttitor leo a diam sollicitudin. Tellus orci ac auctor augue. Tellus in hac habitasse platea dictumst vestibulum. At elementum eu facilisis sed odio morbi. Dolor magna eget est lorem ipsum. Et malesuada fames ac turpis egestas. Arcu risus quis varius quam quisque id diam. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae.</p>'
    .repeat(
      10,
    )

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div
            ref={editor.mount}
            spellCheck={false}
            className="CSS_EDITOR_CONTENT"
          >
          </div>
          <InlineMenu />
        </div>
      </div>
    </ProseKit>
  )
}
