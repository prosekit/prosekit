---
"@prosekit/core": minor
"prosekit": minor
---

Add `createNodeBuilders` and `createMarkBuilders`, which turn a schema into typed node and mark factory functions without needing an editor instance. They behave like `editor.nodes` and `editor.marks` but omit `isActive`, so they are convenient for building documents in tests or on the server.
