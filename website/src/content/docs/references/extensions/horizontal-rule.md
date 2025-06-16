---
title: prosekit/extensions/horizontal-rule
sidebar:
  label: extensions/horizontal-rule
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Type Aliases

### HorizontalRuleCommandsExtension {#horizontalrulecommandsextension}

```ts
type HorizontalRuleCommandsExtension = Extension<{
  Commands: {
     insertHorizontalRule: [];
  };
}>;
```

***

### HorizontalRuleExtension {#horizontalruleextension}

```ts
type HorizontalRuleExtension = Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>;
```

***

### HorizontalRuleSpecExtension {#horizontalrulespecextension}

```ts
type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
     horizontalRule: Attrs;
  };
}>;
```

## Functions

### defineHorizontalRule() {#definehorizontalrule}

```ts
function defineHorizontalRule(): HorizontalRuleExtension;
```

#### Returns

[`HorizontalRuleExtension`](#horizontalruleextension)

***

### defineHorizontalRuleCommands() {#definehorizontalrulecommands}

```ts
function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension;
```

#### Returns

[`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)

***

### defineHorizontalRuleInputRule() {#definehorizontalruleinputrule}

```ts
function defineHorizontalRuleInputRule(): PlainExtension;
```

#### Returns

`PlainExtension`

***

### defineHorizontalRuleSpec() {#definehorizontalrulespec}

```ts
function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension;
```

#### Returns

[`HorizontalRuleSpecExtension`](#horizontalrulespecextension)

***

### insertHorizontalRule() {#inserthorizontalrule}

```ts
function insertHorizontalRule(): Command;
```

Returns a command that inserts a horizontal rule at the current selection.

#### Returns

[`Command`](../pm/state.md#command)

<!-- DEBUG memberWithGroups 10 -->
