import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import 'prosekit/basic/style.css'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultHTML })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

const defaultHTML = `
<p>Move with mouse/keyboard below the horizontal rule to see the gap cursor</p>
<img src="https://placehold.co/800x400" />
`
