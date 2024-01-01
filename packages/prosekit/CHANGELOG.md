# prosekit

## 0.2.2

### Patch Changes

- [`1b6744e`](https://github.com/ocavue/prosekit/commit/1b6744e71b329254ce525edcafe058bdb1d8f448) ![][badge-basic]

  Improved `typography.css`. Increased the padding of the `p` element and fix the position of the list checkboxes.

## 0.2.1

### Patch Changes

- [`2d2b700`](https://github.com/ocavue/prosekit/commit/2d2b700e817da7c164ff82aadd83a6de7f145868) ![][badge-basic]

  Unwrap nested CSS rules in `prosekit/basic/typography.css`.

## 0.2.0

### Minor Changes

- [`1124758`](https://github.com/ocavue/prosekit/commit/11247589114943e9e42e7dabed990ea9a50a73cb) ![][badge-basic] ![][badge-core]

  Improve the styling API. Now ProseKit exports two CSS files that you can import to get started.

  ```js
  import "prosekit/basic/style.css";
  import "prosekit/basic/typograph.css";
  ```

### Patch Changes

- [`8fca5fc`](https://github.com/ocavue/prosekit/commit/8fca5fc02b5c836f3e562ac2217dd2c0bbef70bc) ![][badge-extensions] ![][badge-core]

  Remove deprecated API.

## 0.1.15

### Patch Changes

- [`b3c025f`](https://github.com/ocavue/prosekit/commit/b3c025fe5f5533908df44bdae833751dbf9b1ba7) ![][badge-lit]

  Fix a bug where the editor would scroll into view automatically.

## 0.1.14

### Patch Changes

- [`d76c28b`](https://github.com/ocavue/prosekit/commit/d76c28be9597cf6bae33acfad91d804666497e61) ![][badge-core]

  Export `BaseNodeViewOptions` interface. This is useful for defining node views in React, Vue and other frameworks.

## 0.1.13

### Patch Changes

- [`b29e75b`](https://github.com/ocavue/prosekit/commit/b29e75b6566304b3977c8baca4442bb696d5483b) ![][badge-extensions]

  `defineCodeBlockHighlight` is the recommended way to add syntax highlighting to code blocks. The `parser` option for `defineCodeBlock` is deprecated and will be removed in a future version.

## 0.1.12

### Patch Changes

- [`1b04e65`](https://github.com/ocavue/prosekit/commit/1b04e655cfbe942da9914ef790b0a43807c299ad) ![][badge-core]

  Export an internal `_getId()` function.

- [`1b04e65`](https://github.com/ocavue/prosekit/commit/1b04e655cfbe942da9914ef790b0a43807c299ad) ![][badge-react] ![][badge-vue]

  Add react node view and vue node view support.

## 0.1.11

### Patch Changes

- [`281a2e7`](https://github.com/ocavue/prosekit/commit/281a2e71c3daa7f1aa6b56df64f3e143c5faabe9) ![][badge-lit]

  Use the native Popover API to place popover components in the top layer.

- [`4f79f39`](https://github.com/ocavue/prosekit/commit/4f79f3965b6f81b0310635050202ddd32eef4761) ![][badge-lit]

  Fix various interaction issues in the ComboBox component.

- [`4f79f39`](https://github.com/ocavue/prosekit/commit/4f79f3965b6f81b0310635050202ddd32eef4761) ![][badge-extensions]

  Use [prosemirror-highlight] to support syntax highlighting in `codeBlock` nodes.
  The previous `hljs` API is deprecated and will be removed in the future.

  [prosemirror-highlight]: https://github.com/ocavue/prosemirror-highlight

## 0.1.10

### Patch Changes

- [`dac24aa`](https://github.com/ocavue/prosekit/commit/dac24aa342df4226b23eef5731574e081f206b87) ![][badge-pm]

  Update ProseMirror dependencies.

## 0.1.9

### Patch Changes

- [`90f237b`](https://github.com/ocavue/prosekit/commit/90f237bd1517171df3135abbccbc353d18aaad47) ![][badge-extensions]

  Deprecate `prosekit/extensions/suggestion`. Please use `prosekit/extensions/autocomplete` instead.

- [`74cb6e3`](https://github.com/ocavue/prosekit/commit/74cb6e35c95eadb9ea1511f3b402ebf63f5838a7) ![][badge-solid]

  `useKeymap` and `useExtension` now accept Solid accessors.

- [`5d83146`](https://github.com/ocavue/prosekit/commit/5d83146e35c6d9ec5d855a76ddaac43bf6cc6ded) ![][badge-core]

  `defineBaseKeymap` now accepts a `priority` option. By default, the priority is `Priority.low`.

- [`5d83146`](https://github.com/ocavue/prosekit/commit/5d83146e35c6d9ec5d855a76ddaac43bf6cc6ded) ![][badge-preact] !![][badge-svelte] ![][badge-react] ![][badge-solid] ![][badge-vue]

  `useKeymap` now accepts an optional `priority` option.

## 0.1.8

### Patch Changes

- [`6c819f2`](https://github.com/ocavue/prosekit/commit/6c819f2) ![][badge-lit]

  Fix a bug where hovering mouse over an autocomplete item would cause the autocomplete list to scroll.

- [`01b6549`](https://github.com/ocavue/prosekit/commit/01b6549) ![][badge-extensions]

  Add `insertMention` command.

- [`d4061d4`](https://github.com/ocavue/prosekit/commit/d4061d4) ![][badge-core]

  Try to set the selection after the inserted node when calling the `insertNode` command.

## 0.1.7

### Patch Changes

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![][badge-core]

  Fix a bug where a plugin can be added multiple times to the same editor.

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![][badge-extensions]

  Add new readonly extension.

  ```ts
  import { defineReadonly } from "prosekit/extensions/readonly";

  const extension = defineReadonly();
  ```

- [`0c60503`](https://github.com/ocavue/prosekit/commit/0c60503) ![][badge-preact] !![][badge-svelte] ![][badge-react] ![][badge-solid] ![][badge-vue]

  `useExtension` now accepts a null value for the `extension` argument. This is
  useful if you want to remove an extension from the editor.

## 0.1.6

### Patch Changes

- [`390d324`](https://github.com/ocavue/prosekit/commit/390d324) ![][badge-prosekit]

  Fix bundled `.d.ts` files.

## 0.1.5

### Patch Changes

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![][badge-lit]

  Improve the position strategy of the autocomplete popover, and fix the flash of the popover when it is opened.

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![][badge-core]

  The `insertNode` command will place the text selection into the inserted node.

- [`e523df5`](https://github.com/ocavue/prosekit/commit/e523df5) ![][badge-extensions]

  Add `insertList` command.

## 0.1.4

### Patch Changes

- [`6f70509`](https://github.com/ocavue/prosekit/commit/6f70509) ![][badge-core]

  Fix `insertNode` command.

- [`a58fc69`](https://github.com/ocavue/prosekit/commit/a58fc69) ![][badge-lit]

  Only display the inline popover when current selection is `TextSelection` or `NodeSelection`. Particularly, when the selection is `AllSelection`, the inline popover should not be displayed.

## 0.1.3

### Patch Changes

- [`404ffff`](https://github.com/ocavue/prosekit/commit/404ffff) ![][badge-core]

  Call all update handlers after mounting.

## 0.1.2

### Patch Changes

- [`8521070`](https://github.com/ocavue/prosekit/commit/8521070) ![][badge-solid]

  Fix an issue that caused the function properties not to work in the Solid components.

## 0.1.1

### Patch Changes

- [`9cb333b`](https://github.com/ocavue/prosekit/commit/9cb333b) ![][badge-core]

  Add `nodeFromJSON` and `stateFromJSON`.

## 0.1.0

### Minor Changes

- [`052d7fd`](https://github.com/ocavue/prosekit/commit/052d7fd) ![][badge-basic] ![][badge-core] ![][badge-extensions] ![][badge-lit] ![][badge-pm] ![][badge-preact] ![][badge-react] ![][badge-solid] !![][badge-svelte] ![][badge-vue]

  Release v0.1.0.

<!-- https://shields.io/docs/logos -->
[badge-prosekit]: https://img.shields.io/badge/prosekit-444444
[badge-pm]: https://img.shields.io/badge/prosekit%2Fpm-444444
[badge-core]: https://img.shields.io/badge/prosekit%2Fcore-444444
[badge-basic]: https://img.shields.io/badge/prosekit%2Fbasic-444444
[badge-extensions]: https://img.shields.io/badge/prosekit%2Fextensions-444444
[badge-lit]: https://img.shields.io/badge/prosekit%2Flit-444444?logo=lit
[badge-vue]: https://img.shields.io/badge/prosekit%2Fvue-444444?logo=vuedotjs
[badge-solid]: https://img.shields.io/badge/prosekit%2Fsolid-444444?logo=solid
[badge-react]: https://img.shields.io/badge/prosekit%2Freact-444444?logo=react
[badge-preact]: https://img.shields.io/badge/prosekit%2Fpreact-444444?logo=preact
[badge-svelte]: https://img.shields.io/badge/prosekit%2Fsvelte-444444?logo=svelte
