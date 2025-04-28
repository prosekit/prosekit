import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Search from './search'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultContent: '<p>Baa, baa, black sheep,</p>'
        + '<p>Have you any wool?</p>'
        + '<p>Yes, sir, yes, sir,</p>'
        + '<p>Three bags full;</p>'
        + '<p>One for the master,</p>'
        + '<p>And one for the dame,</p>'
        + '<p>And one for the little boy</p>'
        + '<p>Who lives down the lane.</p>',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <Search />
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
