---
title: prosekit/extensions/horizontal-rule
sidebar:
  label: extensions/horizontal-rule
---


## HorizontalRuleCommandsExtension {#horizontal-rule-commands-extension}

**Type**: `Extension<{ Commands: { insertHorizontalRule: [] } }>`

## HorizontalRuleExtension {#horizontal-rule-extension}

**Type**: `Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>`

## HorizontalRuleSpecExtension {#horizontal-rule-spec-extension}

**Type**: `Extension<{ Nodes: { horizontalRule: Attrs } }>`

## defineHorizontalRule {#define-horizontal-rule}

```ts
function defineHorizontalRule(): HorizontalRuleExtension
```

## defineHorizontalRuleCommands {#define-horizontal-rule-commands}

```ts
function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension
```

## defineHorizontalRuleInputRule {#define-horizontal-rule-input-rule}

```ts
function defineHorizontalRuleInputRule(): PlainExtension
```

## defineHorizontalRuleSpec {#define-horizontal-rule-spec}

```ts
function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension
```

## insertHorizontalRule {#insert-horizontal-rule}

```ts
function insertHorizontalRule(): Command
```

Returns a command that inserts a horizontal rule at the current selection.
