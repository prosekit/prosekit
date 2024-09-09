# Horizontal Rule

The `horizontalRule` node is used to represent a thematic break in the document, typically rendered as a horizontal line.

<!-- @include: @/examples/horizontalRule.md -->

## Usage

```ts
import { defineHorizontalRule } from 'prosekit/extensions/horizontalRule'

const extension = defineHorizontalRule()
```

## Commands

### insertHorizontalRule

```ts
editor.commands.insertHorizontalRule()
```

## Input Rules

Input three hyphens (---), asterisks (\*\*\* followed by a space or a line break), or underscores (\_\_\_ followed by a space or a line break) on an empty line , and it will automatically convert to a `horizontalRule` node.

## API Reference

- [prosekit/extensions/horizontal-rule](/references/extensions/horizontal-rule)
