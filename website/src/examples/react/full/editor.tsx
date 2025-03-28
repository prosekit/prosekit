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
  <li data-list-kind="task" >
    <input type="checkbox" checked />
    <span>B</span>
  </li> 
  <li data-list-kind="task">
    <input type="checkbox" />
    <span>C</span>
  </li>
  <li data-list-kind="task" data-list-checked>
    <input type="checkbox" checked />
    <span>D</span>
  </li>
  <li data-list-kind="task" data-list-checked>
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

  useEffect(() => {
    setTimeout(() => {
      window.view = editor.view
    }, 100)
  }, [editor])

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      const pos = editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
      log(`[DEBUG] editor.tsx pos x: ${e.clientX}, y: ${e.clientY} => ${JSON.stringify(pos)}`)
    }

    document.addEventListener('mousemove', eventListener)
    document.addEventListener('dragover', eventListener)
    return () => {
      document.removeEventListener('mousemove', eventListener)
      document.removeEventListener('dragover', eventListener)
    }
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

let cachedMessage = ''

function log(message: string) {
  if (cachedMessage !== message) {
    console.log(message)
    cachedMessage = message
  }
}
