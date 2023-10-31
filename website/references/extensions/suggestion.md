# prosekit/extensions/suggestion

<a id="predictionrule" name="predictionrule"></a>

## PredictionRule

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `match` | [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp ) | - |
| `matchAfter`? | [`RegExp`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp ) | - |

***

<a id="suggestionoptions" name="suggestionoptions"></a>

## SuggestionOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `isValid`? | (`options`) => `boolean` | - |
| `onDeactivate` | `VoidFunction` | - |
| `onMatch` | `MatchHandler` | - |
| `rules` | [`PredictionRule`](suggestion.md#predictionrule)[] | - |

***

<a id="definesuggestion" name="definesuggestion"></a>

## defineSuggestion()

```ts
defineSuggestion(options): Extension<ExtensionTyping<string, string, CommandArgs>>
```

### Parameters

▪ **options**: [`SuggestionOptions`](suggestion.md#suggestionoptions)

### Returns

[`Extension`](../core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
