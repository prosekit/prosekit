---
"@prosekit/web": minor
"@prosekit/react": minor
"@prosekit/preact": minor
"@prosekit/solid": minor
"@prosekit/vue": minor
"@prosekit/svelte": minor
"prosekit": minor
---

Add a `queryBuilder` prop to `AutocompleteRoot` to control the query built from the regex match. The default no longer lowercases or strips punctuation, so `queryChange` gives you the text the user typed.
