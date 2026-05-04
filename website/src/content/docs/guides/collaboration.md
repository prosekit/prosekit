---
title: Real-time collaboration
description: Sync a ProseKit editor across clients with the Yjs or Loro CRDT
sidebar:
  order: 130
---

ProseKit integrates with two CRDT libraries for real-time collaboration: [Yjs](https://github.com/yjs/yjs) and [Loro](https://loro.dev). Each ships as its own extension that binds a CRDT document to the editor. Network transport, persistence, and presence are handled by the underlying CRDT, while ProseKit only wires it into ProseMirror.

See the live editors:

- [Yjs example](/examples/yjs)
- [Loro example](/examples/loro)

## Yjs

### Install peer dependencies

```bash
npm install yjs y-prosemirror
```

For WebSocket sync, also install a provider:

```bash
npm install y-websocket
```

### Wire the editor

```ts twoslash
import 'prosekit/extensions/yjs/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineYjs } from 'prosekit/extensions/yjs'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider(
  'wss://your-server.example/sync',
  'my-room',
  ydoc,
)

const editor = createEditor({
  extension: union(
    defineBasicExtension(),
    defineYjs({ doc: ydoc, awareness: provider.awareness }),
  ),
})
```

### User awareness

```ts
provider.awareness.setLocalStateField('user', {
  name: 'Alice',
  color: '#2563eb',
})
```

The Yjs extension's CSS handles the visual rendering of remote cursors and selections.

### Persistence

For local persistence, pair the provider with `y-indexeddb`:

```bash
npm install y-indexeddb
```

```ts
import { IndexeddbPersistence } from 'y-indexeddb'

const persistence = new IndexeddbPersistence('my-room', ydoc)
```

Yjs handles offline edits automatically: changes queue locally and sync once the WebSocket reconnects.

## Loro

### Install peer dependencies

```bash
npm install loro-crdt loro-prosemirror
```

### Wire the editor

`defineLoro` accepts the Loro document plus exactly one of `awareness` or `presence` (cursor / presence info). Pick whichever your app already uses to track collaborators.

```ts twoslash
import 'prosekit/extensions/loro/style.css'

import { LoroDoc } from 'loro-crdt'
import { CursorAwareness, type LoroDocType } from 'loro-prosemirror'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, union } from 'prosekit/core'
import { defineLoro } from 'prosekit/extensions/loro'

const doc: LoroDocType = new LoroDoc()
const awareness = new CursorAwareness(doc.peerIdStr)

const editor = createEditor({
  extension: union(
    defineBasicExtension(),
    defineLoro({ doc, awareness }),
  ),
})
```

### Network sync

Loro's transport is bring-your-own. The CRDT exposes binary updates you forward over any channel (WebSocket, libp2p, BroadcastChannel, etc):

```ts-tags
const ws = new WebSocket('wss://your-server.example/loro')

doc.subscribe((event) => {
  if (event.by === 'local') {
    const update = doc.export({ mode: 'update', from: event.fromVersion })
    ws.send(update)
  }
})

ws.onmessage = (msg) => {
  doc.import(new Uint8Array(msg.data))
}
```

### Persistence and snapshots

```ts
const snapshot = doc.export({ mode: 'snapshot' })
localStorage.setItem('doc.loro', JSON.stringify(Array.from(snapshot)))

// later:
const stored = localStorage.getItem('doc.loro')
if (stored) {
  doc.import(new Uint8Array(JSON.parse(stored)))
}
```

## See also

- [`yjs` extension reference](/extensions/yjs)
- [`loro` extension reference](/extensions/loro)
- [Yjs documentation](https://docs.yjs.dev/)
- [Loro documentation](https://loro.dev/docs)
