---
title: prosekit/extensions/search
sidebar:
  label: extensions/search
---

## Interfaces

### SearchQueryOptions {#searchqueryoptions}

Options for [defineSearchQuery](#definesearchquery)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="casesensitive" href="#casesensitive">caseSensitive</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Indicates whether the search is case-sensitive

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="literal" href="#literal">literal</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="regexp" href="#regexp">regexp</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, the search string is interpreted as a regular expression.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace" href="#replace">replace</a><i>?</i>: `string`</code>

</dt>

<dd>

The replace text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="search" href="#search">search</a>: `string`</code>

</dt>

<dd>

The search string (or regular expression).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="wholeword" href="#wholeword">wholeWord</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Enable whole-word matching.

###### Default

```ts
false
```

</dd>

</dl>

## Functions

### defineSearchCommands() {#definesearchcommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definesearchcommands-2" href="#definesearchcommands-2">defineSearchCommands</a>(): `SearchCommandsExtension`</code>

</dt>

<dd>

Defines commands for search and replace.

</dd>

</dl>

***

### defineSearchQuery() {#definesearchquery}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definesearchquery-2" href="#definesearchquery-2">defineSearchQuery</a>(`options`: [`SearchQueryOptions`](#searchqueryoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an extension that stores a current search query and replace string.

</dd>

</dl>
