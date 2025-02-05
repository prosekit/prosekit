---
'prosekit': patch
'@prosekit/basic': patch
'@prosekit/extensions': patch
---

`defineCodeBlockShiki()` now sets two CSS variables:

- `--prosemirror-highlight`: sets text color
- `--prosemirror-highlight-bg`: sets background color

These colors are based on the Shiki theme you pass to `defineCodeBlockShiki()`.
The typography styles in `prosekit/basic/typography.css` now use these variables
to set the text color and background color of code blocks.
