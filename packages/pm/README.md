# @prosekit/pm

This package provides a convenient way to install all the core ProseMirror packages at once. It simply re-exports the following packages:

| Entry points              | Package                                                                          |
| ------------------------- | -------------------------------------------------------------------------------- |
| `@prosekit/pm/model`      | [`prosemirror-model`](https://www.npmjs.com/package/prosemirror-model)           |
| `@prosekit/pm/state`      | [`prosemirror-state`](https://www.npmjs.com/package/prosemirror-state)           |
| `@prosekit/pm/view`       | [`prosemirror-view`](https://www.npmjs.com/package/prosemirror-view)             |
| `@prosekit/pm/transform`  | [`prosemirror-transform`](https://www.npmjs.com/package/prosemirror-transform)   |
| `@prosekit/pm/commands`   | [`prosemirror-commands`](https://www.npmjs.com/package/prosemirror-commands)     |
| `@prosekit/pm/keymap`     | [`prosemirror-keymap`](https://www.npmjs.com/package/prosemirror-keymap)         |
| `@prosekit/pm/inputrules` | [`prosemirror-inputrules`](https://www.npmjs.com/package/prosemirror-inputrules) |

You can import the individual packages using the entry points listed above. For example, to import the `Schema` from `prosemirror-model` package, you can do:

```js
import { Schema } from '@prosekit/pm/model'
```
