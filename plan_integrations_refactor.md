# Plan: Remove `@aria-ui-v2/integrations` — Phase 1: React

## Goal

Incrementally delete the `@aria-ui-v2/integrations` package by inlining all logic into generated code. Start with React.

## Why

The `@aria-ui-v2/integrations` package currently exports `ReactWrapper` and `PreactWrapper` — runtime components that handle property setting, event binding, and ref merging. These add an extra layer of indirection:

1. **Hidden complexity** — `ReactWrapper` does prop separation, 3 `useLayoutEffect` hooks, and ref merging at runtime. The generated code looks simple but the behavior is opaque.
2. **Unnecessary dependency** — the CLI knows everything about each component at build time (prop names, event names). There's no need for a runtime that re-discovers this information.
3. **Hard to optimize** — `ReactWrapper` iterates all props with `propNames.includes()` on every render. Generated code can use destructuring which is faster and more readable.

After this change: the generated React code is self-contained. No `@aria-ui-v2/integrations/react` import. All prop/event/ref logic is explicit in the generated file.

---

## Target Pattern

The user's pseudocode for what the generated React component should look like:

```tsx
function MyReactComponent(props, forwardedRef) {
  registerElement()

  const elementRef = useRef<HTMLElement>(null)
  const handlersRef = useRef<Array<((event: Event) => void) | null | undefined>>([null, null])

  const { myValue: p0, myLabel: p1, onMyValueChange: e0, onMyLabelChange: e1, ...restProps } = props

  // Every render: set properties + update handler refs
  useLayoutEffect(() => {
    const element = elementRef.current as Record<string, unknown> | null
    if (!element) return
    Object.assign(element, { myValue: p0, myLabel: p1 })
    handlersRef.current = [e0, e1]
  })

  // Mount only: register dispatchers. Unmount: remove them.
  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ac = new AbortController()

    for (const [index, eventName] of ['myValueChange', 'myLabelChange'].entries()) {
      element.addEventListener(eventName, (event) => {
        handlersRef.current[index]?.(event)
      }, { signal: ac.signal })
    }

    return () => ac.abort()
  }, [])

  restProps.ref = useMemo(() => mergeRefs([elementRef, forwardedRef]), [forwardedRef])
  restProps.suppressHydrationWarning = true
  return createElement('my-element', restProps)
}
```

### Key design decisions

1. **Props destructured with short names** (`p0`, `p1`, `e0`, `e1`) — separates element props, event handlers, and passthrough (`...restProps`) in one statement. No runtime `propNames.includes()` filtering.

2. **Handlers in an array, not a record** — `handlersRef.current = [e0, e1]` is a single array assignment. Dispatchers access by index `handlersRef.current[index]`, which avoids string key lookups.

3. **`Object.assign`** — sets all element properties in one call. The object literal `{ myValue: p0, myLabel: p1 }` is constructed at code-generation time.

4. **Two `useLayoutEffect` hooks:**
   - No deps (every render): updates element properties + handler refs. All operations are JS assignments — no DOM API calls.
   - Empty deps `[]` (mount/unmount): registers stable dispatchers via `addEventListener` once, removes via `AbortController.abort()` once.

5. **`mergeRefs`** — still needed for combining `elementRef` + `forwardedRef`. Will be inlined as a helper function in each generated file (or generated once per index file).

6. **No `PropsDeclaration` import** — the CLI already knows prop names and defaults. Default handling is done by the custom element itself (via `defineCustomElement`), not the framework wrapper.

---

## Changes to the CLI Code Generator

### Current `generateReactComponentFile` (simplified)

```typescript
// cli/src/generate.ts — current
function generateReactComponentFile(sourceFile, component, options) {
  // 1. Import ReactWrapper
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/integrations/react',
    namedImports: ['ReactWrapper'],
  })

  // 2. Import react APIs
  sourceFile.addImportDeclaration({
    moduleSpecifier: 'react',
    namedImports: ['createElement', 'forwardRef', ...types],
  })

  // 3. Import component register + types
  addSourceFileImports({ includeRegister: true, includeElementType: true })

  // 4. Generate propNames + eventNameMap constants
  addPropNamesVariable(sourceFile, ...)
  addEventNameMapVariable(sourceFile, ...)

  // 5. Generate component function
  //    → calls createElement(ReactWrapper, { as, propNames, eventNameMap, props, forwardedRef })

  // 6. Generate forwardRef export
}
```

### After refactor

```typescript
// cli/src/generate.ts — after
function generateReactComponentFile(sourceFile, component, options) {
  // 1. Import react APIs (NO ReactWrapper)
  sourceFile.addImportDeclaration({
    moduleSpecifier: 'react',
    namedImports: ['createElement', 'forwardRef', 'useLayoutEffect', 'useMemo', 'useRef', ...types],
  })

  // 2. Import component register + types
  addSourceFileImports({ includeRegister: true, includeElementType: true })

  // 3. Generate Props interface (unchanged)

  // 4. Generate component function body:
  //    a. Destructure props: { prop0: p0, prop1: p1, onEvent0: e0, ...restProps }
  //    b. useLayoutEffect (every render): Object.assign(element, { prop0: p0, ... }) + handlersRef.current = [e0, ...]
  //    c. useLayoutEffect (mount only): addEventListener loop with AbortController
  //    d. mergeRefs + createElement(tagName, restProps)

  // 5. Generate forwardRef export (unchanged)

  // 6. Generate mergeRefs helper (inlined in file)
}
```

### Detailed generation logic

#### Step 4a: Destructure props

For a component with props `[disabled, value]` and events `[itemSelect]`:

```typescript
const destructureEntries = [
  ...props.map((p, i) => `${p.name}: p${i}`),          // "disabled: p0, value: p1"
  ...eventHandlers.map((h, i) => `${h.handlerName}: e${i}`),  // "onItemSelect: e0"
]
// → "const { disabled: p0, value: p1, onItemSelect: e0, ...restProps } = props"
```

#### Step 4b: useLayoutEffect (every render)

```typescript
const propAssignments = props.map((p, i) => `${p.name}: p${i}`)
// → "Object.assign(element, { disabled: p0, value: p1 })"

const handlerAssignments = eventHandlers.map((_, i) => `e${i}`)
// → "handlersRef.current = [e0]"
```

#### Step 4c: useLayoutEffect (mount only)

```typescript
const eventNames = eventHandlers.map(h => h.eventName)
// → "for (const [index, eventName] of ['itemSelect'].entries()) { ... }"
```

If there are no events, this entire `useLayoutEffect` block is omitted.

#### Step 4d: mergeRefs

The `mergeRefs` + `assignRef` functions from `integrations/react.ts` will be generated as top-level helpers in each file. They're small (~20 lines total) and have no dependencies.

### propFallback extension changes

The `propFallback` extension currently injects:
```typescript
const componentProps = { ...props }
const editorContext = useEditorContext()
if (componentProps.editor == null && editorContext != null) {
  componentProps.editor = editorContext
}
// then passes componentProps to ReactWrapper
```

After refactor, the extension needs to inject into the destructuring + `Object.assign` pattern:
```typescript
const editorContext = useEditorContext()
// In the Object.assign: use editorContext as fallback
// Object.assign(element, { editor: p0 ?? editorContext })
```

The extension API `setRenderPropsExpression` is no longer applicable. Instead, we need a way for extensions to override individual prop values in the `Object.assign` call. The existing `setSolidPropOverride` pattern works: `setPropOverride(propName, expression)`.

For React, the extension would call:
```typescript
context.addSetupStatement(`const editorContext = useEditorContext()`)
context.setPropOverride('editor', `p${editorIndex} ?? editorContext`)
```

This generates:
```typescript
Object.assign(element, { ..., editor: p0 ?? editorContext })
```

---

## Implementation Steps

### 1. Update `generateReactComponentFile` in `cli/src/generate.ts`

- [ ] Remove `ReactWrapper` import
- [ ] Add `useLayoutEffect`, `useMemo`, `useRef` to react imports
- [ ] Generate props destructuring with short names (`p0`, `p1`, `e0`, `e1`, `...restProps`)
- [ ] Generate `handlersRef` with array type (length = number of events, or omit if no events)
- [ ] Generate first `useLayoutEffect` (no deps): `Object.assign` + `handlersRef.current = [...]`
- [ ] Generate second `useLayoutEffect` (`[]` deps): `addEventListener` loop with `AbortController` (only if component has events)
- [ ] Generate `mergeRefs` + `assignRef` helpers at file level
- [ ] Generate `restProps.ref = useMemo(...)` + `restProps.suppressHydrationWarning = true`
- [ ] Generate `createElement(tagName, restProps)` (not `ReactWrapper`)

### 2. Update propFallback extension for React

- [ ] Replace `setRenderPropsExpression` usage with a new `setPropOverride(propName, expression)` approach
- [ ] Extension injects `const editorContext = useEditorContext()` as setup statement
- [ ] Extension overrides the prop value in `Object.assign`: `editor: p0 ?? editorContext`

### 3. Regenerate and verify

- [ ] `cd packages/web && node build.mjs` to regenerate React wrappers
- [ ] `pnpm -w run build:package`
- [ ] `pnpm -w fix`
- [ ] `pnpm -w typecheck`
- [ ] `pnpm -w test run registry/test/table.test.ts`
- [ ] Verify other tests still pass

### 4. Clean up

- [ ] Verify no React wrapper files import from `@aria-ui-v2/integrations/react`
- [ ] (Do NOT delete `integrations/react.ts` yet — Preact still uses its own `PreactWrapper` and other components may still reference it until all are regenerated)
