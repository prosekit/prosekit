---
"@prosekit/extensions": minor
"prosekit": minor
---

Export `TextBlockInputRuleOptions` and `WrappingInputRuleOptions`, the option types of `defineTextBlockInputRule` and `defineWrappingInputRule`. Every built-in input rule now also exposes its rule definition (for example `headingInputRule`) next to its `define*InputRule` function, so a consumer can reuse the same pattern and attributes in a custom rule.
