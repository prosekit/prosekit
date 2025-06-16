---
title: prosekit/extensions/blockquote
sidebar:
  label: extensions/blockquote
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Type Aliases

### BlockquoteCommandsExtension {#blockquotecommandsextension}

```ts
type BlockquoteCommandsExtension = Extension<{
  Commands: {
     insertBlockquote: [];
     setBlockquote: [];
     toggleBlockquote: [];
  };
}>;
```

<!-- DEBUG inheritance start kind=2097152 -->

***

### BlockquoteSpecExtension {#blockquotespecextension}

```ts
type BlockquoteSpecExtension = Extension<{
  Nodes: {
     blockquote: Attrs;
  };
}>;
```

<!-- DEBUG inheritance start kind=2097152 -->

## Functions

### defineBlockquote() {#defineblockquote}

```ts
function defineBlockquote(): BlockquoteExtension;
```

#### Returns

`BlockquoteExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineBlockquoteInputRule() {#defineblockquoteinputrule}

```ts
function defineBlockquoteInputRule(): PlainExtension;
```

Wraps the text block in a blockquote when `>` is typed at the start of a new
line followed by a space.

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineBlockquoteSpec() {#defineblockquotespec}

```ts
function defineBlockquoteSpec(): BlockquoteSpecExtension;
```

#### Returns

[`BlockquoteSpecExtension`](#blockquotespecextension)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
