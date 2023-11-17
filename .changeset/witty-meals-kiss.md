---
'@prosekit/lit': patch
---

Only display the inline popover when current selection is `TextSelection` or `NodeSelection`. Particularly, when the selection is `AllSelection`, the inline popover should not be displayed.
