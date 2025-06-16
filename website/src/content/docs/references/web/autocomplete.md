---
title: prosekit/web/autocomplete
sidebar:
  label: web/autocomplete
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### AutocompleteEmptyElement {#autocompleteemptyelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `AutocompleteEmptyElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemElement {#autocompleteitemelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `AutocompleteItemElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListElement {#autocompletelistelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `AutocompleteListElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverElement {#autocompletepopoverelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `AutocompletePopoverElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AutocompleteItemEvents {#autocompleteitemevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `ListboxItemEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemProps {#autocompleteitemprops}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="value"></a> `value`

</td>
<td>

`string`

</td>
<td>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Default**

```ts
""
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListEvents {#autocompletelistevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `ListboxEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListProps {#autocompletelistprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<`ListboxProps`, `"filter"`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverEvents {#autocompletepopoverevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `OverlayPositionerEvents`

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

<a id="openchange"></a> `openChange`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\>

</td>
<td>

Fired when the open state changes.

</td>
</tr>
<tr>
<td>

<a id="querychange"></a> `queryChange`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`string`\>

</td>
<td>

Fired when the query changes.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverProps {#autocompletepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `OverlayPositionerProps`

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
<th>Overrides</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="boundary"></a> `boundary`

</td>
<td>

`Boundary`

</td>
<td>

**Default**

```ts
"The body element"
```

</td>
<td>

```ts
OverlayPositionerProps.boundary
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport"></a> `fitViewport`

</td>
<td>

`boolean`

</td>
<td>

**Default**

```ts
true
```

</td>
<td>

```ts
OverlayPositionerProps.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="hoist"></a> `hoist`

</td>
<td>

`boolean`

</td>
<td>

**Default**

```ts
true
```

</td>
<td>

```ts
OverlayPositionerProps.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline"></a> `inline`

</td>
<td>

`boolean`

</td>
<td>

**Default**

```ts
true
```

</td>
<td>

```ts
OverlayPositionerProps.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset"></a> `offset`

</td>
<td>

`undefined` \| `OffsetOptions`

</td>
<td>

The distance between the popover and the hovered block.

**Default**

```ts
4
```

</td>
<td>

```ts
OverlayPositionerProps.offset
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

**Default**

```ts
8
```

</td>
<td>

```ts
OverlayPositionerProps.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="placement"></a> `placement`

</td>
<td>

`Placement`

</td>
<td>

The placement of the popover, relative to the text cursor.

**Default**

```ts
"bottom-start"
```

</td>
<td>

```ts
OverlayPositionerProps.placement
```

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex`

</td>
<td>

 \| `null` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

</td>
<td>

The regular expression to match the query text to autocomplete.

**Default**

```ts
null
```

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Variables

### autocompleteListEvents {#autocompletelistevents-1}

```ts
const autocompleteListEvents: EventDeclarations<AutocompleteListEvents>;
```

***

### autocompleteListProps {#autocompletelistprops-1}

```ts
const autocompleteListProps: PropDeclarations<AutocompleteListProps>;
```

<!-- DEBUG memberWithGroups 10 -->
