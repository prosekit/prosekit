# @prosekit/pm

[![npm](https://img.shields.io/npm/v/@prosekit/pm)](https://www.npmjs.com/package/@prosekit/pm)

The core [ProseMirror](https://prosemirror.net/) packages that [ProseKit](https://prosekit.dev) builds on, re-exported under a single dependency with consistent versions. Import each module from its own entry point:

| Entry point               | Re-exports                                                                       |
| ------------------------- | -------------------------------------------------------------------------------- |
| `@prosekit/pm/model`      | [`prosemirror-model`](https://www.npmjs.com/package/prosemirror-model)           |
| `@prosekit/pm/state`      | [`prosemirror-state`](https://www.npmjs.com/package/prosemirror-state)           |
| `@prosekit/pm/view`       | [`prosemirror-view`](https://www.npmjs.com/package/prosemirror-view)             |
| `@prosekit/pm/transform`  | [`prosemirror-transform`](https://www.npmjs.com/package/prosemirror-transform)   |
| `@prosekit/pm/commands`   | [`prosemirror-commands`](https://www.npmjs.com/package/prosemirror-commands)     |
| `@prosekit/pm/keymap`     | [`prosemirror-keymap`](https://www.npmjs.com/package/prosemirror-keymap)         |
| `@prosekit/pm/inputrules` | [`prosemirror-inputrules`](https://www.npmjs.com/package/prosemirror-inputrules) |

For example, to import `Schema` from `prosemirror-model`:

```ts
import { Schema } from '@prosekit/pm/model'
```

> **Note:** This package is bundled into the main [`prosekit`](https://www.npmjs.com/package/prosekit) package, where the same modules are available as `prosekit/pm/*`.

## Documentation

See the [`prosekit/pm` reference](https://prosekit.dev/references/pm) on [prosekit.dev](https://prosekit.dev).

## License

[MIT](https://github.com/prosekit/prosekit/blob/master/LICENSE)
