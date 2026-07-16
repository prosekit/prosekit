---
"prosekit": patch
"@prosekit/extensions": patch
"prosekit-registry": patch
---

Clear virtual-selection decorations before primary pointer focus so the browser can place the selection without a decoration DOM update race. Add a reproduction demo for editable nested node views.
