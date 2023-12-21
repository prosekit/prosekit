# Placeholder

Show some placeholder text when the current text block is empty or the whole document is empty.

<!-- @include: @/examples/placeholder.md -->

## Usage

```ts
import 'prosekit/extensions/placeholder/style.css'

import { definePlaceholder } from 'prosekit/extensions/readonly'

extension = definePlaceholder({ placeholder: 'Type Something...' })
```

Note that you would need to import the style file for the extension to work.

## API Reference

- [prosekit/extensions/placeholder](/references/extensions/placeholder)
