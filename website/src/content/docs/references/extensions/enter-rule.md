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

##### from {#from}

```ts
from: number;
```

The start position of the matched text.

##### match {#match}

```ts
match: RegExpExecArray;
```

The matched result from the regular expression.

##### state {#state}

```ts
state: EditorState;
```

The current editor state.

##### to {#to}

```ts
to: number;
```

The end position of the matched text.

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

##### attrs? {#attrs}

```ts
optional attrs: 
  | null
  | Attrs
  | (match: RegExpMatchArray) => null | Attrs;
```

Attributes to set on the node. If a function is provided, it will be called
with the matched result from the regular expression.

##### regex {#regex}

```ts
regex: RegExp;
```

The regular expression to match against. It should end with `$`.

##### stop? {#stop}

```ts
optional stop: boolean;
```

Whether to stop further handlers from being called if this rule is triggered.

###### Default

```ts
true
```

##### type {#type}

```ts
type: string | NodeType;
```

The node type to replace the matched text with.

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

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=2097152 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
