import 'prosekit/basic/style.css'
import { Themes } from '@prosekit/themes'
import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultDoc })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_DOCUMENT}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/150x150/8bd450/ffffff/png',
        width: 150,
        height: 150,
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/200x80/965fd4/ffffff/png',
        width: 200,
        height: 80,
      },
    },
  ],
}
