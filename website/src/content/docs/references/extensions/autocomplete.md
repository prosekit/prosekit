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

<a id="canmatch"></a> `canMatch?`

</td>
<td>

(`options`: `object`) => `boolean`

</td>
<td>

A predicate to determine if the rule can be applied in the current editor
state. If not provided, it defaults to only allowing matches in empty
selections that are not inside a code block or code mark.

</td>
</tr>
<tr>
<td>

<a id="onenter"></a> `onEnter`

</td>
<td>

[`MatchHandler`](#matchhandler)

</td>
<td>

A callback that is called when the rule starts to match, and also on
subsequent updates while the rule continues to match.

</td>
</tr>
<tr>
<td>

<a id="onleave"></a> `onLeave?`

</td>
<td>

`VoidFunction`

</td>
<td>

A callback that is called when the rule stops matching.

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

The regular expression to match against the text before the cursor. The
last match before the cursor is used.

For a slash menu, you might use `//(|\S.*)$/u`.
For a mention, you might use `/@\w*$/`

</td>
</tr>
</tbody>
</table>

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

<a id="deletematch"></a> `deleteMatch`

</td>
<td>

() => `void`

</td>
<td>

Call this function to delete the matched text. For example, in a slash
menu, you might want to delete the matched text first then do something
else when the user presses the `Enter` key.

</td>
</tr>
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

<a id="ignorematch"></a> `ignoreMatch`

</td>
<td>

() => `void`

</td>
<td>

Call this function to ignore the match. You probably want to call this
function when the user presses the `Escape` key.

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

The result of `RegExp.exec`.

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

The editor state.

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

<!-- DEBUG memberWithGroups 10 -->
