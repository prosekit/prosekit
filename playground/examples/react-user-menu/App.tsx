import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import TagMenu from './TagMenu'
import UserMenu from './UserMenu'
import { defineExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
          <UserMenu />
          <TagMenu />
        </div>
      </div>
    </ProseKit>
  )
}
