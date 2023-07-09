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

## Configuration

First, you need to configure specific extensions.

::: code-group

```ts [extension.ts]
import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'

export function addNoteExtension() {
  return addBasicExtension()
}

export type NoteExtension = ReturnType<typeof addNoteExtension>
```

:::

Then, you need to integrate the extensions into your UI framework.

::: code-group

```tsx [React]
import { ProseKit } from 'prosekit/react'
import { useMemo, useState } from 'react'
import { addNoteExtension } from './extension'

export function App() {
  const extension = useMemo(addNoteExtension, [])
  const [place, setPlace] = useState<HTMLElement | null>(null)

  return (
    <ProseKit extension={extension} place={place}>
      <div ref={setPlace}></div>
    </ProseKit>
  )
}
```

```vue [Vue]
<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { addNoteExtension } from './extension'

const extension = computed(addNoteExtension)
const place = ref<HTMLElement | null>(null)
</script>

<template>
  <ProseKit :extension="extension" :place="place">
    <div ref="place"></div>
  </ProseKit>
</template>
```

:::

## What's Next?

- Read more examples in the [Examples](/examples.md) section.
- If you need to do further custom development, you need to read the [ProseMirror documentation](https://prosemirror.net/docs/) to learn more about the underlying ProseMirror concepts.
