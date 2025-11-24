---
'prosekit': minor
"@prosekit/core": minor
---

- `defineBaseCommands` adds a new `selectBlock` command function that expands the text selection to cover the current block node. If the selection spans multiple blocks, it selects all blocks in the selection.

- `defineBaseKeymap`'s behavior for `Ctrl-A` (Windows/Linux) and `Command-A` (Mac) changes: The first press now selects the current block that the cursor is in, and a second press selects the entire document. This is similar to the behavior of Notion.

- To recover the previous behavior where `Mod-a` immediately selects the entire document, pass `preferBlockSelection: false` to `defineBaseKeymap({ preferBlockSelection: false })`.
