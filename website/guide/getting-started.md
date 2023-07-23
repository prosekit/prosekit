# Getting Started

## Installation

::: code-group

```shell [npm]
npm install prosekit
```

```shell [yarn]
yarn add prosekit
```

```shell [pnpm]
pnpm add prosekit
```

:::

## Usage

<!--

First, you need to configure specific extensions.

::: code-group

```ts [extension.ts]
import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'

export function addExampleExtension() {
  return addBasicExtension()
}

export type ExampleExtension = ReturnType<typeof addExampleExtension>
```

:::

Then, you need to integrate the extensions into your UI framework.

-->

::: code-group

<<< @/../examples/react/src/minimal/App.tsx [React]

<<< @/../examples/vue/src/minimal/App.vue [Vue]

<<< @/../examples/svelte/src/minimal/App.svelte [Svelte]

<<< @/../examples/preact/src/minimal/App.tsx [Preact]

<<< @/../examples/solid/src/minimal/App.tsx [Solid]

:::

## What's Next?

- Read more examples in the [Examples](/examples.md) section.
- If you need to do further custom development, you need to read the [ProseMirror documentation](https://prosemirror.net/docs/) to learn more about the underlying ProseMirror concepts.
