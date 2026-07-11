---
"@prosekit/extensions": patch
"prosekit": patch
"prosekit-registry": patch
---

Construct lookbehind trigger expressions with `new RegExp` so that modules still parse on engines without lookbehind support. The matched expressions are unchanged.
