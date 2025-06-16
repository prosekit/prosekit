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

#### Constructors

##### Constructor

```ts
new AutocompleteEmptyElement(): AutocompleteEmptyElement;
```

###### Returns

[`AutocompleteEmptyElement`](#autocompleteemptyelement)

###### Inherited from

```ts
AutocompleteEmptyElementBase.constructor
```

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

#### Constructors

##### Constructor

```ts
new AutocompleteItemElement(): AutocompleteItemElement;
```

###### Returns

[`AutocompleteItemElement`](#autocompleteitemelement)

###### Inherited from

```ts
AutocompleteItemElementBase.constructor
```

#### Properties

##### value {#value}

```ts
value: string;
```

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

```ts
""
```

###### Inherited from

```ts
AutocompleteItemElementBase.value
```

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

#### Constructors

##### Constructor

```ts
new AutocompleteListElement(): AutocompleteListElement;
```

###### Returns

[`AutocompleteListElement`](#autocompletelistelement)

###### Inherited from

```ts
AutocompleteListElementBase.constructor
```

#### Properties

##### filter {#filter}

```ts
filter: null | ItemFilter;
```

The filter function to determine if an item should be shown in the listbox.
By default, a simple case-insensitive substring match is used. You can
provide a custom filter function to match against a more complex pattern.
You can also pass `null` to disable filtering and allow all items to be
shown.

###### Default

```ts
defaultItemFilter
```

###### Inherited from

```ts
AutocompleteListElementBase.filter
```

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

#### Constructors

##### Constructor

```ts
new AutocompletePopoverElement(): AutocompletePopoverElement;
```

###### Returns

[`AutocompletePopoverElement`](#autocompletepopoverelement)

###### Inherited from

```ts
AutocompletePopoverElementBase.constructor
```

#### Properties

##### altBoundary {#altboundary}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.altBoundary
```

##### autoUpdate {#autoupdate}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.autoUpdate
```

##### boundary {#boundary}

```ts
boundary: Boundary;
```

###### Default

```ts
"The body element"
```

###### Inherited from

```ts
AutocompletePopoverElementBase.boundary
```

##### elementContext {#elementcontext}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
AutocompletePopoverElementBase.elementContext
```

##### fitViewport {#fitviewport}

```ts
fitViewport: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.fitViewport
```

##### flip {#flip}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.flip
```

##### hide {#hide}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.hide
```

##### hoist {#hoist}

```ts
hoist: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.hoist
```

##### inline {#inline}

```ts
inline: boolean;
```

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.inline
```

##### offset {#offset}

```ts
offset: undefined | OffsetOptions;
```

The distance between the popover and the hovered block.

###### Default

```ts
4
```

###### Inherited from

```ts
AutocompletePopoverElementBase.offset
```

##### overflowPadding {#overflowpadding}

```ts
overflowPadding: number;
```

###### Default

```ts
8
```

###### Inherited from

```ts
AutocompletePopoverElementBase.overflowPadding
```

##### overlap {#overlap}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.overlap
```

##### placement {#placement}

```ts
placement: Placement;
```

The placement of the popover, relative to the text cursor.

###### Default

```ts
"bottom-start"
```

###### Inherited from

```ts
AutocompletePopoverElementBase.placement
```

##### regex {#regex}

```ts
regex: 
  | null
  | RegExp;
```

The regular expression to match the query text to autocomplete.

###### Default

```ts
null
```

###### Inherited from

```ts
AutocompletePopoverElementBase.regex
```

##### rootBoundary {#rootboundary}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
AutocompletePopoverElementBase.rootBoundary
```

##### sameHeight {#sameheight}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.sameHeight
```

##### sameWidth {#samewidth}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.sameWidth
```

##### shift {#shift}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
AutocompletePopoverElementBase.shift
```

##### strategy {#strategy}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
AutocompletePopoverElementBase.strategy
```

##### transform {#transform}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
AutocompletePopoverElementBase.transform
```

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

<a id="select"></a> `select`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
<td>

Fired when the item is selected.

</td>
<td>

```ts
ListboxItemEvents.select
```

</td>
</tr>
</tbody>
</table>

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

<a id="value-1"></a> `value`

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

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="valuechange"></a> `valueChange`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`string`\>

</td>
<td>

```ts
ListboxEvents.valueChange
```

</td>
</tr>
</tbody>
</table>

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

<a id="filter-1"></a> `filter`

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
Pick.filter
```

</td>
</tr>
</tbody>
</table>

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
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary-1"></a> `altBoundary`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate-1"></a> `autoUpdate`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary-1"></a> `boundary`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="elementcontext-1"></a> `elementContext`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport-1"></a> `fitViewport`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="flip-1"></a> `flip`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide-1"></a> `hide`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist-1"></a> `hoist`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="inline-1"></a> `inline`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="offset-1"></a> `offset`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="overflowpadding-1"></a> `overflowPadding`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="overlap-1"></a> `overlap`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement-1"></a> `placement`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="regex-1"></a> `regex`

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
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="rootboundary-1"></a> `rootBoundary`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight-1"></a> `sameHeight`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth-1"></a> `sameWidth`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift-1"></a> `shift`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy-1"></a> `strategy`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform-1"></a> `transform`

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

&hyphen;

</td>
<td>

```ts
OverlayPositionerProps.transform
```

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
