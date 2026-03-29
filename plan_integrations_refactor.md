# Plan: Unify Framework Wrapper Logic into `@aria-ui-v2/integrations`

## 1. Problem

The CLI code generator (`aria-ui/packages/cli/src/generate.ts`) generates nearly identical logic across 5 frameworks for:

1. **Property setting** — Setting JS properties (not HTML attributes) on the custom element
2. **Event binding** — Adding/removing `addEventListener` for custom events
3. **Cleanup** — Removing event listeners on unmount or element change

Each framework currently reimplements this from scratch in generated code. See the "Current" examples in each framework section below.

---

## 2. Proposed Solution: Two Pure Functions

Two framework-agnostic functions in `@aria-ui-v2/integrations/setup`:

### `updateElementProps` — called on every render

Sets JS properties on the element. When a prop value is `undefined`, applies the default from `PropsDeclaration`.

```typescript
// @aria-ui-v2/integrations/setup

import type { PropDeclaration } from '@aria-ui-v2/core'

export function updateElementProps(
  element: HTMLElement,
  propsDeclaration: Readonly<Record<string, PropDeclaration<unknown>>>,
  props: Readonly<Record<string, unknown>>,
): void {
  for (const [name, decl] of Object.entries(propsDeclaration)) {
    const value = props[name]
    ;(element as Record<string, unknown>)[name] = value === undefined ? decl.default : value
  }
}
```

- Idempotent — safe to call on every render
- Uses `PropsDeclaration` for defaults — frameworks don't handle defaults themselves
- Only touches declared props — passthrough attributes stay untouched

### `setupElementEventHandlers` — called once on mount

Registers stable dispatchers for all known custom events. Each dispatcher reads the **current** handler from `getHandlers()` at event-fire time.

```typescript
export function setupElementEventHandlers(
  element: HTMLElement,
  eventNames: readonly string[],
  getHandlers: () => Readonly<Record<string, ((event: Event) => void) | undefined>>,
): VoidFunction {
  const ac = new AbortController()

  for (const eventName of eventNames) {
    element.addEventListener(
      eventName,
      (event: Event) => {
        const fn = getHandlers()[eventName]
        if (fn) fn(event)
      },
      { signal: ac.signal },
    )
  }

  return () => ac.abort()
}
```

- `addEventListener` once per event on mount
- `removeEventListener` once (via `AbortController.abort()`) on unmount
- Between mount and unmount: zero DOM operations — dispatchers just dereference `getHandlers()`
- `getHandlers()` returns the latest handler record (e.g. `handlersRef.current` in React, `_handlers` in Vue)

### Key properties

- No class, no module-level state — two standalone pure functions
- Tree-shakeable — no side effects
- `updateElementProps` handles prop defaults via `PropsDeclaration`
- `setupElementEventHandlers` uses the stable-dispatcher pattern: register once, read latest ref on fire

---

## 3. Integration with each framework

### React/Preact

**Remove `createComponent` from `@aria-ui-v2/integrations/{react,preact}`.** Each generated component directly uses `updateElementProps` + `setupElementEventHandlers` + framework-specific hooks.

The `@aria-ui-v2/integrations` package no longer exports `./react` or `./preact` — only `./setup`.

**Current generated code (React):**
```tsx
import { ReactWrapper } from '@aria-ui-v2/integrations/react'

const propNames = ['disabled', 'value']
const eventNameMap = { onItemSelect: 'itemSelect' }

function MyComponent(props, forwardedRef) {
  registerElement()
  return createElement(ReactWrapper, {
    as: 'my-element',
    propNames,
    eventNameMap,
    props,
    forwardedRef,
  })
}
```

**After refactor:**
```tsx
import { updateElementProps, setupElementEventHandlers } from '@aria-ui-v2/integrations/setup'
import { MyElementPropsDeclaration } from '@my-scope/web/my-component'

function MyComponent(props, forwardedRef) {
  registerElement()

  const elementRef = useRef<HTMLElement>(null)
  const handlersRef = useRef<Record<string, ((event: Event) => void) | undefined>>({})

  const { myValue, onMyValueChange, ...restProps } = props

  // Every render: set properties + update handler refs
  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return
    updateElementProps(element, MyElementPropsDeclaration, { myValue })
    handlersRef.current = { myValueChange: onMyValueChange }
  })

  // Mount only: register dispatchers. Unmount: remove them.
  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return
    return setupElementEventHandlers(element, ['myValueChange'], () => handlersRef.current)
  }, [])

  restProps.ref = useMemo(() => mergeRefs([elementRef, forwardedRef]), [forwardedRef])
  restProps.suppressHydrationWarning = true
  return createElement('my-element', restProps)
}
```

Note: `mergeRefs` is a small helper for combining `elementRef` + `forwardedRef`. It can be inlined in generated code or kept as a utility.

**Preact** uses the exact same pattern, importing from `preact` / `preact/hooks` / `preact/compat`.

### Solid — keep as-is

Solid's `"prop:xxx"` and `"on:xxx"` are reactive and framework-native. No change.

### Vue

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
          _props["." + key] = value; break
        case "onItemSelect":
          _eventHandlers[key] = value as Function; break
        default:
          _props[key] = value
      }
    }
    _props["ref"] = _ref
    return h("my-element", _props, slots.default?.())
  }
}
```

**After refactor:**
```typescript
import { updateElementProps, setupElementEventHandlers } from '@aria-ui-v2/integrations/setup'
import { MyElementPropsDeclaration } from '@my-scope/web/my-component'

const _managedKeys = new Set([
  ...Object.keys(MyElementPropsDeclaration),
  'onItemSelect',
])

(props, { slots }) => {
  registerElement()
  let _element: HTMLElement | undefined
  let _cleanup: VoidFunction | undefined
  const _handlers: Record<string, ((event: Event) => void) | undefined> = {}

  const _ref = (element: HTMLElement | null | undefined) => {
    _cleanup?.()
    _cleanup = undefined
    _element = undefined
    if (element) {
      _element = element
      _cleanup = setupElementEventHandlers(element, ['itemSelect'], () => _handlers)
    }
  }

  return () => {
    if (_element) {
      updateElementProps(_element, MyElementPropsDeclaration, props)
    }
    _handlers.itemSelect = props.onItemSelect as ((event: Event) => void) | undefined

    const _props: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      if (!_managedKeys.has(key)) {
        _props[key] = value
      }
    }
    _props['ref'] = _ref
    return h('my-element', _props, slots.default?.())
  }
}
```

Changes:
- No more `switch/case` per component
- No more inline `addEventListener` / `AbortController`
- `_ref` only handles mount/unmount via `setupElementEventHandlers`
- Render function: `updateElementProps` for properties (with defaults) + `_handlers` update

### Svelte

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
  import { updateElementProps, setupElementEventHandlers } from '@aria-ui-v2/integrations/setup'
  import { registerElement, MyElementPropsDeclaration } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const attachment = (element) => {
    if (!element) return
    updateElementProps(element, MyElementPropsDeclaration, { disabled: p0, value: p1 })
    return setupElementEventHandlers(element, ['itemSelect'], () => ({ itemSelect: p2 }))
  }
</script>
```

Changes:
- No more manual `AbortController`
- No more per-prop `if (pN !== undefined) { element.prop = pN }` blocks
- `updateElementProps` handles defaults; `setupElementEventHandlers` returns cleanup

---

## 4. Assessment

| Framework | Current State | Benefit |
|-----------|--------------|---------|
| React | `ReactWrapper` in integrations | **High** — removes `ReactWrapper`, generated code is explicit |
| Preact | `PreactWrapper` in integrations | **High** — same as React |
| Solid | Uses Solid's built-in `"prop:xxx"` / `"on:xxx"` | None — keep as-is |
| Vue | Inline switch/case + ref callback + `_eventHandlers` | **High** — removes ~20 lines per component |
| Svelte | Inline attachment with manual prop/event setup | **Medium** — removes ~5 lines per component |

---

## 5. Implementation Plan

### Phase 1: Create shared functions

- [ ] Create `aria-ui/packages/integrations/src/setup.ts` with `updateElementProps` + `setupElementEventHandlers`
- [ ] Add `"./setup"` export to `integrations/package.json`
- [ ] Build and typecheck

### Phase 2: Update React code generator

- [ ] Update `generateReactComponentFile` in `cli/src/generate.ts` to generate code using `updateElementProps` + `setupElementEventHandlers` + `useLayoutEffect` + `useRef`
- [ ] Import `PropsDeclaration` from the component source
- [ ] Remove `ReactWrapper` import from generated code
- [ ] Regenerate all React wrappers
- [ ] Verify tests pass

### Phase 3: Update Preact code generator

- [ ] Same as Phase 2 but for Preact
- [ ] Regenerate all Preact wrappers
- [ ] Verify tests pass

### Phase 4: Remove old React/Preact integrations

- [ ] Delete `integrations/src/react.ts` and `integrations/src/preact.ts`
- [ ] Remove `"./react"` and `"./preact"` exports from `integrations/package.json`
- [ ] Remove React/Preact peer dependencies from `integrations/package.json`
- [ ] Build and verify

### Phase 5: Update Vue code generator

- [ ] Update `generateVueComponentFile` in `cli/src/generate.ts`
- [ ] Replace switch/case + ref callback + `_eventHandlers` with `updateElementProps` + `setupElementEventHandlers`
- [ ] Import `PropsDeclaration` from the component source
- [ ] Regenerate all Vue wrappers
- [ ] Verify tests pass

### Phase 6: Update Svelte code generator

- [ ] Update `generateSvelteComponentSvelteFile` in `cli/src/generate.ts`
- [ ] Replace manual property/event setup with `updateElementProps` + `setupElementEventHandlers`
- [ ] Import `PropsDeclaration` from the component source
- [ ] Regenerate all Svelte wrappers
- [ ] Verify tests pass

### Phase 7: Final verification

- [ ] `pnpm -w run build:package`
- [ ] `pnpm -w fix`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w lint`
- [ ] Run all tests

---

## 6. Open Questions

1. **`mergeRefs` for React/Preact**: After removing `ReactWrapper`, the `mergeRefs` helper (for combining `elementRef` + `forwardedRef`) needs to live somewhere. Options: (a) inline in each generated file, (b) export from `@aria-ui-v2/integrations/setup`, (c) keep a minimal `@aria-ui-v2/integrations/react` that only exports `mergeRefs`.

2. **`PropsDeclaration` import path**: The generated code needs to import `MyElementPropsDeclaration` from the web component package. The CLI already knows this path (it's the `importSource` option) — it just needs to add the PropsDeclaration to the import list.
