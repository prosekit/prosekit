---
title: prosekit/extensions/search
sidebar:
  label: extensions/search
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### SearchQueryOptions {#searchqueryoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineSearchQuery](#definesearchquery)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="casesensitive"></a> `caseSensitive?`

</td>
<td>

`boolean`

</td>
<td>

Indicates whether the search is case-sensitive

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="literal"></a> `literal?`

</td>
<td>

`boolean`

</td>
<td>

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="regexp"></a> `regexp?`

</td>
<td>

`boolean`

</td>
<td>

When true, the search string is interpreted as a regular expression.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="replace"></a> `replace?`

</td>
<td>

`string`

</td>
<td>

The replace text.

</td>
</tr>
<tr>
<td>

<a id="search"></a> `search`

</td>
<td>

`string`

</td>
<td>

The search string (or regular expression).

</td>
</tr>
<tr>
<td>

<a id="wholeword"></a> `wholeWord?`

</td>
<td>

`boolean`

</td>
<td>

Enable whole-word matching.

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineSearchCommands() {#definesearchcommands}

```ts
function defineSearchCommands(): SearchCommandsExtension;
```

Defines commands for search and replace.

#### Returns

`SearchCommandsExtension`

***

### defineSearchQuery() {#definesearchquery}

```ts
function defineSearchQuery(options: SearchQueryOptions): PlainExtension;
```

Defines an extension that stores a current search query and replace string.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`SearchQueryOptions`](#searchqueryoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

<!-- DEBUG memberWithGroups 10 -->
