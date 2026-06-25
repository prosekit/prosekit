---
title: prosekit/preact/menu
sidebar:
  label: preact/menu
---

## Anatomy

```jsx
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
  MenuRoot,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from 'prosekit/preact/menu'

<MenuRoot>
  <MenuTrigger>...</MenuTrigger>
  <MenuPositioner>
    <MenuPopup>
      <MenuItem>...</MenuItem>
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>...</MenuSubmenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuSubmenuRoot>
    </MenuPopup>
  </MenuPositioner>
</MenuRoot>
```

## Interfaces

### MenuItemProps {#menuitemprops}

Props for the [MenuItem](#menuitem) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The unique value for this menu item.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this menu item is disabled.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="closeonselect" href="#closeonselect">closeOnSelect</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to close the menu when the item is pressed.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onselect" href="#onselect">onSelect</a><i>?</i>: (`event`: [`SelectEvent`](../web/autocomplete.md#selectevent)) => `void`</code>

</dt>

<dd>

Emitted when the the item is selected.

</dd>

</dl>

***

### MenuPopupProps {#menupopupprops}

Props for the [MenuPopup](#menupopup) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: [`EventTarget`](https://developer.mozilla.org/docs/Web/API/EventTarget) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `null`</code>

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

Props for the [MenuPositioner](#menupositioner) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

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

Props for the [MenuRoot](#menuroot) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a><i>?</i>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the menu is opened or closed.

</dd>

</dl>

***

### MenuSubmenuRootProps {#menusubmenurootprops}

Props for the [MenuSubmenuRoot](#menusubmenuroot) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-1" href="#open-1">open</a><i>?</i>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-2" href="#disabled-2">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange-1" href="#onopenchange-1">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the submenu is opened or closed.

</dd>

</dl>

***

### MenuSubmenuTriggerProps {#menusubmenutriggerprops}

Props for the [MenuSubmenuTrigger](#menusubmenutrigger) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The unique value for this submenu trigger in the parent menu.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-3" href="#disabled-3">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this submenu trigger is disabled.

###### Default

`false`

</dd>

</dl>

***

### MenuTriggerProps {#menutriggerprops}

Props for the [MenuTrigger](#menutrigger) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="disabled-4" href="#disabled-4">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange-2" href="#onopenchange-2">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the menu is opened or closed.

</dd>

</dl>

## Variables

### MenuItem {#menuitem}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menuitem" href="#menuitem">MenuItem</a>: `ForwardRefExoticComponent`\<[`MenuItemProps`](#menuitemprops) & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`HTMLAttributes`\<[`MenuItemElement`](../web/menu.md#menuitemelement)\>, `"onSelect"`\> & `RefAttributes`\<[`MenuItemElement`](../web/menu.md#menuitemelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-item` custom element.

</dd>

</dl>

***

### MenuPopup {#menupopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menupopup" href="#menupopup">MenuPopup</a>: `ForwardRefExoticComponent`\<[`MenuPopupProps`](#menupopupprops) & `HTMLAttributes`\<[`MenuPopupElement`](../web/menu.md#menupopupelement)\> & `RefAttributes`\<[`MenuPopupElement`](../web/menu.md#menupopupelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-popup` custom element.

</dd>

</dl>

***

### MenuPositioner {#menupositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menupositioner" href="#menupositioner">MenuPositioner</a>: `ForwardRefExoticComponent`\<[`MenuPositionerProps`](#menupositionerprops) & `HTMLAttributes`\<[`MenuPositionerElement`](../web/menu.md#menupositionerelement)\> & `RefAttributes`\<[`MenuPositionerElement`](../web/menu.md#menupositionerelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-positioner` custom element.

</dd>

</dl>

***

### MenuRoot {#menuroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menuroot" href="#menuroot">MenuRoot</a>: `ForwardRefExoticComponent`\<[`MenuRootProps`](#menurootprops) & `HTMLAttributes`\<[`MenuRootElement`](../web/menu.md#menurootelement)\> & `RefAttributes`\<[`MenuRootElement`](../web/menu.md#menurootelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-root` custom element.

</dd>

</dl>

***

### MenuSubmenuRoot {#menusubmenuroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menusubmenuroot" href="#menusubmenuroot">MenuSubmenuRoot</a>: `ForwardRefExoticComponent`\<[`MenuSubmenuRootProps`](#menusubmenurootprops) & `HTMLAttributes`\<[`MenuSubmenuRootElement`](../web/menu.md#menusubmenurootelement)\> & `RefAttributes`\<[`MenuSubmenuRootElement`](../web/menu.md#menusubmenurootelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-submenu-root` custom element.

</dd>

</dl>

***

### MenuSubmenuTrigger {#menusubmenutrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menusubmenutrigger" href="#menusubmenutrigger">MenuSubmenuTrigger</a>: `ForwardRefExoticComponent`\<[`MenuSubmenuTriggerProps`](#menusubmenutriggerprops) & `HTMLAttributes`\<[`MenuSubmenuTriggerElement`](../web/menu.md#menusubmenutriggerelement)\> & `RefAttributes`\<[`MenuSubmenuTriggerElement`](../web/menu.md#menusubmenutriggerelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-submenu-trigger` custom element.

</dd>

</dl>

***

### MenuTrigger {#menutrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="menutrigger" href="#menutrigger">MenuTrigger</a>: `ForwardRefExoticComponent`\<[`MenuTriggerProps`](#menutriggerprops) & `HTMLAttributes`\<[`MenuTriggerElement`](../web/menu.md#menutriggerelement)\> & `RefAttributes`\<[`MenuTriggerElement`](../web/menu.md#menutriggerelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-menu-trigger` custom element.

</dd>

</dl>
