---
title: prosekit/extensions/autocomplete
sidebar:
  label: extensions/autocomplete
---


## AutocompleteRule {#autocomplete-rule}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AutocompleteRule(options: { canMatch?: (options: { state: EditorState }) => boolean; onEnter: MatchHandler; onLeave?: VoidFunction; regex: RegExp }): AutocompleteRule
```

</dd>

<dt>

`canMatch: (options: { state: EditorState }) => boolean`

</dt>

<dd>

</dd>

<dt>

`onLeave?: VoidFunction`

</dt>

<dd>

</dd>

<dt>

`onMatch: MatchHandler`

</dt>

<dd>

</dd>

<dt>

`regex: RegExp`

</dt>

<dd>

</dd>

</dl>

## MatchHandler {#match-handler}

**Type**: `(options: { deleteMatch: () => void; from: number; ignoreMatch: () => void; match: RegExpExecArray; state: EditorState; to: number }) => void`

## defineAutocomplete {#define-autocomplete}

```ts
function defineAutocomplete(rule: AutocompleteRule): Extension
```
