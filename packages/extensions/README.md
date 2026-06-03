# @prosekit/extensions

[![npm](https://img.shields.io/npm/v/@prosekit/extensions)](https://www.npmjs.com/package/@prosekit/extensions)

A collection of common extensions for [ProseKit](https://prosekit.dev), the toolkit for building rich text editors on the web. Each feature (bold, italic, headings, lists, links, tables, code blocks, and many more) ships as its own entry point, so you only bundle what you use.

```ts
import { defineBold } from '@prosekit/extensions/bold'
import { defineList } from '@prosekit/extensions/list'
```

> **Note:** This package is bundled into the main [`prosekit`](https://www.npmjs.com/package/prosekit) package. Most users should install `prosekit` and import from `prosekit/extensions/*` instead of depending on this package directly.

## Documentation

See the [extensions overview](https://prosekit.dev/extensions/overview) and the [`prosekit/extensions` reference](https://prosekit.dev/references/extensions) on [prosekit.dev](https://prosekit.dev).

## License

[MIT](https://github.com/prosekit/prosekit/blob/master/LICENSE)
