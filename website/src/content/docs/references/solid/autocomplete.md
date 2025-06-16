---
title: prosekit/solid/autocomplete
sidebar:
  label: solid/autocomplete
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### AutocompleteEmptyProps {#autocompleteemptyprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteEmpty](#autocompleteempty) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<`Props`, `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemProps {#autocompleteitemprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteItem](#autocompleteitem) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompleteItemProps`](../web/autocomplete.md#autocompleteitemprops), [`AutocompleteItemEvents`](../web/autocomplete.md#autocompleteitemevents)\>\>

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
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="onselect"></a> `onSelect?`

</td>
<td>

(`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onSelect
```

</td>
</tr>
<tr>
<td>

<a id="value"></a> `value?`

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
<td>

```ts
Partial.value
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteListProps {#autocompletelistprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompleteList](#autocompletelist) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompleteListProps`](../web/autocomplete.md#autocompletelistprops), [`AutocompleteListEvents`](../web/autocomplete.md#autocompletelistevents)\>\>

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
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="filter"></a> `filter?`

</td>
<td>

`null` \| `ItemFilter`

</td>
<td>

The filter function to determine if an item should be shown in the listbox.
By default, a simple case-insensitive substring match is used. You can
provide a custom filter function to match against a more complex pattern.
You can also pass `null` to disable filtering and allow all items to be
shown.

**Default**

```ts
defaultItemFilter
```

</td>
<td>

```ts
Partial.filter
```

</td>
</tr>
<tr>
<td>

<a id="onvaluechange"></a> `onValueChange?`

</td>
<td>

(`event`: `string`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onValueChange
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompletePopoverProps {#autocompletepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [AutocompletePopover](#autocompletepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`AutocompletePopoverProps`](../web/autocomplete.md#autocompletepopoverprops), [`AutocompletePopoverEvents`](../web/autocomplete.md#autocompletepopoverevents)\>\>

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
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary"></a> `altBoundary?`

</td>
<td>

`boolean`

</td>
<td>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate"></a> `autoUpdate?`

</td>
<td>

 \| `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)

</td>
<td>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**

```ts
true
```

</td>
<td>

```ts
Partial.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary"></a> `boundary?`

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
Partial.boundary
```

</td>
</tr>
<tr>
<td>

<a id="elementcontext"></a> `elementContext?`

</td>
<td>

`ElementContext`

</td>
<td>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**

```ts
'floating'
```

</td>
<td>

```ts
Partial.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport"></a> `fitViewport?`

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
Partial.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip"></a> `flip?`

</td>
<td>

`boolean` \| `Placement`[]

</td>
<td>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**

```ts
true
```

</td>
<td>

```ts
Partial.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide"></a> `hide?`

</td>
<td>

`boolean`

</td>
<td>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist"></a> `hoist?`

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
Partial.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline"></a> `inline?`

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
Partial.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset"></a> `offset?`

</td>
<td>

`OffsetOptions`

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
Partial.offset
```

</td>
</tr>
<tr>
<td>

<a id="onopenchange"></a> `onOpenChange?`

</td>
<td>

(`event`: `boolean`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onOpenChange
```

</td>
</tr>
<tr>
<td>

<a id="onquerychange"></a> `onQueryChange?`

</td>
<td>

(`event`: `string`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onQueryChange
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding"></a> `overflowPadding?`

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
Partial.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap"></a> `overlap?`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement"></a> `placement?`

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
Partial.placement
```

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex?`

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

```ts
Partial.regex
```

</td>
</tr>
<tr>
<td>

<a id="rootboundary"></a> `rootBoundary?`

</td>
<td>

`RootBoundary`

</td>
<td>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**

```ts
'viewport'
```

</td>
<td>

```ts
Partial.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight"></a> `sameHeight?`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth"></a> `sameWidth?`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift"></a> `shift?`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element should shift to keep it in view.

**Default**

```ts
true
```

</td>
<td>

```ts
Partial.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy"></a> `strategy?`

</td>
<td>

`"fixed"` \| `"absolute"`

</td>
<td>

The strategy to use for positioning

**Default**

```ts
"absolute"
```

</td>
<td>

```ts
Partial.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform"></a> `transform?`

</td>
<td>

`boolean`

</td>
<td>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.transform
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Variables

### AutocompleteEmpty {#autocompleteempty}

```ts
const AutocompleteEmpty: Component<PropsWithElement<AutocompleteEmptyProps, AutocompleteEmptyElement>>;
```

***

### AutocompleteItem {#autocompleteitem}

```ts
const AutocompleteItem: Component<PropsWithElement<AutocompleteItemProps, AutocompleteItemElement>>;
```

***

### AutocompleteList {#autocompletelist}

```ts
const AutocompleteList: Component<PropsWithElement<AutocompleteListProps, AutocompleteListElement>>;
```

***

### AutocompletePopover {#autocompletepopover}

```ts
const AutocompletePopover: Component<PropsWithElement<AutocompletePopoverProps, AutocompletePopoverElement>>;
```

<!-- DEBUG memberWithGroups 10 -->
