---
title: prosekit/extensions/input-rule
sidebar:
  label: extensions/input-rule
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### MarkInputRuleOptions {#markinputruleoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineMarkInputRule](#definemarkinputrule).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs}

```ts
optional attrs: 
  | null
  | Attrs
  | (match: RegExpMatchArray) => null | Attrs;
```

Attributes to set on the mark.

##### inCodeMark? {#incodemark}

```ts
optional inCodeMark: boolean;
```

Whether this rule should fire inside marks marked as [code](https://prosemirror.net/docs/ref/#model.MarkSpec.code).

###### Default

`false`

##### regex {#regex}

```ts
regex: RegExp;
```

The regular expression to match against, which should end with `$` and has
exactly one capture group. All other matched text outside the capture group
will be deleted.

##### type {#type}

```ts
type: string | MarkType;
```

The type of mark to set.

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineInputRule() {#defineinputrule}

```ts
function defineInputRule(rule: InputRule): PlainExtension;
```

Defines an input rule extension.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`rule`

</td>
<td>

[`InputRule`](https://prosemirror.net/docs/ref/#inputrules.InputRule)

</td>
<td>

The ProseMirror input rule to add.

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineMarkInputRule() {#definemarkinputrule}

```ts
function defineMarkInputRule(options: MarkInputRuleOptions): PlainExtension;
```

Defines an input rule for automatically adding inline marks when a given
pattern is typed.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`MarkInputRuleOptions`](#markinputruleoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineTextBlockInputRule() {#definetextblockinputrule}

```ts
function defineTextBlockInputRule(options: object): PlainExtension;
```

Defines an input rule that changes the type of a textblock when the matched
text is typed into it.

See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

\{ `attrs?`: \| `null` \| [`Attrs`](../pm/model.md#attrs-7) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-7); `regex`: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); `type`: `string` \| [`NodeType`](../pm/model.md#nodetype); \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.attrs?`

</td>
<td>

 \| `null` \| [`Attrs`](../pm/model.md#attrs-7) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-7)

</td>
<td>

Attributes to set on the node.

</td>
</tr>
<tr>
<td>

`options.regex`

</td>
<td>

[`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

</td>
<td>

The regular expression to match against, which should end with `$`. It
usually also starts with `^` to that it is only matched at the start of a
textblock.

</td>
</tr>
<tr>
<td>

`options.type`

</td>
<td>

`string` \| [`NodeType`](../pm/model.md#nodetype)

</td>
<td>

The node type to replace the matched text with.

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineWrappingInputRule() {#definewrappinginputrule}

```ts
function defineWrappingInputRule(options: object): PlainExtension;
```

Defines an input rule for automatically wrapping a textblock when a given
string is typed.

See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

\{ `attrs?`: \| `null` \| [`Attrs`](../pm/model.md#attrs-7) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-7); `join?`: (`match`: `RegExpMatchArray`, `node`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode)) => `boolean`; `regex`: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); `type`: `string` \| [`NodeType`](../pm/model.md#nodetype); \}

</td>
<td>

</td>
</tr>
<tr>
<td>

`options.attrs?`

</td>
<td>

 \| `null` \| [`Attrs`](../pm/model.md#attrs-7) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-7)

</td>
<td>

Attributes to set on the node.

</td>
</tr>
<tr>
<td>

`options.join?`

</td>
<td>

(`match`: `RegExpMatchArray`, `node`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode)) => `boolean`

</td>
<td>

By default, if there's a node with the same type above the newly wrapped
node, the rule will try to
[join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
two nodes. You can pass a join predicate, which takes a regular expression
match and the node before the wrapped node, and can return a boolean to
indicate whether a join should happen.

</td>
</tr>
<tr>
<td>

`options.regex`

</td>
<td>

[`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

</td>
<td>

The regular expression to match against, which should end with `$`. It
usually also starts with `^` to that it is only matched at the start of a
textblock.

</td>
</tr>
<tr>
<td>

`options.type`

</td>
<td>

`string` \| [`NodeType`](../pm/model.md#nodetype)

</td>
<td>

The type of node to wrap in.

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
