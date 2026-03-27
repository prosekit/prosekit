import { LoroDoc, type AwarenessListener } from 'loro-crdt'
import { CursorAwareness, type LoroDocType } from 'loro-prosemirror'
import { onCleanup, type JSX } from 'solid-js'

import EditorComponent from './editor-component'

export default function Editor(): JSX.Element {
  const loroA: LoroDocType = new LoroDoc()
  const loroB: LoroDocType = new LoroDoc()

  const idA = loroA.peerIdStr
  const idB = loroB.peerIdStr

  const awarenessA = new CursorAwareness(idA)
  const awarenessB = new CursorAwareness(idB)

  loroA.import(loroB.export({ mode: 'update' }))
  loroB.import(loroA.export({ mode: 'update' }))

  const unsubscribeA = loroA.subscribeLocalUpdates((updates) => {
    loroB.import(updates)
  })

  const unsubscribeB = loroB.subscribeLocalUpdates((updates) => {
    loroA.import(updates)
  })

  const awarenessAListener: AwarenessListener = (_, origin) => {
    if (origin === 'local') {
      awarenessB.apply(awarenessA.encode([idA]))
    }
  }

  const awarenessBListener: AwarenessListener = (_, origin) => {
    if (origin === 'local') {
      awarenessA.apply(awarenessB.encode([idB]))
    }
  }

  awarenessA.addListener(awarenessAListener)
  awarenessB.addListener(awarenessBListener)

  onCleanup(() => {
    awarenessA.removeListener(awarenessAListener)
    awarenessB.removeListener(awarenessBListener)
    unsubscribeA()
    unsubscribeB()
  })

  return (
    <div class="h-full flex flex-col gap-2">
      <EditorComponent loro={loroA} awareness={awarenessA} />
      <EditorComponent loro={loroB} awareness={awarenessB} />
    </div>
  )
}
