import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import BlockHandle from './block-handle'
import { DEFAULT_CONTENT } from './default-content-full'
import DropIndicator from './drop-indicator'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu'
import SlashMenu from './slash-menu'
import TableHandle from './table-handle'
import TagMenu from './tag-menu'
import Toolbar from './toolbar'
import UserMenu from './user-menu'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent: DEFAULT_CONTENT })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <InlineMenu />
          <SlashMenu />
          <UserMenu />
          <TagMenu />
          <BlockHandle />
          <TableHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
