---
title: prosekit/extensions/search
sidebar:
  label: extensions/search
---


## SearchQueryOptions {#search-query-options}

Options for [defineSearchQuery](search.md#define-search-query)

<dl>

<dt>

`caseSensitive?: boolean`

</dt>

<dd>

Indicates whether the search is case-sensitive

**Default**: `false`

</dd>

<dt>

`literal?: boolean`

</dt>

<dd>

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

**Default**: `false`

</dd>

<dt>

`regexp?: boolean`

</dt>

<dd>

When true, the search string is interpreted as a regular expression.

**Default**: `false`

</dd>

<dt>

`replace?: string`

</dt>

<dd>

The replace text.

</dd>

<dt>

`search: string`

</dt>

<dd>

The search string (or regular expression).

</dd>

<dt>

`wholeWord?: boolean`

</dt>

<dd>

Enable whole-word matching.

**Default**: `false`

</dd>

</dl>

## defineSearchCommands {#define-search-commands}

```ts
function defineSearchCommands(): SearchCommandsExtension
```

Defines commands for search and replace.

## defineSearchQuery {#define-search-query}

```ts
function defineSearchQuery(options: SearchQueryOptions): PlainExtension
```

Defines an extension that stores a current search query and replace string.
