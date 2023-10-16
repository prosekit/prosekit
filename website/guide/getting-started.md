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

import { defineBasicExtension } from 'prosekit/basic'

export function defineExampleExtension() {
  return defineBasicExtension()
}

export type ExampleExtension = ReturnType<typeof defineExampleExtension>
```

:::

Then, you need to integrate the extensions into your UI framework.

-->

::: code-group

<<< @/../playground/examples/react-minimal/App.tsx [React]

<<< @/../playground/examples/vue-minimal/App.vue [Vue]

<<< @/../playground/examples/preact-minimal/App.tsx [Preact]

<<< @/../playground/examples/svelte-minimal/App.svelte [Svelte]

<<< @/../playground/examples/solid-minimal/App.tsx [Solid]

<<< @/../playground/examples/vanilla/index.js [Vanilla]

:::

## What's Next?

- Read more examples in the [Examples](/examples.md) section.
- If you need to do further custom development, you need to read the [ProseMirror documentation](https://prosemirror.net/docs/) to learn more about the underlying ProseMirror concepts.
