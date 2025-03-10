import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import BlockHandle from './block-handle'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu'
import SlashMenu from './slash-menu'
import TagMenu from './tag-menu'
import Toolbar from './toolbar'
import UserMenu from './user-menu'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <Toolbar />
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
          <InlineMenu />
          <SlashMenu />
          <UserMenu />
          <TagMenu />
          <BlockHandle />
        </div>
      </div>
    </ProseKit>
  )
}
