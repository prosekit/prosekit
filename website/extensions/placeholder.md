# Placeholder

Show some placeholder text when the current text block is empty or the whole document is empty.

<!-- @include: @/examples/placeholder.md -->

## Usage

```ts twoslash
import { definePlaceholder } from 'prosekit/extensions/placeholder'

const extension = definePlaceholder({ placeholder: 'Type Something...' })
```

You can also show dynamic placeholders based on the current state.

```ts twoslash
import type { HeadingAttrs } from 'prosekit/extensions/heading'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

const extension = definePlaceholder({
  placeholder: (state) => {
    // Get the current node at the text selection
    const node = state.selection.$from.node()
    // Show different placeholders based on the node type
    if (node.type.name === 'heading') {
      const attrs = node.attrs as HeadingAttrs
      return `Heading ${attrs.level}`
    }
    return 'Type something...'
  },
})
```

Note that you would need to import the style file for the extension to work.

## API Reference

- [prosekit/extensions/placeholder](/references/extensions/placeholder)
