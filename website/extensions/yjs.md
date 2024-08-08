# Yjs

[`Yjs`](https://github.com/yjs/yjs) is a CRDT framework with a powerful abstraction of shared data.

By integrating yjs and prosekit, it is possible to create a document editor that allows multiple users to collaborate.

<!-- @include: @/examples/yjs.md -->

## Usage

it is necessary to install the latest versions of `yjs` and `y-prosemirror` as dependencies.

```shell [npm]
npm install yjs y-prosemirror
```

```shell [yarn]
yarn add yjs y-prosemirror
```

```shell [pnpm]
pnpm add yjs y-prosemirror
```

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
