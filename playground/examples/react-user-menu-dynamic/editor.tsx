import 'prosekit/basic/style.css'
import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import UserMenuDynamic from './user-menu-dynamic'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <div className={Themes.EDITOR_DOCUMENT}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
          <UserMenuDynamic />
        </div>
      </div>
    </ProseKit>
  )
}
