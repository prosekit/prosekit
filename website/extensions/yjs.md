# Yjs

[`Yjs`](https://github.com/yjs/yjs) is a CRDT framework with a powerful abstraction of shared data.

By integrating yjs and prosekit, it is possible to create a document editor that allows multiple users to collaborate.

> In this online example, in order to have a complete collaborative experience, you will need to apply for `appId` and `token` from [tiptap cloud](https://cloud.tiptap.dev/).

<!-- @include: @/examples/yjs.md -->

## Usage

```ts twoslash
import 'prosekit/extensions/yjs/style.css'
import * as Y from 'yjs'
import { defineYjs } from 'prosekit/extensions/yjs'
import { WebsocketProvider } from 'y-websocket'

const doc = new Y.Doc()
const provider = new WebsocketProvider(
  'ws://localhost:1234',
  'my-roomname',
  doc,
)

const extension = defineYjs(doc, provider.awareness)
```

## API Reference

- [prosekit/extensions/yjs](/references/extensions/yjs)
