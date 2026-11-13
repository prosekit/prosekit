---
"@prosekit/extensions": patch
"prosekit": patch
---

Fix the blockquote input rule so it only fires when `> ` is typed at the start of a text block. In a text block longer than 500 characters, typing could previously wrap the block in a blockquote and delete the previous character whenever `> ` happened to sit 500 characters before the cursor.
