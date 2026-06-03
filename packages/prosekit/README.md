# prosekit

[![npm](https://img.shields.io/npm/v/prosekit)](https://www.npmjs.com/package/prosekit)

The ultimate toolkit for building rich text editors on the web. Headless, type-safe, and composable, built on [ProseMirror](https://prosemirror.net/) with first-class support for React, Vue, Preact, Svelte, Solid, and vanilla JavaScript.

## Installation

```bash
npm install prosekit
```

## Usage

```ts
import { createEditor } from 'prosekit/core'
import { defineBasicExtension } from 'prosekit/basic'

const editor = createEditor({ extension: defineBasicExtension() })
```

Then mount the editor in your framework of choice. See the [Quick Start](https://prosekit.dev/getting-started/quick-start) for a complete example.

`prosekit` bundles every `@prosekit/*` package under a single dependency, and each entry point re-exports its scoped counterpart. So these two imports are equivalent:

```ts
import { defineItalic } from 'prosekit/extensions/italic'
import { defineItalic } from '@prosekit/extensions/italic'
```

## Documentation

For full documentation, visit [prosekit.dev](https://prosekit.dev).

## Community

Join the community on [Discord](https://prosekit.dev/chat).

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/prosekit/prosekit/blob/master/packages/prosekit/CHANGELOG.md).

## License

[MIT](https://github.com/prosekit/prosekit/blob/master/LICENSE)
