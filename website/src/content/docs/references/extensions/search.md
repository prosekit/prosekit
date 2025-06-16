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

##### caseSensitive? {#casesensitive}

```ts
optional caseSensitive: boolean;
```

Indicates whether the search is case-sensitive

###### Default

```ts
false
```

##### literal? {#literal}

```ts
optional literal: boolean;
```

By default, string search will replace `\n`, `\r`, and `\t` in the query
with newline, return, and tab characters. When this is set to true, that
behavior is disabled.

###### Default

```ts
false
```

##### regexp? {#regexp}

```ts
optional regexp: boolean;
```

When true, the search string is interpreted as a regular expression.

###### Default

```ts
false
```

##### replace? {#replace}

```ts
optional replace: string;
```

The replace text.

##### search {#search}

```ts
search: string;
```

The search string (or regular expression).

##### wholeWord? {#wholeword}

```ts
optional wholeWord: boolean;
```

Enable whole-word matching.

###### Default

```ts
false
```

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
