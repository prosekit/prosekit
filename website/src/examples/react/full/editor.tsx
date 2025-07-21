import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  debug,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import {
  useEffect,
  useMemo,
} from 'react'

import BlockHandle from './block-handle'
import { DEFAULT_CONTENT } from './default-content-full'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu'
import SlashMenu from './slash-menu'
import TableHandle from './table-handle'
import TagMenu from './tag-menu'
import Toolbar from './toolbar'
import UserMenu from './user-menu'

// TODO: remove this
const DEBUG_CONFIG = {
  attach_view: true,
  log_mousemove: false,
}

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent: DEFAULT_CONTENT })
  }, [])

  useEffect(() => {
    if (DEBUG_CONFIG.attach_view === false) return

    setTimeout(() => {
      window.view = editor.view
    }, 100)
  }, [editor])

  useEffect(() => {
    if (DEBUG_CONFIG.log_mousemove === false) return

    const eventListener = (e: MouseEvent) => {
      const pos = editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
      debug(`[DEBUG] editor.tsx pos x: ${e.clientX}, y: ${e.clientY} => ${JSON.stringify(pos)}`)
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
        </div>
      </div>
    </ProseKit>
  )
}
