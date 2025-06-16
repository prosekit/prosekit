---
title: prosekit/extensions/autocomplete
sidebar:
  label: extensions/autocomplete
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### AutocompleteRule {#autocompleterule}

<!-- DEBUG memberWithGroups 1 -->

An autocomplete rule that can be used to create an autocomplete extension.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new AutocompleteRule(options: AutocompleteRuleOptions): AutocompleteRule;
```

###### Parameters

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

[`AutocompleteRuleOptions`](#autocompleteruleoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`AutocompleteRule`](#autocompleterule)

<!-- DEBUG inheritance start kind=16384 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AutocompleteRuleOptions {#autocompleteruleoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for creating an [AutocompleteRule](#autocompleterule)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### canMatch()? {#canmatch}

```ts
optional canMatch: (options: object) => boolean;
```

A predicate to determine if the rule can be applied in the current editor
state. If not provided, it defaults to only allowing matches in empty
selections that are not inside a code block or code mark.

###### Parameters

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

\{ `state`: [`EditorState`](../pm/state.md#editorstate); \}

</td>
</tr>
<tr>
<td>

`options.state`

</td>
<td>

[`EditorState`](../pm/state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start kind=4096 -->

##### onEnter {#onenter}

```ts
onEnter: MatchHandler;
```

A callback that is called when the rule starts to match, and also on
subsequent updates while the rule continues to match.

##### onLeave? {#onleave}

```ts
optional onLeave: VoidFunction;
```

A callback that is called when the rule stops matching.

##### regex {#regex}

```ts
regex: RegExp;
```

The regular expression to match against the text before the cursor. The
last match before the cursor is used.

For a slash menu, you might use `//(|\S.*)$/u`.
For a mention, you might use `/@\w*$/`

<!-- DEBUG memberWithGroups 10 -->

***

### MatchHandlerOptions {#matchhandleroptions}

<!-- DEBUG memberWithGroups 1 -->

Options for the [MatchHandler](#matchhandler) callback.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### deleteMatch() {#deletematch}

```ts
deleteMatch: () => void;
```

Call this function to delete the matched text. For example, in a slash
menu, you might want to delete the matched text first then do something
else when the user presses the `Enter` key.

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

##### from {#from}

```ts
from: number;
```

The start position of the matched text.

##### ignoreMatch() {#ignorematch}

```ts
ignoreMatch: () => void;
```

Call this function to ignore the match. You probably want to call this
function when the user presses the `Escape` key.

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

##### match {#match}

```ts
match: RegExpExecArray;
```

The result of `RegExp.exec`.

##### state {#state}

```ts
state: EditorState;
```

The editor state.

##### to {#to}

```ts
to: number;
```

The end position of the matched text.

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### MatchHandler() {#matchhandler}

```ts
type MatchHandler = (options: MatchHandlerOptions) => void;
```

A callback that is called when the rule starts to match, and also on
subsequent updates while the rule continues to match.

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

[`MatchHandlerOptions`](#matchhandleroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=2097152 -->

## Functions

### defineAutocomplete() {#defineautocomplete}

```ts
function defineAutocomplete(rule: AutocompleteRule): Extension;
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

`rule`

</td>
<td>

[`AutocompleteRule`](#autocompleterule)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](../core.md#extension-1)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
