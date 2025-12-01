---
"prosekit": minor
"@prosekit/extensions": minor
"@prosekit/basic": minor
---

The `prosekit/extensions/autocomplete` package now automatically adds the `prosekit-autocomplete-match` class and `data-autocomplete-match-text` attribute to matched autocomplete text segments. The attribute contains the full matched text.

The `prosekit/basic/typography.css` stylesheet provides default styling for `.prosekit-autocomplete-match`, highlighting matched text with a light gray background. You can customize this highlight color by setting the `--prosekit-autocomplete-color` CSS variable.

