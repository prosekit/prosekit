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

## 3. Proposed Solution: `ElementController`

Create a framework-agnostic `ElementController` class in `@aria-ui-v2/integrations` that encapsulates:
1. Setting JS properties on a custom element
2. Adding/removing event listeners with automatic cleanup
3. Handling element changes (re-attach) and unmount (cleanup)

```typescript
// @aria-ui-v2/integrations/controller

export class ElementController {
  private abortController: AbortController | undefined
  private element: HTMLElement | undefined

  constructor(
    private readonly propNames: readonly string[],
    private readonly eventNameMap: Readonly<Record<string, string>>,
  ) {}

  /**
   * Called when the framework obtains (or loses) a reference to the DOM element.
   * Pass `null` on unmount.
   */
  attach(
    element: HTMLElement | null | undefined,
    props: Record<string, unknown>,
  ): void {
    // Clean up previous element
    this.abortController?.abort()
    this.abortController = undefined
    this.element = undefined

    if (!element) return

    this.element = element
    this.abortController = new AbortController()
    const signal = this.abortController.signal

    // Set properties
    for (const name of this.propNames) {
      if (name in props) {
        ;(element as Record<string, unknown>)[name] = props[name]
      }
    }

    // Add event listeners
    for (const [handlerName, eventName] of Object.entries(this.eventNameMap)) {
      const handler = props[handlerName]
      if (typeof handler === 'function') {
        element.addEventListener(eventName, handler as EventListener, { signal })
      }
    }
  }

  /**
   * Called on re-render to update properties and event handlers.
   * Properties are updated directly; event listeners are re-registered.
   */
  update(props: Record<string, unknown>): void {
    const element = this.element
    if (!element) return

    // Update properties
    for (const name of this.propNames) {
      if (name in props) {
        ;(element as Record<string, unknown>)[name] = props[name]
      }
    }

    // Re-register event listeners (abort old, add new)
    this.abortController?.abort()
    this.abortController = new AbortController()
    const signal = this.abortController.signal

    for (const [handlerName, eventName] of Object.entries(this.eventNameMap)) {
      const handler = props[handlerName]
      if (typeof handler === 'function') {
        element.addEventListener(eventName, handler as EventListener, { signal })
      }
    }
  }

  /**
   * Clean up all listeners. Called on unmount.
   */
  dispose(): void {
    this.abortController?.abort()
    this.abortController = undefined
    this.element = undefined
  }
}
```

### Integration with each framework

#### React/Preact

React/Preact already have `createComponent` in `@aria-ui-v2/integrations`. This can be refactored internally to use `ElementController`, but the external API (`createComponent`) stays the same. No change to generated code needed.

Alternatively, keep React/Preact as-is since they already work well. The main benefit is for Vue and Svelte.

#### Solid

Solid's `"prop:xxx"` and `"on:xxx"` are built-in. Using `ElementController` would mean giving up Solid's reactive property tracking in favor of manual DOM manipulation. **Not recommended** — keep Solid as-is.

#### Vue

Replace the inline switch/case + ref callback with `ElementController`:

```typescript
// Generated code (Vue) — AFTER refactor
(props, { slots }) => {
  registerElement()
  const controller = new ElementController(
    ["disabled", "value"],
    { onItemSelect: "itemSelect" },
  )

  const _ref = (element: HTMLElement | null | undefined) => {
    controller.attach(element, props)
  }

  return () => {
    controller.update(props)
    const _props: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(props)) {
      if (!propNames.includes(key) && !(key in eventNameMap)) {
        _props[key] = value
      }
    }
    _props["ref"] = _ref
    return h("prosekit-table-handle-popover-item", _props, slots.default?.())
  }
}
```

Wait — there's a subtlety. Vue's `h()` with `"." + key` sets properties via Vue's own mechanism. If we use `ElementController` to set properties instead, we don't need `"." + key` at all. The generated code becomes much simpler — just pass through non-element props to `h()`.

But there's a problem: Vue's render function runs on every reactivity change. `controller.update(props)` would re-register event listeners on every render. We need to be smarter — only re-register when handlers change.

Actually, with `AbortController`, re-registering is cheap (abort all + add all). And event handlers in Vue are typically stable references. This should be fine.

#### Svelte

Replace the attachment function internals with `ElementController`:

```svelte
<script lang="js">
  import { ElementController } from '@aria-ui-v2/integrations/controller'
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const controller = new ElementController(
    ["disabled", "value"],
    { onItemSelect: "itemSelect" },
  )

  const attachment = (element) => {
    controller.attach(element, { disabled: p0, value: p1, onItemSelect: p2 })
    return () => controller.dispose()
  }
</script>

<prosekit-table-handle-popover-item {...restProps} {@attach attachment}>
  {@render children?.()}
</prosekit-table-handle-popover-item>
```

But Svelte's `@attach` callback only runs once (on mount) and returns a cleanup function. It doesn't re-run on prop changes. So we'd need Svelte's `$effect` to handle updates:

```svelte
<script lang="js">
  import { ElementController } from '@aria-ui-v2/integrations/controller'
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const controller = new ElementController(
    ["disabled", "value"],
    { onItemSelect: "itemSelect" },
  )

  const attachment = (element) => {
    controller.attach(element, { disabled: p0, value: p1, onItemSelect: p2 })
    return () => controller.dispose()
  }

  // Re-set properties when they change
  $effect(() => {
    controller.update({ disabled: p0, value: p1, onItemSelect: p2 })
  })
</script>
```

Hmm, this is getting more complex, not simpler. The current Svelte approach is already clean because `@attach` handles both setup and cleanup.

---

## 4. Revised Assessment

After deep analysis, the refactoring benefit varies by framework:

| Framework | Current State | Benefit of `ElementController` |
|-----------|--------------|-------------------------------|
| React | Already has `createComponent` wrapper | Low — already abstracted |
| Preact | Already has `createComponent` wrapper | Low — already abstracted |
| Solid | Uses Solid's built-in `"prop:xxx"` / `"on:xxx"` | Negative — would lose reactive tracking |
| Vue | Inline switch/case + ref callback | **High** — removes ~30 lines of generated code per component |
| Svelte | Inline attachment with direct assignment | **Medium** — `@attach` already handles lifecycle cleanly, but prop/event setup can be unified |

The biggest win is **Vue**, which has the most complex and error-prone generated code (the duplicate listener bug we just fixed).

---

## 5. Refined Proposal

Instead of a single `ElementController` for all frameworks, create a targeted helper for the **common subset**: property setting + event binding + cleanup. Each framework adapts it differently.

### 5.1 New module: `@aria-ui-v2/integrations/controller`

```typescript
// aria-ui/packages/integrations/src/controller.ts

export interface ElementBinding {
  /** Update properties and event handlers. */
  update(element: HTMLElement, props: Record<string, unknown>): void
  /** Remove all event listeners. */
  dispose(): void
}

/**
 * Creates a reusable binding that manages element properties and event listeners.
 *
 * @param propNames - Names of properties to set on the element
 * @param eventNameMap - Maps handler prop names to DOM event names
 *                       e.g. { onItemSelect: "itemSelect" }
 */
export function createElementBinding(
  propNames: readonly string[],
  eventNameMap: Readonly<Record<string, string>>,
): ElementBinding {
  let abortController: AbortController | undefined

  return {
    update(element, props) {
      // Set properties
      for (const name of propNames) {
        if (name in props) {
          ;(element as Record<string, unknown>)[name] = props[name]
        }
      }

      // Re-register event listeners
      abortController?.abort()
      abortController = new AbortController()
      const signal = abortController.signal

      for (const [handlerName, eventName] of Object.entries(eventNameMap)) {
        const handler = props[handlerName]
        if (typeof handler === 'function') {
          element.addEventListener(eventName, handler as EventListener, { signal })
        }
      }
    },

    dispose() {
      abortController?.abort()
      abortController = undefined
    },
  }
}
```

### 5.2 React/Preact — refactor `createComponent` to use `createElementBinding`

The existing `createComponent` in `integrations/react.ts` and `integrations/preact.ts` can internally use `createElementBinding`, replacing the 3 `useLayoutEffect` hooks with a simpler pattern:

```typescript
// integrations/react.ts — AFTER refactor
import { createElementBinding } from './controller.ts'

export function createComponent<Props, CustomElement extends HTMLElement>(
  tagName: string,
  displayName: string,
  propNames: string[],
  eventNameMap: Record<string, string>,
  register: VoidFunction,
) {
  let isRegistered = false

  const Component = forwardRef<CustomElement, any>((props, forwardRef) => {
    if (!isRegistered) { register(); isRegistered = true }

    const elementRef = useRef<CustomElement>(null)
    const bindingRef = useRef<ReturnType<typeof createElementBinding>>()
    if (!bindingRef.current) {
      bindingRef.current = createElementBinding(propNames, eventNameMap)
    }

    const reactProps: Record<string, unknown> = {}
    for (const [name, value] of Object.entries(props)) {
      if (!propNames.includes(name) && !(name in eventNameMap)) {
        reactProps[name] = value
      }
    }

    useLayoutEffect(() => {
      const element = elementRef.current
      if (!element) return
      bindingRef.current!.update(element, props)
    })

    useLayoutEffect(() => {
      return () => bindingRef.current?.dispose()
    }, [])

    reactProps['suppressHydrationWarning'] = true
    reactProps['ref'] = useMemo(() => mergeRefs([elementRef, forwardRef]), [forwardRef])

    return createElement(tagName, reactProps)
  })

  Component.displayName = displayName
  return Component
}
```

**Benefit**: Removes ~30 lines from `createComponent` (the 3 separate `useLayoutEffect` hooks for props, event handler refs, and event registration). No change to generated wrapper code.

### 5.3 Vue — use `createElementBinding` in generated code

```typescript
// Generated code (Vue) — AFTER refactor
import { createElementBinding } from '@aria-ui-v2/integrations/controller'

const _propNames = ["disabled", "value"] as const
const _eventNameMap = { onItemSelect: "itemSelect" } as const
const _allManagedKeys = new Set([..._propNames, ...Object.keys(_eventNameMap)])

export const Component = defineComponent<Props & HTMLAttributes>(
  (props, { slots }) => {
    registerElement()
    const binding = createElementBinding(_propNames, _eventNameMap)

    const _ref = (element: HTMLElement | null | undefined) => {
      if (!element) {
        binding.dispose()
        return
      }
      binding.update(element, props)
    }

    return () => {
      // Pass through non-managed props to h()
      const _props: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(props)) {
        if (!_allManagedKeys.has(key)) {
          _props[key] = value
        }
      }
      _props["ref"] = _ref
      return h(tagName, _props, slots.default?.())
    }
  },
  { props: propsDeclaration },
)
```

**Benefit**:
- Eliminates the inline `switch/case` per component
- Eliminates the manual `AbortController` management
- Eliminates the `_eventHandlers` record pattern
- ~20 fewer lines of generated code per component with events

### 5.4 Svelte — use `createElementBinding` in attachment

```svelte
<script lang="js">
  import { createElementBinding } from '@aria-ui-v2/integrations/controller'
  import { registerElement } from '@prosekit/web/table-handle'
  registerElement()

  let { disabled: p0, value: p1, onItemSelect: p2, children = undefined, ...restProps } = $props()

  const binding = createElementBinding(
    ["disabled", "value"],
    { onItemSelect: "itemSelect" },
  )

  const attachment = (element) => {
    if (!element) return
    binding.update(element, { disabled: p0, value: p1, onItemSelect: p2 })
    return () => binding.dispose()
  }
</script>

<prosekit-table-handle-popover-item {...restProps} {@attach attachment}>
  {@render children?.()}
</prosekit-table-handle-popover-item>
```

**Benefit**: Removes manual `AbortController` + manual `addEventListener` + manual property assignment. Replaces with single `binding.update()` call.

### 5.5 Solid — keep as-is

Solid's `"prop:xxx"` and `"on:xxx"` are reactive and framework-native. No change needed.

---

## 6. Implementation Plan

### Phase 1: Create `createElementBinding`

- [ ] Create `aria-ui/packages/integrations/src/controller.ts`
- [ ] Export `createElementBinding` function
- [ ] Add `"./controller"` export to `integrations/package.json`
- [ ] Add tests

### Phase 2: Refactor React/Preact `createComponent`

- [ ] Refactor `integrations/src/react.ts` to use `createElementBinding` internally
- [ ] Refactor `integrations/src/preact.ts` to use `createElementBinding` internally
- [ ] No change to generated wrapper code — `createComponent` API stays the same
- [ ] Verify all existing tests pass

### Phase 3: Update Vue code generator

- [ ] Update `generateVueComponentFile` in `cli/src/generate.ts`
- [ ] Import `createElementBinding` from `@aria-ui-v2/integrations/controller`
- [ ] Replace inline switch/case + ref callback with `createElementBinding`
- [ ] Regenerate all Vue wrappers
- [ ] Verify all tests pass

### Phase 4: Update Svelte code generator

- [ ] Update `generateSvelteComponentSvelteFile` in `cli/src/generate.ts`
- [ ] Import `createElementBinding` in attachment function
- [ ] Replace manual property setting + addEventListener with `binding.update()`
- [ ] Regenerate all Svelte wrappers
- [ ] Verify all tests pass

### Phase 5: Verify

- [ ] `pnpm -w run build:package`
- [ ] `pnpm -w fix`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w test run registry/test/table.test.ts`
- [ ] Verify all other component tests still pass

---

## 7. Open Questions

1. **Should `createElementBinding` handle prop filtering?** Currently each framework filters out managed props from passthrough. We could add a `filterProps(props)` method that returns only passthrough props. This would remove the `_allManagedKeys` set from Vue and the destructuring from Svelte.

2. **Should React/Preact switch to `createElementBinding`?** They already work well with `createComponent`. Refactoring them is lower priority but would make all 4 DOM-manipulating frameworks use the same core logic.

3. **Event handler identity in Vue**: Vue's render function runs on every reactivity change. `binding.update()` in the ref callback re-registers all event listeners each time the ref is called. With `AbortController`, this is cheap, but we should verify there are no timing issues (event fired between abort and re-add).
