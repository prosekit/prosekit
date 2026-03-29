# Plan: Unify Framework Wrapper Logic into `@aria-ui-v2/integrations`

## 1. Problem

The CLI code generator (`aria-ui/packages/cli/src/generate.ts`) generates nearly identical logic across 5 frameworks for:

1. **Property setting** — Setting JS properties (not HTML attributes) on the custom element
2. **Event binding** — Adding/removing `addEventListener` for custom events
3. **Cleanup** — Removing event listeners on unmount or element change

Each framework currently reimplements this from scratch in generated code:

### React/Preact (already abstracted)

React and Preact already use `createComponent()` in `@aria-ui-v2/integrations/{react,preact}`. This function handles prop setting, event binding, and cleanup via `useLayoutEffect`. The generated code is minimal:

```typescript
// Generated code (React)
const propNames: string[] = ["disabled", "value"]
const eventNameMap: Record<string, string> = { onItemSelect: "itemSelect" }

function Component(props, forwardedRef) {
  registerElement()
  return createElement(ReactWrapper, {
    as: "prosekit-table-handle-popover-item",
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  })
}
```

### Solid (all inline)

Solid generates inline code using `splitProps` + `mergeProps` + `"prop:xxx"` / `"on:xxx"` syntax:

```typescript
// Generated code (Solid)
export const Component: Component<Props> = (props): any => {
  registerElement()
  const [elementProps, eventHandlers, restProps] = splitProps(
    props, ["disabled", "value"], ["onItemSelect"],
  )
  return h("prosekit-table-handle-popover-item",
    mergeProps(restProps, {
      "prop:disabled": () => elementProps.disabled,
      "prop:value": () => elementProps.value,
      "on:itemSelect": (event) => eventHandlers.onItemSelect?.(event),
    }),
  )
}
```

Solid's `"prop:xxx"` syntax sets JS properties, and `"on:xxx"` adds event listeners. This is Solid's own built-in custom element support — **no manual prop/event handling needed**.

### Vue (inline, manual prop setting + event binding)

Vue generates the most complex code — a `defineComponent` with a render function that manually:
- Iterates props via `switch/case` to separate element props (prefixed with `"."`) from event handlers
- Uses a ref callback with `AbortController` for event listener lifecycle

```typescript
// Generated code (Vue)
(props, { slots }) => {
  registerElement()
  const _eventHandlers: Record<string, Function> = {}
  let _abortController: AbortController | undefined

  const _ref = (element: HTMLElement | null | undefined) => {
    _abortController?.abort()
    _abortController = undefined
    if (!element) return
    _abortController = new AbortController()
    const abortSignal = _abortController.signal
    element.addEventListener("itemSelect", (event) => {
      _eventHandlers["onItemSelect"]?.(event)
    }, { signal: abortSignal })
  }

  return () => {
    const _props: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      switch (key) {
        case "disabled":
        case "value":
          _props["." + key] = value
          break
        case "onItemSelect":
          _eventHandlers[key] = value as Function
          break
        default:
          _props[key] = value
      }
    }
    _props["ref"] = _ref
    return h("prosekit-table-handle-popover-item", _props, slots.default?.())
  }
}
```

### Svelte (inline, manual prop setting + event binding)

Svelte generates an `@attach` callback that directly sets properties and adds event listeners:

```svelte
<script lang="js">
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()
  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const attachment = (element) => {
    if (!element) return
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    if (p0 !== undefined) { element.disabled = p0 }
    if (p1 !== undefined) { element.value = p1 }
    if (p2 !== undefined) { element.addEventListener('itemSelect', p2, { signal: abortSignal }) }
    return () => { abortController.abort() }
  }
</script>

<prosekit-table-handle-popover-item {...restProps} {@attach attachment}>
  {@render children?.()}
</prosekit-table-handle-popover-item>
```

---

## 2. What's Duplicated

| Concern | React/Preact | Solid | Vue | Svelte |
|---------|-------------|-------|-----|--------|
| Set JS properties on element | `useLayoutEffect` in `createComponent` | Solid's built-in `"prop:xxx"` | Manual via `"." + key` in render | Direct `element.prop = val` in attachment |
| Add event listeners | `useLayoutEffect` in `createComponent` | Solid's built-in `"on:xxx"` | Manual `addEventListener` in ref callback | Manual `addEventListener` in attachment |
| Clean up event listeners | `useLayoutEffect` cleanup | Solid handles it | `AbortController` in ref callback | `AbortController` return from attachment |
| Separate element props from passthrough | `propNames.includes()` in `createComponent` | `splitProps()` | `switch/case` in render | Destructured in `$props()` |

**Solid is special**: it already has built-in custom element property/event support via `"prop:xxx"` and `"on:xxx"`. No manual DOM manipulation needed.

**Vue and Svelte** duplicate the most logic: manual property setting + manual addEventListener + manual AbortController cleanup.

---

## 3. Proposed Solution: `setupElementProps` Pure Function

A single pure function that sets JS properties and adds event listeners on a custom element, returning a cleanup function.

```typescript
// @aria-ui-v2/integrations/setup

/**
 * Sets JS properties and adds event listeners on a custom element.
 * Returns a cleanup function that removes all event listeners.
 *
 * @param element - The custom element to configure
 * @param props - All props from the framework (element props + event handlers + passthrough)
 * @param propNames - Names of properties to set on the element
 * @param eventNameMap - Maps handler prop names (e.g. "onItemSelect") to DOM event names (e.g. "itemSelect")
 */
export function setupElementProps(
  element: HTMLElement,
  props: Record<string, unknown>,
  propNames: readonly string[],
  eventNameMap: Readonly<Record<string, string>>,
): VoidFunction {
  for (const name of propNames) {
    if (name in props) {
      ;(element as Record<string, unknown>)[name] = props[name]
    }
  }

  const ac = new AbortController()

  for (const [handlerName, eventName] of Object.entries(eventNameMap)) {
    const handler = props[handlerName]
    if (typeof handler === 'function') {
      element.addEventListener(eventName, handler as EventListener, { signal: ac.signal })
    }
  }

  return () => ac.abort()
}
```

No class. No stored state. The caller manages the returned cleanup function. Bundlers can tree-shake it trivially since it's a standalone export with no side effects.

### Integration with each framework

#### React/Preact

Refactor the existing `createComponent` internals. External API unchanged — generated code stays the same.

```typescript
// integrations/react.ts — AFTER refactor (internal change only)
import { setupElementProps } from './setup.ts'

// Inside the forwardRef component:
useLayoutEffect(() => {
  const element = elementRef.current
  if (!element) return
  // cleanup = abort previous listeners, then setup new ones
  return setupElementProps(element, props, propNames, eventNameMap)
})
```

This replaces the current 3 separate `useLayoutEffect` hooks (prop setting, event handler ref update, event listener registration) with a single one.

Current `createComponent` in `react.ts` (95 lines of prop/event logic):
```typescript
// Current: 3 useLayoutEffect hooks
useLayoutEffect(() => {  // Set all properties
  const element = elementRef.current
  if (!element) return
  for (const [name, value] of Object.entries(elementProps)) {
    ;(element as Record<string, unknown>)[name] = value
  }
})

useLayoutEffect(() => {  // Set all event listeners ref
  eventHandlersRef.current = eventHandlers
})

useLayoutEffect(() => {  // Register all event listeners
  const element = elementRef.current
  if (!element) return
  const eventNames: string[] = Object.values(eventNameMap)
  const eventHandlers: Array<[string, EventHandler]> = []
  for (const eventName of eventNames) {
    const handler = (event: Event) => {
      eventHandlersRef.current[eventName]?.(event)
    }
    eventHandlers.push([eventName, handler])
  }
  for (const [eventName, handler] of eventHandlers) {
    element.addEventListener(eventName, handler)
  }
  return () => {
    for (const [eventName, handler] of eventHandlers) {
      element.removeEventListener(eventName, handler)
    }
  }
}, [])
```

After:
```typescript
// After: 1 useLayoutEffect
useLayoutEffect(() => {
  const element = elementRef.current
  if (!element) return
  return setupElementProps(element, props, propNames, eventNameMap)
})
```

#### Solid — keep as-is

Solid's `"prop:xxx"` and `"on:xxx"` are reactive and framework-native. No change.

#### Vue

Replace the inline switch/case + ref callback + `_eventHandlers` with `setupElementProps`:

**Current generated code (Vue, component with events):**
```typescript
(props, { slots }) => {
  registerElement()
  const _eventHandlers: Record<string, Function> = {}
  let _abortController: AbortController | undefined

  const _ref = (element: HTMLElement | null | undefined) => {
    _abortController?.abort()
    _abortController = undefined
    if (!element) return
    _abortController = new AbortController()
    const abortSignal = _abortController.signal
    element.addEventListener("itemSelect", (event) => {
      _eventHandlers["onItemSelect"]?.(event)
    }, { signal: abortSignal })
  }

  return () => {
    const _props: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      switch (key) {
        case "disabled":
        case "value":
          _props["." + key] = value
          break
        case "onItemSelect":
          _eventHandlers[key] = value as Function
          break
        default:
          _props[key] = value
      }
    }
    _props["ref"] = _ref
    return h("prosekit-table-handle-popover-item", _props, slots.default?.())
  }
}
```

**After refactor:**
```typescript
import { setupElementProps } from '@aria-ui-v2/integrations/setup'

const _propNames = ["disabled", "value"]
const _eventNameMap = { onItemSelect: "itemSelect" }
const _managedKeys = new Set([..._propNames, ...Object.keys(_eventNameMap)])

// ...
(props, { slots }) => {
  registerElement()
  let _cleanup: VoidFunction | undefined

  const _ref = (element: HTMLElement | null | undefined) => {
    _cleanup?.()
    _cleanup = undefined
    if (!element) return
    _cleanup = setupElementProps(element, props, _propNames, _eventNameMap)
  }

  return () => {
    const _props: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      if (!_managedKeys.has(key)) {
        _props[key] = value
      }
    }
    _props["ref"] = _ref
    return h("prosekit-table-handle-popover-item", _props, slots.default?.())
  }
}
```

Changes:
- No more `_eventHandlers` record
- No more `_abortController` management
- No more `switch/case` — replaced with `_managedKeys.has()` filter
- No more manual `addEventListener` calls
- The `_ref` callback is just: cleanup old → `setupElementProps` → store cleanup

**For components WITHOUT events** (no `_eventNameMap`), the generated code is even simpler — `_ref` just calls `setupElementProps` with an empty event map, and the passthrough filter only checks `_propNames`.

#### Svelte

**Current generated code (Svelte attachment):**
```svelte
<script lang="js">
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const attachment = (element) => {
    if (!element) return
    const abortController = new AbortController()
    const abortSignal = abortController.signal
    if (p0 !== undefined) { element.disabled = p0 }
    if (p1 !== undefined) { element.value = p1 }
    if (p2 !== undefined) { element.addEventListener('itemSelect', p2, { signal: abortSignal }) }
    return () => { abortController.abort() }
  }
</script>
```

**After refactor:**
```svelte
<script lang="js">
  import { setupElementProps } from '@aria-ui-v2/integrations/setup'
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const attachment = (element) => {
    if (!element) return
    return setupElementProps(
      element,
      { disabled: p0, value: p1, onItemSelect: p2 },
      ["disabled", "value"],
      { onItemSelect: "itemSelect" },
    )
  }
</script>
```

Changes:
- No more manual `AbortController`
- No more manual property assignment per prop
- No more manual `addEventListener` per event
- Single `setupElementProps` call replaces all of it

---

## 4. Assessment

| Framework | Current State | Benefit |
|-----------|--------------|---------|
| React | 3 `useLayoutEffect` hooks in `createComponent` | **High** — collapses to 1 hook |
| Preact | Same as React | **High** — same benefit |
| Solid | Uses Solid's built-in `"prop:xxx"` / `"on:xxx"` | None — keep as-is |
| Vue | Inline switch/case + ref callback + `_eventHandlers` | **High** — removes ~20 lines per component |
| Svelte | Inline attachment with manual prop/event setup | **Medium** — removes ~5 lines per component |

---

## 5. Implementation Plan

### Phase 1: Create `setupElementProps`

- [ ] Create `aria-ui/packages/integrations/src/setup.ts`
- [ ] Export `setupElementProps` function
- [ ] Add `"./setup"` export to `integrations/package.json`

### Phase 2: Refactor React/Preact `createComponent`

- [ ] Refactor `integrations/src/react.ts` to use `setupElementProps` internally
- [ ] Refactor `integrations/src/preact.ts` to use `setupElementProps` internally
- [ ] No change to generated wrapper code
- [ ] Verify all existing tests pass

### Phase 3: Update Vue code generator

- [ ] Update `generateVueComponentFile` in `cli/src/generate.ts`
- [ ] Generate import of `setupElementProps` from `@aria-ui-v2/integrations/setup`
- [ ] Replace switch/case + ref callback + `_eventHandlers` with `setupElementProps`
- [ ] Regenerate all Vue wrappers
- [ ] Verify all tests pass

### Phase 4: Update Svelte code generator

- [ ] Update `generateSvelteComponentSvelteFile` in `cli/src/generate.ts`
- [ ] Generate import of `setupElementProps` in attachment
- [ ] Replace manual property/event setup with `setupElementProps`
- [ ] Regenerate all Svelte wrappers
- [ ] Verify all tests pass

### Phase 5: Verify

- [ ] `pnpm -w run build:package`
- [ ] `pnpm -w fix`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w test run registry/test/table.test.ts`
- [ ] Verify all other component tests still pass

---

## 6. Open Questions

1. **Should `setupElementProps` also return a `filterProps` helper?** Currently each framework filters out managed props. We could export a separate `filterProps(props, propNames, eventNameMap)` to unify this too. But it's simple enough inline.

2. **Vue render-phase re-calls**: Vue's `_ref` is called from the render function on every update. With `setupElementProps`, each call aborts old listeners and creates new ones. This is correct because the event handlers may have changed between renders (e.g., the handler closure captures new state).
