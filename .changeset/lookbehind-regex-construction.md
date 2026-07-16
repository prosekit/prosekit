---
"@prosekit/extensions": patch
"prosekit": patch
---

Construct lookbehind trigger expressions with `new RegExp` so that modules still parse on engines without lookbehind support.
