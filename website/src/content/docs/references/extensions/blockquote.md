---
title: prosekit/extensions/blockquote
sidebar:
  label: extensions/blockquote
---


## BlockquoteCommandsExtension {#blockquote-commands-extension}

**Type**: `Extension<{ Commands: { insertBlockquote: []; setBlockquote: []; toggleBlockquote: [] } }>`

## BlockquoteSpecExtension {#blockquote-spec-extension}

**Type**: `Extension<{ Nodes: { blockquote: Attrs } }>`

## defineBlockquote {#define-blockquote}

```ts
function defineBlockquote(): BlockquoteExtension
```

## defineBlockquoteInputRule {#define-blockquote-input-rule}

```ts
function defineBlockquoteInputRule(): PlainExtension
```

Wraps the text block in a blockquote when `>` is typed at the start of a new
line followed by a space.

## defineBlockquoteSpec {#define-blockquote-spec}

```ts
function defineBlockquoteSpec(): BlockquoteSpecExtension
```
