---
"@prosekit/core": minor
"prosekit": minor
"@prosekit/extensions": patch
---

PR_REVIEW: update `minor` to `patch` 

Move the paste rule API into `@prosekit/core`. `definePasteRule` and `defineMarkPasteRule` are now exported from `@prosekit/core` and `prosekit/core`. The existing `@prosekit/extensions/paste-rule` entry point continues to work as a re-export for backward compatibility.
