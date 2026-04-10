---
"prosekit": minor
"@prosekit/lit": minor
"@prosekit/preact": minor
"@prosekit/react": minor
"@prosekit/solid": minor
"@prosekit/svelte": minor
"@prosekit/vue": minor
"@prosekit/web": minor
---

**Breaking change**: the component library has been rewritten. Every overlay-based component has been split into smaller, composable parts (`Root`, `Trigger`, `Positioner`, `Popup`, ...), and the previous single-component APIs no longer exist. Several prop locations and event payloads have changed as well. If you use any of the overlay primitives, please read the migration guide below carefully.

## Why this change?

Splitting each overlay primitive into a `Root` / `Trigger` / `Positioner` / `Popup` anatomy unlocks proper enter and exit animations, which the previous single-component API could not express cleanly. The `Popup` is now a separate element from the `Positioner`, so you can apply transforms, opacity transitions, and CSS animations to the `Popup` without fighting the absolute positioning that `Positioner` controls.

The mount state is exposed as a `data-state` attribute on the `Popup` (values: `"open"` or `"closed"`), and the element stays in the DOM long enough for an exit animation to finish before it is removed. That means you can drive both enter and exit transitions directly in CSS:

```css
.my-popup {
  transition: opacity 150ms, transform 150ms;
}
.my-popup[data-state='open'] {
  opacity: 1;
  transform: scale(1);
}
.my-popup[data-state='closed'] {
  opacity: 0;
  transform: scale(0.95);
}
```

## Common patterns

Every primitive that has been split into anatomy parts follows the same conventions. Knowing them once before reading the per-component sections below makes the migration much easier:

- **Floating-element positioning props** (`placement`, `offset`, ...) live on the `Positioner` part.
- **`open`, `defaultOpen`, `disabled`** live on the `Root` part.
- **`openOnHover`, `delay`, `closeDelay`** for popovers and tooltips live on the `Trigger` part. `PopoverTrigger` and `TooltipTrigger` also expose their own `onOpenChange` callback in addition to the one on `Root`, so you can listen for hover-driven open changes directly on the trigger.
- **Visual styling** (`className` / `class`, `data-*`, ...) for the floating element belongs on the `Popup` part rather than the old `Content` / single component.
- **Event callbacks now receive an event object instead of a plain value.** Each `*Change` event now dispatches a dedicated `Event` subclass (`OpenChangeEvent`, `QueryChangeEvent`, `ValueChangeEvent`, ...) whose payload is exposed on the standard `detail` property of the event:
  - `onOpenChange={(open) => ...}` becomes `onOpenChange={(event) => ... event.detail ...}`
  - `onQueryChange={(query) => ...}` becomes `onQueryChange={(event) => ... event.detail ...}`
  - `onValueChange={(value) => ...}` becomes `onValueChange={(event) => ... event.detail ...}`

## New `Menu` component

A brand new menu primitive has been added under a new entrypoint, `prosekit/<framework>/menu`. It exports `MenuRoot`, `MenuTrigger`, `MenuPositioner`, `MenuPopup`, and `MenuItem`, plus `MenuSubmenuRoot` and `MenuSubmenuTrigger` for nested menus. It is the recommended building block for any in-editor menu, and the new table handle column / row menus are built on top of it.

```jsx
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
  MenuRoot,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from 'prosekit/react/menu'

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

## Item focus styling: `data-focused` is now `data-highlighted`

The currently keyboard-focused item in a listbox or menu is now marked with a `data-highlighted` attribute instead of the old `data-focused` attribute. This affects `AutocompleteItem` (which previously used `data-focused`) and the new `MenuItem`. The old `TableHandlePopoverItem` also used `data-focused`; its replacement, `MenuItem`, uses `data-highlighted`.

If you styled the active item via `[data-focused]` (including Tailwind variants such as `data-focused:bg-slate-100`), rename the selector or variant:

```diff
- .my-item[data-focused] { background: var(--slate-100); }
+ .my-item[data-highlighted] { background: var(--slate-100); }
```

```diff
- <AutocompleteItem className="data-focused:bg-slate-100" ... />
+ <AutocompleteItem className="data-highlighted:bg-slate-100" ... />
```

## Migration guide

The sections below walk through each primitive in detail. The examples are written in React, but the same anatomy and prop locations apply to Vue, Svelte, Solid, Preact, and Lit. Only the binding syntax differs.

### Migrating `Popover`

- **Removed**: `PopoverContent`
- **Added**: `PopoverPositioner`, `PopoverPopup`

```diff
- import {
-   PopoverContent,
-   PopoverRoot,
-   PopoverTrigger,
- } from 'prosekit/react/popover'
+ import {
+   PopoverPopup,
+   PopoverPositioner,
+   PopoverRoot,
+   PopoverTrigger,
+ } from 'prosekit/react/popover'

- <PopoverRoot open={open} onOpenChange={(open) => setOpen(open)}>
+ <PopoverRoot open={open} onOpenChange={(event) => setOpen(event.detail)}>
    <PopoverTrigger>...</PopoverTrigger>
-   <PopoverContent placement="bottom" className="my-popover">...</PopoverContent>
+   <PopoverPositioner placement="bottom">
+     <PopoverPopup className="my-popover">...</PopoverPopup>
+   </PopoverPositioner>
  </PopoverRoot>
```

### Migrating `InlinePopover`

- **Removed**: `InlinePopover`
- **Added**: `InlinePopoverRoot`, `InlinePopoverPositioner`, `InlinePopoverPopup`

```diff
- import { InlinePopover } from 'prosekit/react/inline-popover'
+ import {
+   InlinePopoverPopup,
+   InlinePopoverPositioner,
+   InlinePopoverRoot,
+ } from 'prosekit/react/inline-popover'

- <InlinePopover
-   placement="bottom"
-   className="my-popover"
-   open={open}
-   onOpenChange={(open) => { setOpen(open) }}
- >
-   ...
- </InlinePopover>
+ <InlinePopoverRoot
+   open={open}
+   onOpenChange={(event) => { setOpen(event.detail) }}
+ >
+   <InlinePopoverPositioner placement="bottom">
+     <InlinePopoverPopup className="my-popover">
+       ...
+     </InlinePopoverPopup>
+   </InlinePopoverPositioner>
+ </InlinePopoverRoot>
```

### Migrating `Tooltip`

- **Removed**: `TooltipContent`
- **Added**: `TooltipPositioner`, `TooltipPopup`

```diff
- import {
-   TooltipContent,
-   TooltipRoot,
-   TooltipTrigger,
- } from 'prosekit/react/tooltip'
+ import {
+   TooltipPopup,
+   TooltipPositioner,
+   TooltipRoot,
+   TooltipTrigger,
+ } from 'prosekit/react/tooltip'

- <TooltipRoot>
-   <TooltipTrigger>...</TooltipTrigger>
-   <TooltipContent className="my-tooltip">...</TooltipContent>
- </TooltipRoot>
+ <TooltipRoot>
+   <TooltipTrigger>...</TooltipTrigger>
+   <TooltipPositioner>
+     <TooltipPopup className="my-tooltip">...</TooltipPopup>
+   </TooltipPositioner>
+ </TooltipRoot>
```

### Migrating `BlockHandle`

- **Removed**: `BlockHandlePopover`
- **Added**: `BlockHandleRoot`, `BlockHandlePositioner`, `BlockHandlePopup`

```diff
- import {
-   BlockHandleAdd,
-   BlockHandleDraggable,
-   BlockHandlePopover,
- } from 'prosekit/react/block-handle'
+ import {
+   BlockHandleAdd,
+   BlockHandleDraggable,
+   BlockHandlePopup,
+   BlockHandlePositioner,
+   BlockHandleRoot,
+ } from 'prosekit/react/block-handle'

- <BlockHandlePopover
-   placement="left"
-   className="my-handle"
-   onStateChange={...}
- >
-   <BlockHandleAdd>...</BlockHandleAdd>
-   <BlockHandleDraggable>...</BlockHandleDraggable>
- </BlockHandlePopover>
+ <BlockHandleRoot
+   onStateChange={...}
+ >
+   <BlockHandlePositioner placement="left">
+     <BlockHandlePopup className="my-handle">
+       <BlockHandleAdd>...</BlockHandleAdd>
+       <BlockHandleDraggable>...</BlockHandleDraggable>
+     </BlockHandlePopup>
+   </BlockHandlePositioner>
+ </BlockHandleRoot>
```

### Migrating `Autocomplete`

- **Removed**: `AutocompletePopover`, `AutocompleteList`
- **Added**: `AutocompleteRoot`, `AutocompletePositioner`, `AutocompletePopup`

```diff
- import {
-   AutocompleteList,
-   AutocompletePopover,
- } from 'prosekit/react/autocomplete'
+ import {
+   AutocompletePopup,
+   AutocompletePositioner,
+   AutocompleteRoot,
+ } from 'prosekit/react/autocomplete'

- <AutocompletePopover
-   regex={regex}
-   className="my-menu"
-   onQueryChange={(query) => setQuery(query)}
- >
-   <AutocompleteList onValueChange={(value) => setValue(value)}>
-     <AutocompleteItem ... />
-     <AutocompleteEmpty ... />
-   </AutocompleteList>
- </AutocompletePopover>
+ <AutocompleteRoot
+   regex={regex}
+   onQueryChange={(event) => setQuery(event.detail)}
+   onValueChange={(event) => setValue(event.detail)}
+ >
+   <AutocompletePositioner>
+     <AutocompletePopup className="my-menu">
+       <AutocompleteItem ... />
+       <AutocompleteEmpty ... />
+     </AutocompletePopup>
+   </AutocompletePositioner>
+ </AutocompleteRoot>
```

### Migrating `TableHandle`

- **Removed**: `TableHandleColumnRoot`, `TableHandleColumnTrigger`, `TableHandleRowRoot`, `TableHandleRowTrigger`, `TableHandlePopoverContent`, `TableHandlePopoverItem`
- **Added**: `TableHandleColumnPositioner`, `TableHandleColumnPopup`, `TableHandleColumnMenuRoot`, `TableHandleColumnMenuTrigger`, `TableHandleRowPositioner`, `TableHandleRowPopup`, `TableHandleRowMenuRoot`, `TableHandleRowMenuTrigger`

The contents of the column / row menu are no longer a fixed pair of `TableHandlePopoverContent` / `TableHandlePopoverItem`. Build your menu yourself using the new `Menu*` parts from `prosekit/<framework>/menu`.

```diff
- import {
-   TableHandleColumnRoot,
-   TableHandleColumnTrigger,
-   TableHandleDragPreview,
-   TableHandleDropIndicator,
-   TableHandlePopoverContent,
-   TableHandlePopoverItem,
-   TableHandleRoot,
-   TableHandleRowRoot,
-   TableHandleRowTrigger,
- } from 'prosekit/react/table-handle'
+ import {
+   TableHandleColumnMenuRoot,
+   TableHandleColumnMenuTrigger,
+   TableHandleColumnPopup,
+   TableHandleColumnPositioner,
+   TableHandleDragPreview,
+   TableHandleDropIndicator,
+   TableHandleRoot,
+   TableHandleRowMenuRoot,
+   TableHandleRowMenuTrigger,
+   TableHandleRowPopup,
+   TableHandleRowPositioner,
+ } from 'prosekit/react/table-handle'
+ import {
+   MenuItem,
+   MenuPopup,
+   MenuPositioner,
+ } from 'prosekit/react/menu'

  <TableHandleRoot>
    <TableHandleDragPreview />
    <TableHandleDropIndicator />
-   <TableHandleColumnRoot>
-     <TableHandleColumnTrigger>...</TableHandleColumnTrigger>
-     <TableHandlePopoverContent>
-       <TableHandlePopoverItem onSelect={...}>Insert Left</TableHandlePopoverItem>
-       ...
-     </TableHandlePopoverContent>
-   </TableHandleColumnRoot>
+   <TableHandleColumnPositioner>
+     <TableHandleColumnPopup>
+       <TableHandleColumnMenuRoot>
+         <TableHandleColumnMenuTrigger>...</TableHandleColumnMenuTrigger>
+         <MenuPositioner>
+           <MenuPopup>
+             <MenuItem onSelect={...}>Insert Left</MenuItem>
+             ...
+           </MenuPopup>
+         </MenuPositioner>
+       </TableHandleColumnMenuRoot>
+     </TableHandleColumnPopup>
+   </TableHandleColumnPositioner>

    {/* Same shape for the row tree, using TableHandleRow* + Menu* parts */}
  </TableHandleRoot>
```
