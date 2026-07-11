---
"@prosekit/extensions": minor
"@prosekit/web": minor
"@prosekit/react": minor
"@prosekit/preact": minor
"@prosekit/solid": minor
"@prosekit/vue": minor
"@prosekit/svelte": minor
"prosekit": minor
---

Add a `followCursor` option to `AutocompleteRule` and a matching `AutocompleteRoot` prop that keep the match end anchored to the text cursor, so cursor movement grows and shrinks the query over existing text instead of dismissing the match.
