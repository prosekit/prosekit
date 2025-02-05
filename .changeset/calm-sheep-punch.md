---
'@prosekit/basic': patch
'@prosekit/extensions': patch
---

`defineCodeBlockShiki()` now adds two CSS variables to code blocks:

- `--prosemirror-highlight`: sets text color
- `--prosemirror-highlight-bg`: sets background color

These colors are based on the Shiki theme. The typography styles in
`prosekit/basic/typography.css` now use these variables to set the text color
and background color of code blocks.
