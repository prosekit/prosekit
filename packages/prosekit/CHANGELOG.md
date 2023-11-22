# prosekit

## 0.1.7

### Patch Changes

- [0c60503] ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444)

  Fix a bug where a plugin can be added multiple times to the same editor.

- [0c60503] ![@prosekit/extensions](https://img.shields.io/badge/prosekit%2Fextensions-444444)

  Add new readonly extension.

  ```ts
  import { defineReadonly } from 'prosekit/extensions/readonly'

  const extension = defineReadonly()
  ```

- [0c60503] ![@prosekit/preact](https://img.shields.io/badge/prosekit%2Fpreact-444444?logo=preact) ![@prosekit/svelte](https://img.shields.io/badge/prosekit%2Fsvelte-444444?logo=svelte) ![@prosekit/react](https://img.shields.io/badge/prosekit%2Freact-444444?logo=react) ![@prosekit/solid](https://img.shields.io/badge/prosekit%2Fsolid-444444?logo=solid) ![@prosekit/vue](https://img.shields.io/badge/prosekit%2Fvue-444444?logo=vuedotjs)

  `useExtension` now accepts a null value for the `extension` argument. This is
  useful if you want to remove an extension from the editor.

## 0.1.6

### Patch Changes

- [390d324] ![prosekit](https://img.shields.io/badge/prosekit-444444)

  Fix bundled `.d.ts` files.

## 0.1.5

### Patch Changes

- [e523df5] ![@prosekit/lit](https://img.shields.io/badge/prosekit%2Flit-444444?logo=lit)

  Improve the position strategy of the autocomplete popover, and fix the flash of the popover when it is opened.

- [e523df5] ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444)

  The `insertNode` command will place the text selection into the inserted node.

- [e523df5] ![@prosekit/extensions](https://img.shields.io/badge/prosekit%2Fextensions-444444)

  Add `insertList` command.

## 0.1.4

### Patch Changes

- [6f70509] ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444)

  Fix `insertNode` command.

- [a58fc69] ![@prosekit/lit](https://img.shields.io/badge/prosekit%2Flit-444444?logo=lit)

  Only display the inline popover when current selection is `TextSelection` or `NodeSelection`. Particularly, when the selection is `AllSelection`, the inline popover should not be displayed.

## 0.1.3

### Patch Changes

- [404ffff] ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444)

  Call all update handlers after mounting.

## 0.1.2

### Patch Changes

- [8521070] ![@prosekit/solid](https://img.shields.io/badge/prosekit%2Fsolid-444444?logo=solid)

  Fix an issue that caused the function properties not to work in the Solid components.

## 0.1.1

### Patch Changes

- [9cb333b] ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444)

  Add `nodeFromJSON` and `stateFromJSON`.

## 0.1.0

### Minor Changes

- [052d7fd] ![@prosekit/basic](https://img.shields.io/badge/prosekit%2Fbasic-444444) ![@prosekit/core](https://img.shields.io/badge/prosekit%2Fcore-444444) ![@prosekit/extensions](https://img.shields.io/badge/prosekit%2Fextensions-444444) ![@prosekit/lit](https://img.shields.io/badge/prosekit%2Flit-444444?logo=lit) ![@prosekit/pm](https://img.shields.io/badge/prosekit%2Fpm-444444) ![@prosekit/preact](https://img.shields.io/badge/prosekit%2Fpreact-444444?logo=preact) ![@prosekit/react](https://img.shields.io/badge/prosekit%2Freact-444444?logo=react) ![@prosekit/solid](https://img.shields.io/badge/prosekit%2Fsolid-444444?logo=solid) ![@prosekit/svelte](https://img.shields.io/badge/prosekit%2Fsvelte-444444?logo=svelte) ![@prosekit/vue](https://img.shields.io/badge/prosekit%2Fvue-444444?logo=vuedotjs)

  Release v0.1.0.
