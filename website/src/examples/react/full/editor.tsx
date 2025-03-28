import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import {
  useEffect,
  useMemo,
} from 'react'

import BlockHandle from './block-handle'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu'
import SlashMenu from './slash-menu'
import TagMenu from './tag-menu'
import Toolbar from './toolbar'
import UserMenu from './user-menu'

const defaultContent = `
<ul>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>A</span>
  </li>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>B</span>
  </li> 
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>C</span>
  </li>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>D</span>
  </li>
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>E</span>
  </li>
</ul>
`

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  useEffect(() => {
    const id = setTimeout(() => {
      editor.setContent(defaultContent)
    }, 2000)
    return () => clearTimeout(id)
  }, [editor])

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
