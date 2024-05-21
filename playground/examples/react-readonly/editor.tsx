import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({
      extension: defineExtension(),
      defaultHTML:
        'The content is readonly. Press the buttons above to toggle the readonly mode.',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_DOCUMENT}>
          <Toolbar />
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
