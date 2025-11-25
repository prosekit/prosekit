import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/yjs/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { Toolbar } from '../../ui/toolbar'

import { defineExtension } from './extension'

export default function EditorComponent(props: { room?: string }) {
  const editor = useMemo(() => {
    const doc = new Y.Doc()
    const provider = new WebsocketProvider(
      'wss://demos.yjs.dev/ws',
      `github.com/prosekit/room_${props.room}`,
      doc,
    )

    const extension = defineExtension(doc, provider.awareness)
    return createEditor({ extension })
  }, [props.room])

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
