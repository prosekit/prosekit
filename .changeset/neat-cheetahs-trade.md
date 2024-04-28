---
'@prosekit/core': patch
'prosekit': patch
---

Do not use const enums. This resolves the "Cannot access ambient const enums when 'isolatedModules' is enabled" error for the downstream TypeScript projects.
