---
title: prosekit/web/menu
sidebar:
  label: web/menu
---

## Anatomy

```html
<prosekit-menu-root>
  <prosekit-menu-trigger>...</prosekit-menu-trigger>
  <prosekit-menu-positioner>
    <prosekit-menu-popup>
       <prosekit-menu-item>...</prosekit-menu-item>
       <prosekit-menu-submenu-root>
         <prosekit-menu-submenu-trigger>...</prosekit-menu-submenu-trigger>
         <prosekit-menu-positioner>
           <prosekit-menu-popup>
             <prosekit-menu-item>...</prosekit-menu-item>
           </prosekit-menu-popup>
         </prosekit-menu-positioner>
       </prosekit-menu-submenu-root>
    </prosekit-menu-popup>
  </prosekit-menu-positioner>
</prosekit-menu-root>
```

## Classes

### MenuItemElement {#menuitemelement}

`<prosekit-menu-item>` custom element.

Properties: [MenuItemProps](#menuitemprops)

Events: [MenuItemEvents](#menuitemevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-highlighted` | Present when the item is the currently highlighted option |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">MenuItemElement</a>(): [`MenuItemElement`](#menuitemelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The unique value for this menu item.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this menu item is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="closeonselect" href="#closeonselect">closeOnSelect</a>: `boolean`</code>

</dt>

<dd>

Whether to close the menu when the item is pressed.

###### Default

`true`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller" href="#addcontroller">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller" href="#removecontroller">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback" href="#connectedcallback">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback" href="#disconnectedcallback">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuPopupElement {#menupopupelement}

`<prosekit-menu-popup>` custom element.

Properties: [MenuPopupProps](#menupopupprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">MenuPopupElement</a>(): [`MenuPopupElement`](#menupopupelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget" href="#eventtarget">eventTarget</a>: [`EventTarget`](https://developer.mozilla.org/docs/Web/API/EventTarget) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `null`</code>

</dt>

<dd>

By default, the MenuPopup element will listen for keydown events.
You can pass a different element to listen for keydown events.

###### Default

`null`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-1" href="#addcontroller-1">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-1" href="#removecontroller-1">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-1" href="#connectedcallback-1">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-1" href="#disconnectedcallback-1">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuPositionerElement {#menupositionerelement}

`<prosekit-menu-positioner>` custom element.

Properties: [MenuPositionerProps](#menupositionerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the menu is visible, `"closed"` otherwise |

CSS variables:

| Variable | Description |
| --- | --- |
| `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">MenuPositionerElement</a>(): [`MenuPositionerElement`](#menupositionerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser Popover API to place the floating element on
top of other page content.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide" href="#hide">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-2" href="#addcontroller-2">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-2" href="#removecontroller-2">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-2" href="#connectedcallback-2">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-2" href="#disconnectedcallback-2">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuRootElement {#menurootelement}

`<prosekit-menu-root>` custom element.

Properties: [MenuRootProps](#menurootprops)

Events: [MenuRootEvents](#menurootevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-menu-root` | Always present on the element |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">MenuRootElement</a>(): [`MenuRootElement`](#menurootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-3" href="#addcontroller-3">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-3" href="#removecontroller-3">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-3" href="#connectedcallback-3">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-3" href="#disconnectedcallback-3">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuSubmenuRootElement {#menusubmenurootelement}

`<prosekit-menu-submenu-root>` custom element.

Properties: [MenuSubmenuRootProps](#menusubmenurootprops)

Events: [MenuSubmenuRootEvents](#menusubmenurootevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-menu-submenu-root` | Always present on the element |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">MenuSubmenuRootElement</a>(): [`MenuSubmenuRootElement`](#menusubmenurootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-1" href="#open-1">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-2" href="#disabled-2">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-4" href="#addcontroller-4">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-4" href="#removecontroller-4">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-4" href="#connectedcallback-4">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-4" href="#disconnectedcallback-4">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuSubmenuTriggerElement {#menusubmenutriggerelement}

`<prosekit-menu-submenu-trigger>` custom element.

Properties: [MenuSubmenuTriggerProps](#menusubmenutriggerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-highlighted` | Present when the item is the currently highlighted option |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">MenuSubmenuTriggerElement</a>(): [`MenuSubmenuTriggerElement`](#menusubmenutriggerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The unique value for this submenu trigger in the parent menu.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-3" href="#disabled-3">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this submenu trigger is disabled.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-5" href="#addcontroller-5">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-5" href="#removecontroller-5">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-5" href="#connectedcallback-5">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-5" href="#disconnectedcallback-5">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### MenuTriggerElement {#menutriggerelement}

`<prosekit-menu-trigger>` custom element.

Properties: [MenuTriggerProps](#menutriggerprops)

Events: [MenuTriggerEvents](#menutriggerevents)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">MenuTriggerElement</a>(): [`MenuTriggerElement`](#menutriggerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled-4" href="#disabled-4">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-6" href="#addcontroller-6">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-6" href="#removecontroller-6">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-6" href="#connectedcallback-6">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-6" href="#disconnectedcallback-6">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

## Interfaces

### MenuItemProps {#menuitemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-2" href="#value-2">value</a>: `string`</code>

</dt>

<dd>

The unique value for this menu item.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-5" href="#disabled-5">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this menu item is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="closeonselect-1" href="#closeonselect-1">closeOnSelect</a>: `boolean`</code>

</dt>

<dd>

Whether to close the menu when the item is pressed.

###### Default

`true`

</dd>

</dl>

***

### MenuPopupProps {#menupopupprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget-1" href="#eventtarget-1">eventTarget</a>: [`EventTarget`](https://developer.mozilla.org/docs/Web/API/EventTarget) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `null`</code>

</dt>

<dd>

By default, the MenuPopup element will listen for keydown events.
You can pass a different element to listen for keydown events.

###### Default

`null`

</dd>

</dl>

***

### MenuPositionerProps {#menupositionerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser Popover API to place the floating element on
top of other page content.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### MenuRootProps {#menurootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-2" href="#defaultopen-2">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-2" href="#open-2">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-6" href="#disabled-6">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

***

### MenuSubmenuRootProps {#menusubmenurootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-3" href="#defaultopen-3">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-3" href="#open-3">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-7" href="#disabled-7">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

***

### MenuSubmenuTriggerProps {#menusubmenutriggerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-3" href="#value-3">value</a>: `string`</code>

</dt>

<dd>

The unique value for this submenu trigger in the parent menu.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-8" href="#disabled-8">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether this submenu trigger is disabled.

###### Default

`false`

</dd>

</dl>

***

### MenuTriggerProps {#menutriggerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled-9" href="#disabled-9">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

***

### MenuItemEvents {#menuitemevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a>: [`SelectEvent`](autocomplete.md#selectevent)</code>

</dt>

<dd>

Emitted when the the item is selected.

</dd>

</dl>

***

### MenuRootEvents {#menurootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange" href="#openchange">openChange</a>: [`OpenChangeEvent`](autocomplete.md#openchangeevent)</code>

</dt>

<dd>

Emitted when the menu is opened or closed.

</dd>

</dl>

***

### MenuSubmenuRootEvents {#menusubmenurootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange-1" href="#openchange-1">openChange</a>: [`OpenChangeEvent`](autocomplete.md#openchangeevent)</code>

</dt>

<dd>

Emitted when the submenu is opened or closed.

</dd>

</dl>

***

### MenuTriggerEvents {#menutriggerevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange-2" href="#openchange-2">openChange</a>: [`OpenChangeEvent`](autocomplete.md#openchangeevent)</code>

</dt>

<dd>

Emitted when the menu is opened or closed.

</dd>

</dl>

## Functions

### registerMenuRootElement() {#registermenurootelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenurootelement" href="#registermenurootelement">registerMenuRootElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuTriggerElement() {#registermenutriggerelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenutriggerelement" href="#registermenutriggerelement">registerMenuTriggerElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuPositionerElement() {#registermenupositionerelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenupositionerelement" href="#registermenupositionerelement">registerMenuPositionerElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuPopupElement() {#registermenupopupelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenupopupelement" href="#registermenupopupelement">registerMenuPopupElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuItemElement() {#registermenuitemelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenuitemelement" href="#registermenuitemelement">registerMenuItemElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuSubmenuRootElement() {#registermenusubmenurootelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenusubmenurootelement" href="#registermenusubmenurootelement">registerMenuSubmenuRootElement</a>(): `void`</code>

</dt>

</dl>

***

### registerMenuSubmenuTriggerElement() {#registermenusubmenutriggerelement}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="registermenusubmenutriggerelement" href="#registermenusubmenutriggerelement">registerMenuSubmenuTriggerElement</a>(): `void`</code>

</dt>

</dl>

## References

### OpenChangeEvent {#openchangeevent}

Re-exports [OpenChangeEvent](autocomplete.md#openchangeevent)

***

### SelectEvent {#selectevent}

Re-exports [SelectEvent](autocomplete.md#selectevent)
