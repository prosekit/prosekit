# prosekit/extensions/input-rule

## MarkInputRuleOptions {#mark-input-rule-options}

Options for [defineMarkInputRule](input-rule.md#define-mark-input-rule).

<dl>

<dt>

`attrs`

</dt>

<dd>

Attributes to set on the mark.

**Type**: `null | Attrs | ((match: RegExpMatchArray) => null | Attrs)`

</dd>

<dt>

`regex`

</dt>

<dd>

The regular expression to match against, which should end with `$` and has
exactly one capture group. All other matched text outside the capture group
will be deleted.

**Type**: `RegExp`

</dd>

<dt>

`type`

</dt>

<dd>

The type of mark to set.

**Type**: `string | MarkType`

</dd>

</dl>

## defineInputRule {#define-input-rule}

```ts
function defineInputRule(rule: InputRule): PlainExtension
```

Defines an input rule extension.

## defineMarkInputRule {#define-mark-input-rule}

```ts
function defineMarkInputRule(options: MarkInputRuleOptions): PlainExtension
```

Defines an input rule for automatically adding inline marks when a given
pattern is typed.

## defineTextBlockInputRule {#define-text-block-input-rule}

```ts
function defineTextBlockInputRule(options: { attrs?: null | Attrs | ((match: RegExpMatchArray) => null | Attrs); regex: RegExp; type: string | NodeType }): PlainExtension
```

Defines an input rule that changes the type of a textblock when the matched
text is typed into it.

See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)

## defineWrappingInputRule {#define-wrapping-input-rule}

```ts
function defineWrappingInputRule(options: { attrs?: null | Attrs | ((match: RegExpMatchArray) => null | Attrs); join?: (match: RegExpMatchArray, node: Node) => boolean; regex: RegExp; type: string | NodeType }): PlainExtension
```

Defines an input rule for automatically wrapping a textblock when a given
string is typed.

See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)
