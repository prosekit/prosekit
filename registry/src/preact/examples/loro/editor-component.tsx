import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/loro/style.css'

import type {
  CursorAwareness,
  LoroDocType,
} from 'loro-prosemirror'
import { useMemo } from 'preact/hooks'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

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
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}
