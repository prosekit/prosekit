import { LoroDoc, type AwarenessListener } from 'loro-crdt'
import { CursorAwareness, type LoroDocType } from 'loro-prosemirror'
import { useEffect, useState } from 'preact/hooks'

import EditorComponent from './editor-component'

export default function Page() {
  const { loroA, awarenessA, loroB, awarenessB } = useLoroDocs()

  return (
    <div className="h-full flex flex-col gap-2">
      <EditorComponent loro={loroA} awareness={awarenessA} />
      <EditorComponent loro={loroB} awareness={awarenessB} />
    </div>
  )
}

function useLoroDocs() {
  const [loroState] = useState(() => {
    const loroA: LoroDocType = new LoroDoc()
    const loroB: LoroDocType = new LoroDoc()

    const idA = loroA.peerIdStr
    const idB = loroB.peerIdStr

    const awarenessA = new CursorAwareness(idA)
    const awarenessB = new CursorAwareness(idB)

    return { loroA, loroB, idA, idB, awarenessA, awarenessB }
  })

  useEffect(() => {
    const { loroA, loroB, idA, idB, awarenessA, awarenessB } = loroState
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
    return () => {
      awarenessA.removeListener(awarenessAListener)
      awarenessB.removeListener(awarenessBListener)
      unsubscribeA()
      unsubscribeB()
    }
  }, [loroState])

  return loroState
}
