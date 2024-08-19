---
'@prosekit/core': patch
'prosekit': patch
---

Add new `Editor.exec()` and `Editor.canExec()` methods to allow executing ambiguous commands without registering them via `defineCommand()`.

Rename `CommandAction.canApply()` to `CommandAction.canExec()` to better reflect its purpose.
