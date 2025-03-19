---
'@prosekit/extensions': patch
---

Mark input rules won't fire inside `code` marks by default. `defineMarkInputRule` now has an `inCodeMark` option to control this behavior.
