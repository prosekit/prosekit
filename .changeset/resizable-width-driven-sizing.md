---
"@prosekit/web": patch
---

Fix `<prosekit-resizable-root>` collapsing portrait images (aspect ratio `< 1`) in WebKit. When a width is known, the box is now driven by that width (`height: auto`) in both orientations, instead of switching portrait images to `width: min-content`, which relied on the CSS aspect-ratio transferred size that WebKit does not resolve.
