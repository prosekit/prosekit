---
'@prosekit/basic': patch
'@prosekit/extensions': patch
---

`defineCodeBlockShiki()` now sets two CSS variables `--prosemirror-highlight`
and `--prosemirror-highlight-bg` to the code block elements. They represent
the text color and background color of the code block respectively based on the
Shiki theme.

`prosekit/basic/typography.css` has been updated to use these CSS variables
to set the text color and background color of the code block elements.
