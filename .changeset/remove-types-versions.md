---
"@prosekit/basic": patch
"@prosekit/core": patch
"@prosekit/extensions": patch
"@prosekit/lit": patch
"@prosekit/pm": patch
"@prosekit/preact": patch
"prosekit": patch
"@prosekit/react": patch
"@prosekit/solid": patch
"@prosekit/svelte": patch
"@prosekit/vue": patch
"@prosekit/web": patch
---

Remove the redundant `typesVersions` field from the published `package.json` files. TypeScript resolves type declarations from the `exports` field, so this field is no longer needed.
