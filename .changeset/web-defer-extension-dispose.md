---
"@prosekit/web": patch
"prosekit": patch
---

Defer adding and removing editor extensions in web components to the next task. Removing a web component from the DOM no longer updates the editor view synchronously inside `disconnectedCallback`.
