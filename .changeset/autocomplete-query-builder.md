---
"@prosekit/web": minor
"@prosekit/react": minor
"@prosekit/preact": minor
"@prosekit/solid": minor
"@prosekit/vue": minor
"@prosekit/svelte": minor
"prosekit": minor
---

Add a `queryBuilder` prop to `AutocompleteRoot`. It builds the query string from the regex match found before the cursor, letting you control the query exposed via the `queryChange` event (and used by the built-in item filter). The default still lowercases the match and strips punctuation; provide a custom builder to preserve the casing and punctuation the user typed. The `defaultQueryBuilder` helper and the `QueryBuilder` type are now exported so you can compose with the default.
