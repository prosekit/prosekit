---
'prosekit': patch
'@prosekit/extensions': patch
---

Guard the `---` horizontal rule input rule against parents that cannot hold a horizontal rule. Previously, typing `---` in an inline-only container (such as a table cell restricted to a single paragraph) deleted the typed text without inserting anything. The rule now checks `canReplaceWith` first and leaves the text untouched when the parent forbids the node.
