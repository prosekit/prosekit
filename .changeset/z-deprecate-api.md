---
"@prosekit/core": minor
"prosekit": minor
---

Remove some deprecated APIs from `prosekit/core`.

**Removed functions:**

- `defineDoc()` - Use `import { defineDoc } from 'prosekit/extensions/doc'` instead
- `defineText()` - Use `import { defineText } from 'prosekit/extensions/text'` instead
- `defineParagraph()` - Use `import { defineParagraph } from 'prosekit/extensions/paragraph'` instead
- `collectChildren()` - Use `node.children` or `fragment.content` instead
- `collectNodes()` - Use `node.children` or `fragment.content` instead

**Removed options:**

- `EditorOptions.defaultDoc` - Use `defaultContent` instead
- `EditorOptions.defaultHTML` - Use `defaultContent` instead
- `WrapOptions.nodeType` - Use `type` instead
- `CommandAction.canApply()` - Use `canExec()` instead
