---
"@prosekit/core": patch
"prosekit": patch
---

`expandMark` now stops at a neighbouring mark that differs in attributes, so expanding over a link no longer swallows an adjacent link with a different `href`.
