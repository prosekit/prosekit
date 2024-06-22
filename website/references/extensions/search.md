# prosekit/extensions/search

<a id="SearchQueryOptions" name="SearchQueryOptions"></a>

## SearchQueryOptions

Options for [defineSearchQuery](search.md#defineSearchQuery)

### Properties

<a id="caseSensitive" name="caseSensitive"></a>

#### caseSensitive?

> `optional` **caseSensitive**: `boolean`

Indicates whether the search is case-sensitive

##### Default

```ts
false
```

<a id="literal" name="literal"></a>

#### literal?

> `optional` **literal**: `boolean`

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

##### Default

```ts
false
```

<a id="regexp" name="regexp"></a>

#### regexp?

> `optional` **regexp**: `boolean`

When true, the search string is interpreted as a regular expression.

##### Default

```ts
false
```

<a id="replace" name="replace"></a>

#### replace?

> `optional` **replace**: `string`

The replace text.

<a id="search" name="search"></a>

#### search

> **search**: `string`

The search string (or regular expression).

<a id="wholeWord" name="wholeWord"></a>

#### wholeWord?

> `optional` **wholeWord**: `boolean`

Enable whole-word matching.

##### Default

```ts
false
```

***

<a id="defineSearchCommands" name="defineSearchCommands"></a>

## defineSearchCommands()

> **defineSearchCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Defines commands for search and replace.

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Commands.findNext` | [] |
| `Commands.findNextNoWrap` | [] |
| `Commands.findPrev` | [] |
| `Commands.findPrevNoWrap` | [] |
| `Commands.replaceAll` | [] |
| `Commands.replaceCurrent` | [] |
| `Commands.replaceNext` | [] |
| `Commands.replaceNextNoWrap` | [] |
| `Marks` | `never` |
| `Nodes` | `never` |

***

<a id="defineSearchQuery" name="defineSearchQuery"></a>

## defineSearchQuery()

> **defineSearchQuery**(`options`): [`Extension`](../core.md#ExtensionT)\<`any`\>

Defines an extension that stores a current search query and replace string.

### Parameters

• **options**: [`SearchQueryOptions`](search.md#SearchQueryOptions)

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>
