import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/loro/style.css'

import { Themes } from '@prosekit/themes'
import type {
  CursorAwareness,
  LoroDocType,
} from 'loro-prosemirror'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function EditorComponent(props: {
  loro: LoroDocType
  awareness: CursorAwareness
}) {
  const editor = useMemo(() => {
    const extension = defineExtension(props.loro, props.awareness)
    return createEditor({ extension })
  }, [props.loro, props.awareness])

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <Toolbar />
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}
