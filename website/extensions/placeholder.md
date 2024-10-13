# Placeholder

Show some placeholder text when the current text block is empty or the whole document is empty.

<!-- @include: @/examples/placeholder.md -->

## Usage

```ts twoslash
import { definePlaceholder } from 'prosekit/extensions/placeholder'

const extension = definePlaceholder({ placeholder: 'Type Something...' })
```

Or show dynamic placeholders by node

```ts twoslash
import { definePlaceholder } from 'prosekit/extensions/placeholder'

const extension = definePlaceholder({
  placeholder: ({ node }) => {
    if (node.type.name === 'heading') {
      return `Heading ${node.attrs.level}`
    }
    return 'Type something...'
  },
})
```

Note that you would need to import the style file for the extension to work.

## API Reference

- [prosekit/extensions/placeholder](/references/extensions/placeholder)
