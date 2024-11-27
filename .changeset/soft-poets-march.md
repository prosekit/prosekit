---
'@prosekit/extensions': patch
---
`definePlaceholder()` now accepts a strategy function that gives more control over when the placeholder should be shown.

Don't show the placeholder when the text cursor is in a table node by default.
