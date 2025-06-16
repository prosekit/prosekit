---
title: prosekit/extensions/enter-rule
sidebar:
  label: extensions/enter-rule
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### EnterRuleHandlerOptions {#enterrulehandleroptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [EnterRuleHandler](#enterrulehandler).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="from"></a> `from`

</td>
<td>

`number`

</td>
<td>

The start position of the matched text.

</td>
</tr>
<tr>
<td>

<a id="match"></a> `match`

</td>
<td>

`RegExpExecArray`

</td>
<td>

The matched result from the regular expression.

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state`

</td>
<td>

[`EditorState`](../pm/state.md#editorstate)

</td>
<td>

The current editor state.

</td>
</tr>
<tr>
<td>

<a id="to"></a> `to`

</td>
<td>

`number`

</td>
<td>

The end position of the matched text.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### TextBlockEnterRuleOptions {#textblockenterruleoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineTextBlockEnterRule](#definetextblockenterrule).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs"></a> `attrs?`

</td>
<td>

 \| `null` \| [`Attrs`](../pm/model.md#attrs-5) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-5)

</td>
<td>

Attributes to set on the node. If a function is provided, it will be called
with the matched result from the regular expression.

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex`

</td>
<td>

[`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

</td>
<td>

The regular expression to match against. It should end with `$`.

</td>
</tr>
<tr>
<td>

<a id="stop"></a> `stop?`

</td>
<td>

`boolean`

</td>
<td>

Whether to stop further handlers from being called if this rule is triggered.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

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

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### EnterRuleHandler() {#enterrulehandler}

```ts
type EnterRuleHandler = (options: EnterRuleHandlerOptions) => Transaction | null;
```

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

[`EnterRuleHandlerOptions`](#enterrulehandleroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Transaction`](../pm/state.md#transaction) \| `null`

***

### EnterRuleOptions {#enterruleoptions}

<!-- DEBUG memberWithGroups 1 -->

```ts
type EnterRuleOptions = object;
```

Options for [defineEnterRule](#defineenterrule).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### handler {#handler}

```ts
handler: EnterRuleHandler;
```

A function to be called when an enter rule is triggered.

##### regex {#regex-1}

```ts
regex: RegExp;
```

The regular expression to match against. It should end with `$`.

##### stop? {#stop-1}

```ts
optional stop: boolean;
```

Whether to stop further handlers from being called if this rule is triggered.

###### Default

```ts
false
```

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineEnterRule() {#defineenterrule}

```ts
function defineEnterRule(options: EnterRuleOptions): PlainExtension;
```

Defines an enter rule. An enter rule applies when the text directly in front of
the cursor matches `regex` and user presses Enter. The `regex` should end
with `$`.

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

[`EnterRuleOptions`](#enterruleoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineTextBlockEnterRule() {#definetextblockenterrule}

```ts
function defineTextBlockEnterRule(options: TextBlockEnterRuleOptions): PlainExtension;
```

Defines an enter rule that replaces the matched text with a block node.

See also [defineEnterRule](#defineenterrule).

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

[`TextBlockEnterRuleOptions`](#textblockenterruleoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
