---
title: prosekit/extensions/autocomplete
sidebar:
  label: extensions/autocomplete
---

## Classes

### AutocompleteRule {#autocompleterule}

An autocomplete rule that can be used to create an autocomplete extension.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorautocompleterule" href="#constructorautocompleterule">AutocompleteRule</a>(`options`: [`AutocompleteRuleOptions`](#autocompleteruleoptions)): [`AutocompleteRule`](#autocompleterule)</code>

</dt>

</dl>

## Interfaces

### AutocompleteRuleOptions {#autocompleteruleoptions}

Options for creating an [AutocompleteRule](#autocompleterule)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canmatch" href="#canmatch">canMatch</a><i>?</i>: [`CanMatchPredicate`](#canmatchpredicate)</code>

</dt>

<dd>

A predicate to determine if the rule can be applied in the current editor
state. If not provided, it defaults to only allowing matches in empty
selections that are not inside a code block or code mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onenter" href="#onenter">onEnter</a>: [`MatchHandler`](#matchhandler)</code>

</dt>

<dd>

A callback that is called when the rule starts to match, and also on
subsequent updates while the rule continues to match.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onleave" href="#onleave">onLeave</a><i>?</i>: `VoidFunction`</code>

</dt>

<dd>

A callback that is called when the rule stops matching.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against the text before the cursor. The
last match before the cursor is used.

For a slash menu, you might use `//(|\S.*)$/u`.
For a mention, you might use `/@\w*$/`

</dd>

</dl>

***

### CanMatchOptions {#canmatchoptions}

Options for the [CanMatchPredicate](#canmatchpredicate) callback.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="state" href="#state">state</a>: [`EditorState`](../pm/state.md#editorstate)</code>

</dt>

<dd>

The editor state.

</dd>

</dl>

***

### MatchHandlerOptions {#matchhandleroptions}

Options for the [MatchHandler](#matchhandler) callback.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="deletematch" href="#deletematch">deleteMatch</a>: () => `void`</code>

</dt>

<dd>

Call this function to delete the matched text. For example, in a slash
menu, you might want to delete the matched text first then do something
else when the user presses the `Enter` key.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The start position of the matched text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignorematch" href="#ignorematch">ignoreMatch</a>: () => `void`</code>

</dt>

<dd>

Call this function to ignore the match. You probably want to call this
function when the user presses the `Escape` key.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="match" href="#match">match</a>: `RegExpExecArray`</code>

</dt>

<dd>

The result of `RegExp.exec`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="state-1" href="#state-1">state</a>: [`EditorState`](../pm/state.md#editorstate)</code>

</dt>

<dd>

The editor state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The end position of the matched text.

</dd>

</dl>

## Type Aliases

### CanMatchPredicate() {#canmatchpredicate}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="canmatchpredicate" href="#canmatchpredicate">CanMatchPredicate</a> = (`options`: [`CanMatchOptions`](#canmatchoptions)) => `boolean`</code>

</dt>

<dd>

A predicate to determine if the rule can be applied in the current editor state.

</dd>

</dl>

***

### MatchHandler() {#matchhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="matchhandler" href="#matchhandler">MatchHandler</a> = (`options`: [`MatchHandlerOptions`](#matchhandleroptions)) => `void`</code>

</dt>

<dd>

A callback that is called when the rule starts to match, and also on
subsequent updates while the rule continues to match.

</dd>

</dl>

## Functions

### defineAutocomplete() {#defineautocomplete}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineautocomplete-2" href="#defineautocomplete-2">defineAutocomplete</a>(`rule`: [`AutocompleteRule`](#autocompleterule)): [`Extension`](../core.md#extension-1)</code>

</dt>

</dl>
