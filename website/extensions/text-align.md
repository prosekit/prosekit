# Text Align

Sets the horizontal alignment of the block nodes via the [`text-align`] CSS property.

## Usage

You can directly pass an `InputRule` instance to `defineInputRule`.

```ts twoslash
import { defineTextAlign } from 'prosekit/extensions/text-align'

const extension = defineTextAlign({
  // A list of nodes that will be applied.
  types: ['paragraph', 'heading'],
  // An optional default value.
  default: 'right',
})
```

## API Reference

- [prosekit/extensions/text-align](/references/extensions/text-align)

<!-- Link references -->

[`text-align`]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
