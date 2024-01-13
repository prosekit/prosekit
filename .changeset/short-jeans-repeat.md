---
'prosekit': patch
'@prosekit/preact': patch
'@prosekit/svelte': patch
'@prosekit/react': patch
'@prosekit/solid': patch
'@prosekit/vue': patch
---

`useEditor({ update: true })` now will update the component when the editor view is mounted. This is useful for the first render of the editor.
