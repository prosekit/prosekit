# Image

The `image` node is used to represent images in the document.

<!-- @include: @/examples/image-view.md -->

## Usage

```ts
import { defineImage } from 'prosekit/extensions/image'

const extension = defineImage()
```

## Commands

### `insertImage`

```ts twoslash
import { createEditor } from 'prosekit/core'
import { defineImage } from 'prosekit/extensions/image'

const extension = defineImage()
const editor = createEditor({ extension })

// ---cut---
editor.commands.insertImage({ src: 'https://placehold.co/400' })
```

## API Reference

- [prosekit/extensions/image](/references/extensions/image)