---
"@prosekit/extensions": minor
"prosekit": minor
---

Add a `strict` option to `defineList`, `defineListKeymap` and `defineListCommands`. In strict mode a list node is never more than one level deeper than the block before it, so no list node ends up with a hidden marker: Tab on the first item of a list does nothing, and Shift-Tab moves a nested item and the items after it up together. The option is off by default.

Add `createListKeymap(options)`, which returns the list key bindings as a plain object.
