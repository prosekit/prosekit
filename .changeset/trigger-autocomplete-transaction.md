---
"@prosekit/extensions": minor
"prosekit": minor
---

Change `triggerAutocomplete` to accept and return a transaction (`(tr: Transaction) => Transaction`) instead of returning a command. Tag your own transaction with it to open the autocomplete menu after inserting the trigger text, avoiding a second nested command dispatch.
