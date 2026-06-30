---
"@prosekit/web": minor
"prosekit": minor
---

`AutocompleteRoot` now preserves the casing and punctuation of the autocomplete query. `defaultQueryBuilder` reads the query from the first capturing group of your `regex` (the empty string when an optional group is absent, e.g. a bare `[[` or `@`), or the whole match when the regex has no group, and only trims it. Case-insensitive matching still happens in the item filter (`defaultItemFilter`), so built-in filtering is unchanged, but the query exposed via the `queryChange` event now keeps what the user typed.

This is a behavior change for hosts that read `queryChange` directly and relied on the old lowercased, punctuation-stripped query. If your `regex` has no capturing group, add one around the query (e.g. `/#([\da-z]*)$/i`) so the trigger character is not included in the query.
