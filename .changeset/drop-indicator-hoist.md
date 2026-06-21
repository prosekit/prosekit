---
'prosekit': patch
"@prosekit/web": patch
---

Fix the drop indicator being mispositioned when an ancestor (such as a virtualized list item using `transform`) establishes a containing block for fixed-positioned descendants. The indicator now resolves its position with Floating UI relative to its offset parent, the same way the table drop indicator does.
