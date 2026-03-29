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

## 3. Proposed Solution: Two Pure Functions

Inspired by [Lit's `@lit/react` create-component.ts](https://github.com/lit/lit/blob/main/packages/react/src/create-component.ts), use the `EventListenerObject` pattern to avoid frequent `addEventListener`/`removeEventListener` DOM calls.

### Core Idea: Stable Dispatcher + Mutable Handler Reference

Instead of adding/removing event listeners on every render, register a **stable dispatcher function** once on mount. The dispatcher reads the **current handler reference** from a mutable slot each time it fires. On re-render, only the reference is updated — zero DOM operations.

```
Mount:    addEventListener("itemSelect", dispatcher)   ← once
Render 1: handlers["onItemSelect"] = handlerV1         ← JS assignment
Render 2: handlers["onItemSelect"] = handlerV2         ← JS assignment
Render 3: handlers["onItemSelect"] = undefined          ← handler removed, dispatcher no-ops
Unmount:  removeEventListener("itemSelect", dispatcher) ← once
```

The dispatcher is just:
```typescript
(event) => {
  const fn = handlers[handlerName]
  if (typeof fn === 'function') fn(event)
}
```

### Implementation: `setupElementProps`

```typescript
// @aria-ui-v2/integrations/setup

/**
 * Sets JS properties on a custom element and registers stable event dispatchers.
 *
 * Call once on mount. Returns:
 * - `update(props)`: call on every re-render to update properties and handler references (no DOM calls)
 * - `dispose()`: call on unmount to removeEventListener
 */
export function setupElementProps(
  element: HTMLElement,
  props: Record<string, unknown>,
  propNames: readonly string[],
  eventNameMap: Readonly<Record<string, string>>,
): { update: (props: Record<string, unknown>) => void; dispose: VoidFunction } {
  // Mutable handler references — dispatchers read from here
  const handlers: Record<string, unknown> = {}

  const ac = new AbortController()

  // Set initial properties
  for (const name of propNames) {
    if (name in props) {
      ;(element as Record<string, unknown>)[name] = props[name]
    }
  }

  // Register stable dispatchers for ALL known events (once)
  for (const [handlerName, eventName] of Object.entries(eventNameMap)) {
    handlers[handlerName] = props[handlerName]
    element.addEventListener(
      eventName,
      (event: Event) => {
        const fn = handlers[handlerName]
        if (typeof fn === 'function') fn(event)
      },
      { signal: ac.signal },
    )
  }

  return {
    update(props: Record<string, unknown>) {
      // Update properties (idempotent JS assignments)
      for (const name of propNames) {
        if (name in props) {
          ;(element as Record<string, unknown>)[name] = props[name]
        }
      }
      // Update handler references (no DOM calls — dispatchers read these on next event)
      for (const handlerName of Object.keys(eventNameMap)) {
        handlers[handlerName] = props[handlerName]
      }
    },
    dispose() {
      ac.abort()
    },
  }
}
```

**Key properties:**
- No class, no module-level state — pure factory function with closures
- `addEventListener` called once per event on mount; `removeEventListener` once on unmount
- Re-renders only do JS property assignments (props + handler refs) — zero DOM operations
- Handler can be `undefined` — dispatcher silently no-ops
- `AbortController` for clean bulk removal on dispose
- Tree-shakeable — standalone export, no side effects

### Integration with each framework

#### React/Preact

Refactor the existing `createComponent` internals. External API unchanged — generated code stays the same.

Current `createComponent` in `react.ts` has 3 `useLayoutEffect` hooks:
```typescript
// Current: 3 useLayoutEffect hooks
useLayoutEffect(() => {  // 1. Set all properties
  const element = elementRef.current
  if (!element) return
  for (const [name, value] of Object.entries(elementProps)) {
    ;(element as Record<string, unknown>)[name] = value
  }
})

useLayoutEffect(() => {  // 2. Store event handlers in ref
  eventHandlersRef.current = eventHandlers
})

useLayoutEffect(() => {  // 3. Register all event listeners
  const element = elementRef.current
  if (!element) return
  // ... 20+ lines of addEventListener/removeEventListener
}, [])
```

After — 2 hooks, much simpler:
```typescript
const bindingRef = useRef<ReturnType<typeof setupElementProps>>()

// Mount: register dispatchers. Unmount: dispose.
useLayoutEffect(() => {
  const element = elementRef.current
  if (!element) return
  bindingRef.current = setupElementProps(element, props, propNames, eventNameMap)
  return () => bindingRef.current?.dispose()
}, [])

// Every render: update properties + handler references (zero DOM calls)
useLayoutEffect(() => {
  bindingRef.current?.update(props)
})
```

The first hook runs once — `addEventListener` on mount, `removeEventListener` on unmount. The second hook runs every render — just JS property assignments.

#### Solid — keep as-is

Solid's `"prop:xxx"` and `"on:xxx"` are reactive and framework-native. No change.

#### Vue

Replace the inline switch/case + ref callback + `_eventHandlers` with `setupElementProps` + `cleanupElementProps`.

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
  let _binding: ReturnType<typeof setupElementProps> | undefined

  const _ref = (element: HTMLElement | null | undefined) => {
    _binding?.dispose()
    _binding = undefined
    if (element) {
      _binding = setupElementProps(element, props, _propNames, _eventNameMap)
    }
  }

  return () => {
    // Update properties + handler references (zero DOM calls)
    _binding?.update(props)

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
- No more `AbortController` management
- No more `switch/case` — replaced with `_managedKeys.has()` filter
- No more manual `addEventListener` in generated code
- `_ref` mount: `setupElementProps` registers dispatchers once. `_ref` unmount: `dispose()` removes them.
- Render function: `_binding.update(props)` — only JS property assignments, zero DOM calls.

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
    const binding = setupElementProps(
      element,
      { disabled: p0, value: p1, onItemSelect: p2 },
      ["disabled", "value"],
      { onItemSelect: "itemSelect" },
    )
    return () => binding.dispose()
  }
</script>
```

Changes:
- No more manual `AbortController`
- No more manual property assignment per prop
- No more manual `addEventListener` per event
- `setupElementProps` registers dispatchers; `binding.dispose()` cleans up on unmount

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

1. **Should we also export `filterProps`?** Currently each framework filters out managed props (Vue uses `_managedKeys.has()`, Svelte uses destructuring). A shared helper could reduce generated code further, but it's simple enough inline.

2. **Naming**: `setupElementProps` returns `{ update, dispose }`. Alternative names: `bindElement`, `createElementBinding`, `mountElement`. The current name emphasizes what it does (sets up element props), not the lifecycle.
