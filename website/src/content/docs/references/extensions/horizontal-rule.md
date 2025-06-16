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

<!-- DEBUG inheritance start kind=2097152 -->

***

### HorizontalRuleExtension {#horizontalruleextension}

```ts
type HorizontalRuleExtension = Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>;
```

<!-- DEBUG inheritance start kind=2097152 -->

***

### HorizontalRuleSpecExtension {#horizontalrulespecextension}

```ts
type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
     horizontalRule: Attrs;
  };
}>;
```

<!-- DEBUG inheritance start kind=2097152 -->

## Functions

### defineHorizontalRule() {#definehorizontalrule}

```ts
function defineHorizontalRule(): HorizontalRuleExtension;
```

#### Returns

[`HorizontalRuleExtension`](#horizontalruleextension)

<!-- DEBUG inheritance start kind=4096 -->

***

### defineHorizontalRuleCommands() {#definehorizontalrulecommands}

```ts
function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension;
```

#### Returns

[`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)

<!-- DEBUG inheritance start kind=4096 -->

***

### defineHorizontalRuleInputRule() {#definehorizontalruleinputrule}

```ts
function defineHorizontalRuleInputRule(): PlainExtension;
```

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineHorizontalRuleSpec() {#definehorizontalrulespec}

```ts
function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension;
```

#### Returns

[`HorizontalRuleSpecExtension`](#horizontalrulespecextension)

<!-- DEBUG inheritance start kind=4096 -->

***

### insertHorizontalRule() {#inserthorizontalrule}

```ts
function insertHorizontalRule(): Command;
```

Returns a command that inserts a horizontal rule at the current selection.

#### Returns

[`Command`](../pm/state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
