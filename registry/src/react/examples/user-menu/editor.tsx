import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { tags } from '../../sample/tag-data'
import { users } from '../../sample/user-data'
import { TagMenu } from '../../ui/tag-menu'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <UserMenu users={users} />
          <TagMenu tags={tags} />
        </div>
      </div>
    </ProseKit>
  )
}
