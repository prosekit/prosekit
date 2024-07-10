import 'prosekit/basic/style.css'
import 'prosekit/extensions/search/style.css'

import { Themes } from '@prosekit/themes'
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
      defaultHTML:
        '<p>Baa, baa, black sheep,</p>' +
        '<p>Have you any wool?</p>' +
        '<p>Yes, sir, yes, sir,</p>' +
        '<p>Three bags full;</p>' +
        '<p>One for the master,</p>' +
        '<p>And one for the dame,</p>' +
        '<p>And one for the little boy</p>' +
        '<p>Who lives down the lane.</p>',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_SCROLLING}>
          <Search />
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
