# prosekit/extensions/autocomplete

## AutocompleteRule

### Constructors

#### new AutocompleteRule(options)

```ts
new AutocompleteRule(options): AutocompleteRule
```

##### Parameters

▪ **options**: `object`

▪ **options.canMatch?**: (`options`) => `boolean`

▪ **options.onEnter**: [`MatchHandler`](autocomplete.md#matchhandler)

▪ **options.onLeave?**: `VoidFunction`

▪ **options.regex**: [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

##### Returns

[`AutocompleteRule`](autocomplete.md#autocompleterule)

### Properties

| Modifier | Property | Type | Description |
| :------ | :------ | :------ | :------ |
| `readonly` | `canMatch` | (`options`) => `boolean` | - |
| `readonly` | `onLeave`? | `VoidFunction` | - |
| `readonly` | `onMatch` | [`MatchHandler`](autocomplete.md#matchhandler) | - |
| `readonly` | `regex` | [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp ) | - |

***

## MatchHandler

```ts
type MatchHandler: (options) => Transaction | null | void;
```

### Parameters

▪ **options**: `object`

▪ **options.deleteMatch**: () => `void`

▪ **options.from**: `number`

▪ **options.ignoreMatch**: () => `void`

▪ **options.match**: `RegExpExecArray`

▪ **options.state**: [`EditorState`]( https://prosemirror.net/docs/ref/#state.EditorState )

▪ **options.to**: `number`

### Returns

[`Transaction`]( https://prosemirror.net/docs/ref/#state.Transaction ) \| `null` \| `void`

***

## defineAutocomplete()

```ts
defineAutocomplete(rule): Extension
```

### Parameters

▪ **rule**: [`AutocompleteRule`](autocomplete.md#autocompleterule)

### Returns

[`Extension`](../core.md#extensiont)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
