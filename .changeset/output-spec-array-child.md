---
"@prosekit/core": patch
"prosekit": patch
---

Fix `defineNodeAttr` and `defineMarkAttr` when `toDOM` returns an array spec whose second element is a child spec, such as `['table', ['tbody', 0]]`. The child is no longer treated as an attrs object.
