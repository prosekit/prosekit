# Loro

Make the editor collaborative by integrating [Loro](https://loro.dev/) with ProseKit.

<!-- @include: @/examples/loro.md -->

## Usage

You need to install `loro-crdt` and `loro-prosemirror` to use this extension.

::: code-group

```shell [npm]
npm install loro-crdt loro-prosemirror
```

```shell [yarn]
yarn add loro-crdt loro-prosemirror
```

```shell [pnpm]
pnpm add loro-crdt loro-prosemirror
```

:::

```ts twoslash
import 'prosekit/extensions/loro/style.css'
import { LoroDoc } from 'loro-crdt'
import { CursorAwareness, type LoroDocType } from 'loro-prosemirror'
import { defineLoro } from 'prosekit/extensions/loro'

const doc: LoroDocType = new LoroDoc()
const awareness = new CursorAwareness(doc.peerIdStr)
const extension = defineLoro({ doc, awareness })
```

## API Reference

- [prosekit/extensions/loro](/references/extensions/loro)
