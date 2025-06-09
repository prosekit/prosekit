---
title: prosekit/extensions/enter-rule
sidebar:
  label: extensions/enter-rule
---


## EnterRuleHandler {#enter-rule-handler}

**Type**: `(options: { from: number; match: RegExpExecArray; state: EditorState; to: number }) => Transaction | null`

## EnterRuleOptions {#enter-rule-options}

Options for [defineEnterRule](enter-rule.md#define-enter-rule).

**Type**: `{ handler: EnterRuleHandler; regex: RegExp; stop?: boolean }`

## TextBlockEnterRuleOptions {#text-block-enter-rule-options}

Options for [defineTextBlockEnterRule](enter-rule.md#define-text-block-enter-rule).

**Type**: `{ attrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null); regex: RegExp; stop?: boolean; type: string | NodeType }`

## defineEnterRule {#define-enter-rule}

```ts
function defineEnterRule(options: EnterRuleOptions): PlainExtension
```

Defines an enter rule. An enter rule applies when the text directly in front of
the cursor matches `regex` and user presses Enter. The `regex` should end
with `$`.

## defineTextBlockEnterRule {#define-text-block-enter-rule}

```ts
function defineTextBlockEnterRule(options: TextBlockEnterRuleOptions): PlainExtension
```

Defines an enter rule that replaces the matched text with a block node.

See also [defineEnterRule](enter-rule.md#define-enter-rule).
