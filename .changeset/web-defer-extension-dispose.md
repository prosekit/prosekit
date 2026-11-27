---
"@prosekit/web": patch
"prosekit": patch
---

Removing a web component from the DOM no longer updates the editor view synchronously inside `disconnectedCallback`. The component's editor extensions are now removed in the next task.
