# prosekit

[![npm](https://img.shields.io/npm/v/prosekit)](https://www.npmjs.com/package/prosekit)

The ultimate toolkit for building rich text editors on the web. Headless, type-safe, and composable, built on [ProseMirror](https://prosemirror.net/) with first-class support for [React](https://react.dev/), [Vue](https://vuejs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Solid](https://www.solidjs.com/), and vanilla JavaScript.

## Installation

```bash
npm install prosekit
```

## Usage

```ts
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: defineBasicExtension() })
```

Then mount the editor in your framework of choice. See the [Quick Start](https://prosekit.dev/getting-started/quick-start) for a complete example.

## Documentation

For full documentation, visit [prosekit.dev](https://prosekit.dev).

## Community

Join the community on [Discord](https://prosekit.dev/chat).

## Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/prosekit/prosekit/blob/master/packages/prosekit/CHANGELOG.md).

## License

[MIT](https://github.com/prosekit/prosekit/blob/master/LICENSE)
