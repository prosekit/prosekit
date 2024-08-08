# Yjs

Make the editor collaborative by integrating [Yjs](https://github.com/yjs/yjs) with ProseKit.

<!-- @include: @/examples/yjs.md -->

## Usage

You need to install `yjs` and `y-prosemirror` to use this extension.

::: code-group

```shell [npm]
npm install yjs y-prosemirror
```

```shell [yarn]
yarn add yjs y-prosemirror
```

```shell [pnpm]
pnpm add yjs y-prosemirror
```

:::

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

const extension = defineYjs({ doc, awareness: provider.awareness })
```

## API Reference

- [prosekit/extensions/yjs](/references/extensions/yjs)
