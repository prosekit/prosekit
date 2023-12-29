---
'@prosekit/extensions': patch
'@prosekit/core': patch
'prosekit': patch
---

Add a new entry point `prosekit/extensions/input-rule` for the input rule
extension. This entry point exports better APIs for creating input rules. The
old entry point `defineInputRule` from `prosekit/core` is deprecated now and
will be removed in the next minor version.
