# Table Handle v3 — Reuse aria-ui Menu Components

## Problem

The current table-handle component **reimplements** 3 components that already exist in `@aria-ui-v2/elements/menu`:

| prosekit (current) | aria-ui v2 equivalent | Duplicated logic |
|---|---|---|
| `TableHandlePopoverPopup` | `MenuPopupElement` | Keyboard nav (Arrow/Home/End/Enter/Escape), typeahead, aria-activedescendant, focus management |
| `TableHandlePopoverItem` | `MenuItemElement` | Collection management, active state, select event, mouseenter/click |
| `TableHandlePopoverPositioner` | `MenuPositionerElement` | Overlay positioning wrapper |

Additionally, `TableHandleColumnRoot` and `TableHandleRowRoot` each manually assemble an `OverlayStore` + `MenuStore` — logic that `MenuRootElement` already handles.

---

## Desired Component Tree

From the TODO in `index.ts`:

```html
<TableHandleRoot>                          <!-- hovering detection, store provider -->
  <TableHandleDragPreview />               <!-- drag visual feedback -->
  <TableHandleDropIndicator />             <!-- drop position line -->

  <!-- column handle -->
  <TableHandleColumnPositioner>            <!-- positions next to column header cell -->
    <TableHandleColumnPopup>               <!-- presence (show/hide) -->
      <MenuRoot>                           <!-- aria-ui: creates MenuStore -->
        <TableHandleColumnTrigger>         <!-- drag + menu trigger (click toggles menu) -->
          <div class="icon" />
        </TableHandleColumnTrigger>
        <MenuPositioner>                   <!-- aria-ui: positions menu -->
          <MenuPopup>                      <!-- aria-ui: keyboard nav, focus -->
            <MenuItem>Action 1</MenuItem>  <!-- aria-ui: item behavior -->
            <MenuItem>Action 2</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner>

  <!-- row handle (same pattern) -->
  <TableHandleRowPositioner>
    <TableHandleRowPopup>
      <MenuRoot>
        <TableHandleRowTrigger>
          <div class="icon" />
        </TableHandleRowTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>Action 3</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner>
</TableHandleRoot>
```

---

## Current vs Desired Component Mapping

| Current | Desired | Change |
|---|---|---|
| `TableHandleRoot` | `TableHandleRoot` | **Keep** — unchanged |
| `TableHandleColumnRoot` | `TableHandleColumnPositioner` + `TableHandleColumnPopup` | **Split** — separate positioning from menu |
| `TableHandleColumnTrigger` | `TableHandleColumnTrigger` (extends `MenuTrigger` behavior) | **Refactor** — add menu trigger on top of drag behavior |
| `TableHandleRowRoot` | `TableHandleRowPositioner` + `TableHandleRowPopup` | **Split** — same as column |
| `TableHandleRowTrigger` | `TableHandleRowTrigger` (extends `MenuTrigger` behavior) | **Refactor** |
| `TableHandlePopoverPopup` | `MenuPopupElement` (from aria-ui) | **Delete** — use aria-ui directly |
| `TableHandlePopoverItem` | `MenuItemElement` (from aria-ui) | **Delete** — use aria-ui directly |
| `TableHandlePopoverPositioner` | `MenuPositionerElement` (from aria-ui) | **Delete** — use aria-ui directly |
| `TableHandleDragPreview` | `TableHandleDragPreview` | **Keep** — unchanged |
| `TableHandleDropIndicator` | `TableHandleDropIndicator` | **Keep** — unchanged |

New elements from aria-ui (used directly, not wrapped):
- `MenuRootElement` — creates MenuStore, provided by user in template
- `MenuPopupElement` — keyboard navigation
- `MenuPositionerElement` — floating positioning
- `MenuItemElement` — individual actions
- `MenuTriggerElement` — only if trigger is NOT combined with drag (see below)

---

## Key Design Decisions

### 1. Trigger: Combined drag + menu, or separate?

**Current**: `TableHandleColumnTrigger` handles both drag (dragstart/dragend/pointerdown) AND menu toggle (click).

**Option A — Combined trigger** (recommended):
Keep `TableHandleColumnTrigger` as a prosekit-specific element that:
- Calls `setupMenuTrigger(host, ...)` from aria-ui internally for menu behavior
- Adds drag behavior on top (draggable, dragstart, dragend, pointerdown for selection)
- This avoids requiring users to nest two elements

**Option B — Separate elements**:
Use `MenuTriggerElement` from aria-ui for menu toggle, and a separate drag handle. More composable but more nesting for users.

**Decision**: Option A — the trigger is tightly coupled to prosekit editor behavior (selectTableColumn, drag preview). Reusing `setupMenuTrigger` internally keeps it simple.

### 2. Column/Row Root split

**Current**: `TableHandleColumnRoot` = positioning + overlay store + menu store + presence.

**Desired**: Split into:
- `TableHandleColumnPositioner` — positioning relative to hovered cell + presence (show/hide)
- `TableHandleColumnPopup` — just presence-based visibility wrapper (data-state open/closed)
- `MenuRoot` — menu store creation (from aria-ui, used by end user in template)

This means `TableHandleColumnPositioner` no longer creates a MenuStore. Instead, `MenuRoot` (from aria-ui) creates it as a child in the tree.

### 3. How the trigger sets the anchor element

In the current architecture, `TableHandleColumnRoot` sets the anchor element on its own overlay store. In the desired architecture:
- `TableHandleColumnPositioner` uses its own overlay store just for positioning the handle button
- `MenuRoot` creates a separate overlay store for the menu dropdown
- `MenuTrigger` (inside the column trigger) sets the anchor on the menu's overlay store

This is cleaner because the "position the handle next to the cell" concern is separated from the "position the dropdown menu relative to the trigger" concern.

### 4. Event compatibility

**Current**: `TableHandlePopoverItemSelectEvent` (event name: `'select'`, bubbles, cancelable)
**aria-ui**: `MenuItemSelectEvent` (event name: `'select'`, bubbles, cancelable)

These are compatible. Existing consumer code listening for `'select'` events will still work. `TableHandlePopoverItemSelectEvent` is removed from the codebase — consumers should use `MenuItemSelectEvent` from the new `@prosekit/web/menu` module instead.

---

## Implementation Plan

### Phase 1: Prepare aria-ui Menu elements for prosekit use

1. Ensure `@aria-ui-v2/elements/menu` exports all necessary setup functions and types:
   - `setupMenuRoot`, `MenuRootPropsDeclaration`, `MenuRootElement`, `registerMenuRootElement`
   - `setupMenuTrigger`, `MenuTriggerPropsDeclaration`
   - `setupMenuPositioner`, `MenuPositionerPropsDeclaration`, `MenuPositionerElement`, `registerMenuPositionerElement`
   - `setupMenuPopup`, `MenuPopupPropsDeclaration`, `MenuPopupElement`, `registerMenuPopupElement`
   - `setupMenuItem`, `MenuItemPropsDeclaration`, `MenuItemElement`, `registerMenuItemElement`
   - `MenuItemSelectEvent`
   - `MenuStoreContext`, `createMenuStore`, `closeMenuTree`

2. Create `packages/web/src/components/menu/index.ts` following the same pattern as `packages/web/src/components/tooltip/index.ts`:
   - Re-export all aria-ui menu types, setup functions, props declarations, and element classes from `@aria-ui-v2/elements/menu`
   - Register each element with `prosekit-` prefix (e.g. `prosekit-menu-root`, `prosekit-menu-trigger`, `prosekit-menu-positioner`, `prosekit-menu-popup`, `prosekit-menu-item`)
   - Export register functions (`registerMenuRootElement`, `registerMenuTriggerElement`, etc.)
   - This keeps naming consistent with other prosekit components and ensures the CLI wrapper generation works

3. Add `menu` to the `components` array in `packages/web/build.mjs` so framework wrappers (React/Preact/Vue/Solid/Svelte) are generated for the menu components.

4. Add `"./menu": "./src/components/menu/index.ts"` to `package.json` exports.

### Phase 2: Create new positioning components

**`table-handle-column-positioner.ts`** (replaces positioning part of `TableHandleColumnRoot`):
- Props: `editor`, `placement` (default "top"), overlay positioning props
- Consumes `tableHandleStoreContext` to get `colFirstCellPos`
- Resolves reference cell DOM element
- Creates its own overlay store for positioning
- Uses `setupOverlayPositioner` to position itself
- Manages presence (show/hide based on reference cell existence)
- Does NOT create a MenuStore

**`table-handle-column-popup.ts`** (new — presence wrapper):
- Minimal: consumes parent positioner's open state via a context or computed
- Sets `data-state` attribute ("open"/"closed")
- Uses `usePresence` for animation support

**`table-handle-row-positioner.ts`** and **`table-handle-row-popup.ts`** — same pattern for rows.

### Phase 3: Refactor triggers

**`table-handle-column-trigger.ts`** (refactored):
- Internally calls `setupMenuTrigger(host, triggerProps)` for menu behavior (aria-expanded, aria-controls, click toggle, anchor setting)
- Keeps drag behavior: `host.draggable = true`, dragstart (set dnd state), pointerdown (selectTableColumn)
- Uses empty drag image

**`table-handle-row-trigger.ts`** — same pattern.

### Phase 4: Delete reimplemented components

Remove:
- `table-handle-popover-popup.ts` → replaced by `MenuPopupElement` from aria-ui
- `table-handle-popover-item.ts` → replaced by `MenuItemElement` from aria-ui
- `table-handle-popover-positioner.ts` → replaced by `MenuPositionerElement` from aria-ui

### Phase 5: Update index.ts and build

Update `index.ts` to:
- Export new components (`TableHandleColumnPositioner`, `TableHandleColumnPopup`, `TableHandleRowPositioner`, `TableHandleRowPopup`)
- Re-export aria-ui menu components needed by users (`MenuRootElement`, `MenuPopupElement`, `MenuPositionerElement`, `MenuItemElement`, `MenuItemSelectEvent`)
- Remove old exports (`TableHandlePopoverPopup`, `TableHandlePopoverItem`, `TableHandlePopoverPositioner`)
- Remove old `TableHandleColumnRoot`, `TableHandleRowRoot`

Update `build.mjs` — add `'menu'` to the `components` array so framework wrappers are generated for the new menu module.

### Phase 6: Update framework wrappers

Run `pnpm -w run build:package` to regenerate React/Preact/Vue/Solid/Svelte wrappers.

### Phase 7: Update examples/registry

Update any example code that uses the old component names to the new structure.

---

## File Changes Summary

### New files:
- `table-handle-column-positioner.ts` — positioning for column handle
- `table-handle-column-popup.ts` — presence wrapper for column handle
- `table-handle-row-positioner.ts` — positioning for row handle
- `table-handle-row-popup.ts` — presence wrapper for row handle

### Modified files:
- `table-handle-column-trigger.ts` — add `setupMenuTrigger` call internally
- `table-handle-row-trigger.ts` — add `setupMenuTrigger` call internally
- `index.ts` — update exports
- `store.ts` — possibly simplify (no longer needs to provide MenuStore)

### Deleted files:
- `table-handle-column-root.ts` — split into positioner + popup
- `table-handle-row-root.ts` — split into positioner + popup
- `table-handle-popover-popup.ts` — replaced by aria-ui MenuPopup
- `table-handle-popover-item.ts` — replaced by aria-ui MenuItem
- `table-handle-popover-positioner.ts` — replaced by aria-ui MenuPositioner

### Unchanged files:
- `table-handle-root.ts`
- `table-handle-drag-preview.ts`
- `table-handle-drop-indicator.ts`
- `store.ts`, `utils.ts`, `dnd-v2.ts`
- `use-drop.ts`, `use-empty-image.ts`, `calc-drag-over.ts`, `render-preview.ts`

---

## Risks and Mitigations

### 1. Menu popup keyboard navigation differences

**Risk**: The current `TableHandlePopoverPopup` has a custom `eventTarget` for document-level keydown forwarding. The aria-ui `MenuPopup` also supports `eventTarget` prop, so this should work.

**Mitigation**: Verify that the `MenuPopup`'s `eventTarget` prop handles the same use case.

### 2. Collection element selector

**Risk**: aria-ui `MenuItemElement` rebuilds collection using `popup.querySelectorAll('aria-ui-menu-item, aria-ui-menu-submenu-trigger')`. Elements registered as `prosekit-menu-item` won't match this selector.

**Mitigation**: The elements are registered with BOTH tag names — `registerCustomElement` in aria-ui registers with `aria-ui-menu-item`, and prosekit's `registerMenuItemElement` registers the same class with `prosekit-menu-item`. The `querySelectorAll` in `setupMenuItem` uses `host.closest('aria-ui-menu-popup')` and queries for `aria-ui-menu-item`. Since users will use `prosekit-menu-popup` and `prosekit-menu-item` tags, the `closest()` and `querySelectorAll()` selectors won't match.

**Solution**: This needs an upstream change in aria-ui to make the collection selector configurable or tag-name-agnostic. Alternatively, override `setupMenuItem`/`setupMenuPopup` in prosekit with patched selectors. This is the main blocker to investigate before implementation.

### 3. Breaking change for consumers

**Risk**: Removing `TableHandlePopoverPopup`, `TableHandlePopoverItem`, `TableHandlePopoverPositioner`, `TableHandleColumnRoot`, `TableHandleRowRoot` is a breaking change.

**Mitigation**: This is expected. The v2 migration is already a major change. Document the migration path.

### 4. Focus management

**Risk**: Menu popup's focus behavior (focus popup on open, return focus on close) may interact unexpectedly with the ProseMirror editor's focus model.

**Mitigation**: Test thoroughly. The current implementation already handles this (popup has `tabIndex=0`), so the aria-ui version should behave similarly.

---

## Verification

After implementation, run in order:
1. `pnpm -w run build:package`
2. `pnpm -w fix`
3. `pnpm -w typecheck`
4. `pnpm -w lint`
5. Manual testing of table handle in examples
