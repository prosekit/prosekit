import {
  LoroDoc,
  type AwarenessListener,
  type PeerID,
} from 'loro-crdt'
import {
  CursorAwareness,
  type LoroDocType,
} from 'loro-prosemirror'
import {
  useState,
  useSyncExternalStore,
} from 'react'

import EditorComponent from './editor-component'

export default function Page() {
  const [loroStore] = useState(() => new LoroStore())
  const loroState = useSyncExternalStore(loroStore.subscribe, loroStore.getSnapshot)

  return (
    <div className="h-full flex flex-col gap-2">
      <EditorComponent loro={loroState.loroA} awareness={loroState.awarenessA} />
      <EditorComponent loro={loroState.loroB} awareness={loroState.awarenessB} />
    </div>
  )
}

class LoroStore {
  private state: {
    loroA: LoroDocType
    loroB: LoroDocType
    idA: PeerID
    idB: PeerID
    awarenessA: CursorAwareness
    awarenessB: CursorAwareness
  }

  constructor() {
    const loroA: LoroDocType = new LoroDoc()
    const loroB: LoroDocType = new LoroDoc()
    const idB = loroB.peerIdStr
    const idA = loroA.peerIdStr
    const awarenessA = new CursorAwareness(idA)
    const awarenessB = new CursorAwareness(idB)
    this.state = { loroA, loroB, idA, idB, awarenessA, awarenessB }
  }

  getSnapshot = () => {
    return this.state
  }

  subscribe = () => {
    const { loroA, loroB, idA, idB, awarenessA, awarenessB } = this.state
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
  }
}
