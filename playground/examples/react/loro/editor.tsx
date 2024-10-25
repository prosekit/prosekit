import { LoroDoc } from 'loro-crdt'
import { CursorAwareness, type LoroDocType } from 'loro-prosemirror'
import { useRef, useEffect } from 'react'

import EditorComponent from './editor-component'

export default function Page() {
  const { loroARef, awarenessA, loroBRef, awarenessB } = useLoroExample()

  return (
    <div className="h-full flex flex-col gap-2">
      <EditorComponent loro={loroARef.current} awareness={awarenessA.current} />
      <EditorComponent loro={loroBRef.current} awareness={awarenessB.current} />
    </div>
  )
}

function useLoroExample() {
  const loroARef = useRef<LoroDocType>(new LoroDoc())
  const idA = loroARef.current.peerIdStr
  const awarenessA = useRef<CursorAwareness>(new CursorAwareness(idA))
  const loroBRef = useRef<LoroDocType>(new LoroDoc())
  const idB = loroBRef.current.peerIdStr
  const awarenessB = useRef<CursorAwareness>(new CursorAwareness(idB))
  useEffect(() => {
    loroARef.current.subscribe((event) => {
      if (event.by === 'local') {
        loroBRef.current.import(
          loroARef.current.exportFrom(loroBRef.current.oplogVersion()),
        )
      }
    })
    loroBRef.current.subscribe((event) => {
      if (event.by === 'local') {
        loroARef.current.import(
          loroBRef.current.exportFrom(loroARef.current.oplogVersion()),
        )
      }
    })
    awarenessA.current.addListener((_state, origin) => {
      if (origin === 'local') {
        awarenessB.current.apply(awarenessA.current.encode([idA]))
      }
    })
    awarenessB.current.addListener((_state, origin) => {
      if (origin === 'local') {
        awarenessA.current.apply(awarenessB.current.encode([idB]))
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loroARef,
    awarenessA,
    loroBRef,
    awarenessB,
  }
}
