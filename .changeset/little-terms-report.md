---
"prosekit": minor
"@prosekit/core": minor
---

Add a new `selectBlock()` command and update the keybinding behavior of `Mod-a` (`Ctrl-A` on Windows/Linux, `Command-A` on Mac).

The `defineBaseCommands()` extension now includes a `selectBlock()` command that expands the text selection to cover the current block node. If the selection spans multiple blocks, it selects all blocks in the selection.

The `defineBaseKeymap()` extension now changes the behavior of `Mod-a`: the first press selects the current block that the cursor is in, and a second press selects the entire document. This is similar to the behavior of Notion.

To recover the previous behavior where `Mod-a` immediately selects the entire document, pass `preferBlockSelection: false` when calling `defineBaseKeymap`:

```ts
defineBaseKeymap({ preferBlockSelection: false });
```
