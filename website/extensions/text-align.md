# Text Align

Sets the horizontal alignment of the block nodes using the [`text-align`] CSS property.

## Usage

```ts twoslash
import { defineTextAlign } from 'prosekit/extensions/text-align'

const extension = defineTextAlign({
  // A list of nodes that will be applied.
  types: ['paragraph', 'heading'],
  // An optional default alignment value. Defaults to `left`.
  default: 'right',
})
```

## API Reference

- [prosekit/extensions/text-align](/references/extensions/text-align)

<!-- Link references -->

[`text-align`]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
