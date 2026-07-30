---
"@prosekit/core": patch
"@prosekit/web": patch
"prosekit": patch
---

Ignore keydown events that belong to an IME composition in the `AutocompleteRoot` keyboard bridge, including the committing Enter that WebKit fires right after `compositionend`, so it commits the composition instead of confirming the highlighted menu item.
