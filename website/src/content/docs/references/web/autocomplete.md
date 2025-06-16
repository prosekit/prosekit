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

<!-- DEBUG inheritance start kind=16384 -->

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

<!-- DEBUG inheritance start kind=16384 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=16384 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=16384 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### boundary {#boundary}

```ts
boundary: Boundary;
```

###### Default

```ts
"The body element"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport {#fitviewport}

```ts
fitViewport: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### hoist {#hoist}

```ts
hoist: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline {#inline}

```ts
inline: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset {#offset}

```ts
offset: undefined | OffsetOptions;
```

The distance between the popover and the hovered block.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding {#overflowpadding}

```ts
overflowPadding: number;
```

###### Default

```ts
8
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### placement {#placement}

```ts
placement: Placement;
```

The placement of the popover, relative to the text cursor.

###### Default

```ts
"bottom-start"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

##### shift {#shift}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy {#strategy}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

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

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AutocompleteItemEvents {#autocompleteitemevents}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### select {#select}

```ts
select: CustomEvent<void>;
```

Fired when the item is selected.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### AutocompleteItemProps {#autocompleteitemprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### value {#value-1}

```ts
value: string;
```

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

```ts
""
```

<!-- DEBUG inheritance start kind=1024 -->

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

##### valueChange {#valuechange}

```ts
valueChange: CustomEvent<string>;
```

<!-- DEBUG inheritance start kind=1024 -->

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

##### filter {#filter-1}

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

<!-- DEBUG inheritance start kind=1024 -->

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

##### openChange {#openchange}

```ts
openChange: CustomEvent<boolean>;
```

Fired when the open state changes.

<!-- DEBUG inheritance start kind=1024 -->

##### queryChange {#querychange}

```ts
queryChange: CustomEvent<string>;
```

Fired when the query changes.

<!-- DEBUG inheritance start kind=1024 -->

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

##### altBoundary {#altboundary-1}

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

<!-- DEBUG inheritance start kind=1024 -->

##### autoUpdate {#autoupdate-1}

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

<!-- DEBUG inheritance start kind=1024 -->

##### boundary {#boundary-1}

```ts
boundary: Boundary;
```

###### Default

```ts
"The body element"
```

<!-- DEBUG inheritance start kind=1024 -->

##### elementContext {#elementcontext-1}

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

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport {#fitviewport-1}

```ts
fitViewport: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### flip {#flip-1}

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

<!-- DEBUG inheritance start kind=1024 -->

##### hide {#hide-1}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### hoist {#hoist-1}

```ts
hoist: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline {#inline-1}

```ts
inline: boolean;
```

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset {#offset-1}

```ts
offset: undefined | OffsetOptions;
```

The distance between the popover and the hovered block.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding {#overflowpadding-1}

```ts
overflowPadding: number;
```

###### Default

```ts
8
```

<!-- DEBUG inheritance start kind=1024 -->

##### overlap {#overlap-1}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### placement {#placement-1}

```ts
placement: Placement;
```

The placement of the popover, relative to the text cursor.

###### Default

```ts
"bottom-start"
```

<!-- DEBUG inheritance start kind=1024 -->

##### regex {#regex-1}

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

<!-- DEBUG inheritance start kind=1024 -->

##### rootBoundary {#rootboundary-1}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameHeight {#sameheight-1}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameWidth {#samewidth-1}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### shift {#shift-1}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy {#strategy-1}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

##### transform {#transform-1}

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

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Variables

### autocompleteListEvents {#autocompletelistevents-1}

```ts
const autocompleteListEvents: EventDeclarations<AutocompleteListEvents>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### autocompleteListProps {#autocompletelistprops-1}

```ts
const autocompleteListProps: PropDeclarations<AutocompleteListProps>;
```

<!-- DEBUG inheritance start kind=32 -->

<!-- DEBUG memberWithGroups 10 -->
