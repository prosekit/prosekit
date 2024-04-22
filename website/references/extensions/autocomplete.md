# prosekit/extensions/autocomplete

<a id="AutocompleteRule" name="AutocompleteRule"></a>

## AutocompleteRule

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new AutocompleteRule()

> **new AutocompleteRule**(`options`): [`AutocompleteRule`](autocomplete.md#AutocompleteRule)

##### Parameters

• **options**

• **options.canMatch?**

• **options.onEnter**: [`MatchHandler`](autocomplete.md#MatchHandler)

• **options.onLeave?**: `VoidFunction`

• **options.regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

##### Returns

[`AutocompleteRule`](autocomplete.md#AutocompleteRule)

### Properties

<a id="canMatch" name="canMatch"></a>

#### canMatch()

> `readonly` **canMatch**: (`options`) => `boolean`

##### Parameters

• **options**

• **options.state**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

##### Returns

`boolean`

<a id="onLeave" name="onLeave"></a>

#### onLeave?

> `optional` `readonly` **onLeave**: `VoidFunction`

<a id="onMatch" name="onMatch"></a>

#### onMatch

> `readonly` **onMatch**: [`MatchHandler`](autocomplete.md#MatchHandler)

<a id="regex" name="regex"></a>

#### regex

> `readonly` **regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

***

<a id="MatchHandler" name="MatchHandler"></a>

## MatchHandler()

> **MatchHandler**: (`options`) => `void`

### Parameters

• **options**

• **options.deleteMatch**

• **options.from**: `number`

• **options.ignoreMatch**

• **options.match**: `RegExpExecArray`

• **options.state**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

• **options.to**: `number`

### Returns

`void`

***

<a id="defineAutocomplete" name="defineAutocomplete"></a>

## defineAutocomplete()

> **defineAutocomplete**(`rule`): [`Extension`](../core.md#ExtensionT)

### Parameters

• **rule**: [`AutocompleteRule`](autocomplete.md#AutocompleteRule)

### Returns

[`Extension`](../core.md#ExtensionT)
