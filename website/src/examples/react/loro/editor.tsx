import { LoroDoc } from 'loro-crdt'
import {
  CursorAwareness,
  type LoroDocType,
} from 'loro-prosemirror'
import {
  useEffect,
  useState,
} from 'react'

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
    let { loroA, loroB, idA, idB, awarenessA, awarenessB } = loroState

    loroA.subscribe((event) => {
      if (event.by === 'local') {
        loroB.import(
          loroA.exportFrom(loroB.oplogVersion()),
        )
      }
    })
    loroB.subscribe((event) => {
      if (event.by === 'local') {
        loroA.import(
          loroB.exportFrom(loroA.oplogVersion()),
        )
      }
    })
    awarenessA.addListener((_state, origin) => {
      if (origin === 'local') {
        awarenessB.apply(awarenessA.encode([idA]))
      }
    })
    awarenessB.addListener((_state, origin) => {
      if (origin === 'local') {
        awarenessA.apply(awarenessB.encode([idB]))
      }
    })
  }, [loroState])

  return loroState
}
