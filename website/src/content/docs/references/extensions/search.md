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

<code data-typedoc-code><a id="search" href="#search">search</a>: `string`</code>

</dt>

<dd>

The search string (or regular expression).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replace" href="#replace">replace</a><i>?</i>: `string`</code>

</dt>

<dd>

The replace text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="casesensitive" href="#casesensitive">caseSensitive</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Indicates whether the search is case-sensitive

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="literal" href="#literal">literal</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="regexp" href="#regexp">regexp</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, the search string is interpreted as a regular expression.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="wholeword" href="#wholeword">wholeWord</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Enable whole-word matching.

###### Default

`false`

</dd>

</dl>

## Functions

### defineSearchQuery() {#definesearchquery}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definesearchquery" href="#definesearchquery">defineSearchQuery</a>(`options`: [`SearchQueryOptions`](#searchqueryoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an extension that stores a current search query and replace string.

</dd>

</dl>

***

### defineSearchCommands() {#definesearchcommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definesearchcommands" href="#definesearchcommands">defineSearchCommands</a>(): `SearchCommandsExtension`</code>

</dt>

<dd>

Defines commands for search and replace.

</dd>

</dl>
