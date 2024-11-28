# prosekit/extensions/autocomplete

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

`canMatch`

</dt>

<dd>

**Type**: `(options: { state: EditorState }) => boolean`

</dd>

<dt>

`onLeave`

</dt>

<dd>

**Type**: `VoidFunction`

</dd>

<dt>

`onMatch`

</dt>

<dd>

**Type**: `MatchHandler`

</dd>

<dt>

`regex`

</dt>

<dd>

**Type**: `RegExp`

</dd>

</dl>

## MatchHandler {#match-handler}

**Type**: `(options: { deleteMatch: () => void; from: number; ignoreMatch: () => void; match: RegExpExecArray; state: EditorState; to: number }) => void`

## defineAutocomplete {#define-autocomplete}

```ts
function defineAutocomplete(rule: AutocompleteRule): Extension
```
