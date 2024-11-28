# prosekit/extensions/search

## SearchQueryOptions {#search-query-options}

Options for [defineSearchQuery](search.md#define-search-query)

<dl>

<dt>

`caseSensitive`

</dt>

<dd>

Indicates whether the search is case-sensitive

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`literal`

</dt>

<dd>

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`regexp`

</dt>

<dd>

When true, the search string is interpreted as a regular expression.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`replace`

</dt>

<dd>

The replace text.

**Type**: `string`

</dd>

<dt>

`search`

</dt>

<dd>

The search string (or regular expression).

**Type**: `string`

</dd>

<dt>

`wholeWord`

</dt>

<dd>

Enable whole-word matching.

**Type**: `boolean`

**Default**: `false`

</dd>

</dl>

## defineSearchCommands {#define-search-commands}

```ts
function defineSearchCommands(): Extension<{ Commands: { findNext: []; findNextNoWrap: []; findPrev: []; findPrevNoWrap: []; replaceAll: []; replaceCurrent: []; replaceNext: []; replaceNextNoWrap: [] } }>
```

Defines commands for search and replace.

## defineSearchQuery {#define-search-query}

```ts
function defineSearchQuery(options: SearchQueryOptions): PlainExtension
```

Defines an extension that stores a current search query and replace string.
