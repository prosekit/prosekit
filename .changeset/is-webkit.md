---
"@prosekit/core": patch
"prosekit": patch
---

Add `isWebKit`, which detects Apple's WebKit engine via `navigator.vendor`, matching the check `prosemirror-view` uses for its Safari-specific code paths.
