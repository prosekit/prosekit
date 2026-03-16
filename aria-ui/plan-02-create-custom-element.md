# Plan: Replace Generated Element Files with `defineCustomElement`

## Goal

Replace the verbose generated `elements/*.gen.ts` files with a simple one-liner pattern:

```typescript
export class PopoverRootElement extends defineCustomElement(PopoverRootPropsDeclaration, setupPopoverRoot) {}
```

Currently, the generated element files contain 100+ lines of boilerplate (attribute maps, `observedAttributes`, `attributeChangedCallback`, getter/setter pairs, `usePropertiesToAttributes`). All of this logic can be absorbed into `defineCustomElement` itself, making the generated files trivial.

## Current vs. Proposed

### Before (generated `popover-root.gen.ts` — 103 lines)

```typescript
import {
  createAttributePropertyNameMap, createStore, handleAttributeChanged,
  HostElement, registerCustomElement, type Store, usePropertiesToAttributes,
} from "@aria-ui-v2/core";
import { PopoverRootPropsDeclaration, setupPopoverRoot, type PopoverRootProps } from "../../popover/popover-root";

const attributeNameToPropertyName = /* @__PURE__ */ createAttributePropertyNameMap(PopoverRootPropsDeclaration);
const observedAttributes: string[] = /* @__PURE__ */ Array.from(attributeNameToPropertyName.keys());

export class PopoverRootElement extends HostElement {
  private _store: Store<PopoverRootProps>;
  static observedAttributes = observedAttributes;

  constructor() {
    super();
    this._store = createStore(this, PopoverRootPropsDeclaration);
    setupPopoverRoot(this, this._store);
    usePropertiesToAttributes(this, this._store, PopoverRootPropsDeclaration);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    handleAttributeChanged(this._store, PopoverRootPropsDeclaration, attributeNameToPropertyName, name, newValue);
  }

  get defaultOpen(): PopoverRootProps["defaultOpen"] { return this._store.defaultOpen.get(); }
  set defaultOpen(value: PopoverRootProps["defaultOpen"]) { this._store.defaultOpen.set(value); }
  get open(): PopoverRootProps["open"] { return this._store.open.get(); }
  set open(value: PopoverRootProps["open"]) { this._store.open.set(value); }
  get modal(): PopoverRootProps["modal"] { return this._store.modal.get(); }
  set modal(value: PopoverRootProps["modal"]) { this._store.modal.set(value); }
  get disabled(): PopoverRootProps["disabled"] { return this._store.disabled.get(); }
  set disabled(value: PopoverRootProps["disabled"]) { this._store.disabled.set(value); }
}

export function registerPopoverRootElement(): void {
  registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
```

### After (generated `popover-root.gen.ts` — ~10 lines)

```typescript
import { defineCustomElement, registerCustomElement } from "@aria-ui-v2/core";
import { PopoverRootPropsDeclaration, setupPopoverRoot } from "../../popover/popover-root";

export class PopoverRootElement extends defineCustomElement(
  PopoverRootPropsDeclaration,
  setupPopoverRoot,
) {}

export function registerPopoverRootElement(): void {
  registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
```

### After — Component Without Props (popover-popup)

```typescript
import { defineCustomElement, registerCustomElement } from "@aria-ui-v2/core";
import { PopoverPopupPropsDeclaration, setupPopoverPopup } from "../../popover/popover-popup";

export class PopoverPopupElement extends defineCustomElement(
  PopoverPopupPropsDeclaration,
  setupPopoverPopup,
) {}

export function registerPopoverPopupElement(): void {
  registerCustomElement("aria-ui-popover-popup", PopoverPopupElement);
}
```

The generated code has a uniform shape regardless of whether the component has props or not. The conditional attribute handling logic is fully internal to `defineCustomElement`.

---

## Phase 1: Modify `defineCustomElement` in `packages/core`

### 1.1 What needs to change

The current `defineCustomElement` does:
- Create a class extending `HostElement`
- Call `createStore()` in constructor
- Call `setup()` in constructor
- Define getter/setter pairs for each prop via `Object.defineProperty`

The new `defineCustomElement` must also handle:
- `static observedAttributes` — computed from `PropsDeclaration`
- `attributeChangedCallback` — attribute→property sync
- `usePropertiesToAttributes()` — property→attribute sync in constructor

All of these are currently handled by the *generated* code. Moving them into `defineCustomElement` means the generated code becomes trivial.

### 1.2 Change the argument order

Current: `defineCustomElement(setup, props)`
New: `defineCustomElement(props, setup)`

The `props` argument comes first because it's the "shape" of the component, while `setup` is the behavior. This also reads better when the `extends` keyword precedes it: `class X extends defineCustomElement(PropsDecl, setupFn)`.

### 1.3 New `HostElementConstructor` type

The return type needs to express that the returned class produces instances of `HostElement & Props`. It also needs to include the static `observedAttributes` and `attributeChangedCallback`. However, for the `extends` pattern, TypeScript just needs the constructor signature:

```typescript
export type HostElementConstructor<Props extends AnyProps> = (new () => HostElement & Props) & {
  observedAttributes: string[]
}
```

### 1.4 New implementation

```typescript
import type { AnyProps, PropsDeclaration } from './define-props.ts'
import { HostElement } from './host-element.ts'
import {
  createAttributePropertyNameMap,
  handleAttributeChanged,
  usePropertiesToAttributes,
} from './attribute.ts'
import type { Signal } from './signal.ts'
import { createStore, type Store } from './store.ts'

type SetupFunction<Props extends AnyProps> = (
  host: HostElement,
  props: Store<Props>,
) => void

export type HostElementConstructor<Props extends AnyProps> = (new () => HostElement & Props) & {
  observedAttributes: string[]
}

export function defineCustomElement<
  Props extends AnyProps = { __noProps__: never },
>(
  props: PropsDeclaration<Props>,
  setup: SetupFunction<Props>,
): HostElementConstructor<Props> {
  const attributeNameToPropertyName = createAttributePropertyNameMap(props)
  const observedAttributes = Array.from(attributeNameToPropertyName.keys())
  const hasAttributes = observedAttributes.length > 0

  class CustomElement extends HostElement {
    static observedAttributes = observedAttributes

    readonly _store: Store<Props>

    constructor() {
      super()
      this._store = createStore(this, props)
      setup(this, this._store)
      if (hasAttributes) {
        usePropertiesToAttributes(this, this._store, props)
      }
    }

    attributeChangedCallback(
      name: string,
      _oldValue: string | null,
      newValue: string | null,
    ): void {
      handleAttributeChanged(
        this._store,
        props,
        attributeNameToPropertyName,
        name,
        newValue,
      )
    }
  }

  defineGetterSetter(CustomElement, props)

  return CustomElement as HostElementConstructor<any> as HostElementConstructor<Props>
}

function defineGetterSetter<Props extends object>(
  ElementConstructor: new () => { _store: Store<Props> },
  props: PropsDeclaration<Props>,
) {
  for (const prop of Object.keys(props)) {
    Object.defineProperty(ElementConstructor.prototype, prop, {
      enumerable: true,
      configurable: false,
      get() {
        return (this._store[prop] as Signal<unknown>).get()
      },
      set(v: unknown) {
        ;(this._store[prop] as Signal<unknown>).set(v)
      },
    })
  }
}
```

### 1.5 Behavioral differences from current

| Aspect | Current `defineCustomElement` | New `defineCustomElement` |
|--------|------------------------------|---------------------------|
| Argument order | `(setup, props)` | `(props, setup)` |
| `observedAttributes` | Not handled | Static property on returned class |
| `attributeChangedCallback` | Not handled | Defined on class prototype |
| `usePropertiesToAttributes` | Not handled | Called in constructor |
| `createAttributePropertyNameMap` | Not handled | Called once at class definition time |
| Getter/setter pairs | ✓ | ✓ (unchanged) |

### 1.6 Empty-props component behavior

When `PropsDeclaration` is `{}` (like `PopoverPopup`):
- `attributeNameToPropertyName` is an empty `Map`
- `observedAttributes` is `[]`
- `hasAttributes` is `false`, so `usePropertiesToAttributes` is skipped
- `attributeChangedCallback` is a no-op (never called by the browser since `observedAttributes` is empty)
- No getter/setter pairs are defined

This means the code behaves identically for empty-props components — no performance overhead.

### 1.7 Update `packages/core/src/index.ts`

No change needed. `defineCustomElement` and `HostElementConstructor` are already exported. The attribute-related functions (`createAttributePropertyNameMap`, `handleAttributeChanged`, `usePropertiesToAttributes`) remain exported (they are `@internal` but still available for advanced use).

### 1.8 Update existing test call sites

The argument order change affects all existing callers. In tests, the current pattern is:

update: 不要调换 setup 和 props 的顺序，保持 setup 在前 props 在后面

```typescript
// Before
const TestElement = defineCustomElement(setupFn, defineProps({}))

// After
const TestElement = defineCustomElement(defineProps({}), setupFn)
```

Files to update:
- `packages/core/src/use-effect.test.ts` — ~12 call sites
- `packages/utils/src/use-press.test.ts` — 1 call site (in `createTestElement`)

---

## Phase 2: Modify CLI (`packages/cli/src/generate.ts`)

### 2.1 Simplify `generateWebComponentFile`

The entire function becomes much simpler. No more conditional logic for props/events, no attribute handling, no getter/setter generation.

New implementation:

```typescript
function generateWebComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const { componentName, kebabName } = getComponentMeta(component)
  const relativePath = getRelativePathToSource(sourceFile, component, project)

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/core',
    namedImports: [
      { name: 'defineCustomElement' },
      { name: 'registerCustomElement' },
    ],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: relativePath,
    namedImports: [
      { name: `${componentName}PropsDeclaration` },
      { name: `setup${componentName}` },
    ],
  })

  // export class PopoverRootElement extends defineCustomElement(
  //   PopoverRootPropsDeclaration,
  //   setupPopoverRoot,
  // ) {}
  sourceFile.addClass({
    name: `${componentName}Element`,
    isExported: true,
    extends: `defineCustomElement(${componentName}PropsDeclaration, setup${componentName})`,
  })

  sourceFile.addFunction({
    name: `register${componentName}Element`,
    isExported: true,
    returnType: 'void',
    statements: [
      `registerCustomElement('aria-ui-${kebabName}', ${componentName}Element)`,
    ],
  })
}
```

### 2.2 What's removed from the generated output

- No more `createStore` import
- No more `HostElement` import
- No more `Store` type import
- No more `createAttributePropertyNameMap` import
- No more `handleAttributeChanged` import
- No more `usePropertiesToAttributes` import
- No more `type XXXProps` import (not needed since getter/setters are runtime-defined)
- No more module-level `attributeNameToPropertyName` and `observedAttributes` variables
- No more `private _store` property declaration
- No more `static observedAttributes`
- No more constructor body
- No more `attributeChangedCallback` method
- No more getter/setter pairs with JSDoc

### 2.3 Impact on other generated files (React, Preact, Solid, Vue, Svelte)

The other framework wrappers import from `elements/*.gen.ts`:

- `registerXXXElement` — still exported, no change
- `type XXXElement` — still exported as a class, no change

The React, Preact, and Solid wrappers use `type XXXElement` for `HTMLAttributes<XXXElement>` and `RefAttributes<XXXElement>`. Since `PopoverRootElement` is still a class that extends `HostElement` (via `defineCustomElement`), the type is preserved. No changes needed to the React/Preact/Solid/Vue/Svelte generators.

### 2.4 Type inference for `XXXElement`

With the `class extends` pattern, TypeScript correctly infers that `PopoverRootElement` is a class whose instances have all the props as properties, because `defineCustomElement` returns `HostElementConstructor<Props>` which is `new () => HostElement & Props`.

So `PopoverRootElement` instances have type `HostElement & PopoverRootProps`, giving access to `.defaultOpen`, `.open`, `.modal`, `.disabled` etc. This satisfies `HTMLAttributes<PopoverRootElement>` usage in React/Preact wrappers.

---

## Phase 3: Verify No Other Files Need Changes

### 3.1 `AGENTS.md`

The AGENTS.md has this section:

> **Note:** The `{ComponentPartName}Element` class is automatically generated by `packages/cli/src/generate.ts` to `packages/elements/src/generated/elements/{component-name}.gen.ts`. Do NOT create manual `exports.ts` or `index.ts` files for ComponentGroups.

This is still accurate — the element class is still generated, just with simpler code. No change needed.

### 3.2 `packages/core/src/index.ts`

No change needed. `defineCustomElement` and `HostElementConstructor` are already exported. `createStore` is still exported (used internally by `defineCustomElement`, and could be used elsewhere).

### 3.3 `packages/elements/src/popover/index.ts`

No change needed. The entry file still re-exports `setupXXX`, `type XXXProps`, `type XXXEvents` from each component part file. The parser still reads this file to discover components.

### 3.4 Component source files (`popover-root.ts`, etc.)

No change needed. The source files are unchanged — they still export `XXXPropsDeclaration`, `setupXXX`, etc.

### 3.5 Integration helpers (`integrations/react.ts`, `integrations/preact.ts`)

No change needed. They receive `tagName`, `propNames`, `eventHandlersMap`, and `register` function — all of which are still generated the same way by the CLI.

---

## Phase 4: Update Tests

### 4.1 `packages/core/src/use-effect.test.ts`

Update all ~12 call sites to swap argument order:

```typescript
// Before
const TestElement = defineCustomElement((host) => {
  useEffect(host, effectFn)
}, defineProps({}))

// After
const TestElement = defineCustomElement(defineProps({}), (host) => {
  useEffect(host, effectFn)
})
```

### 4.2 `packages/utils/src/use-press.test.ts`

Update the `createTestElement` helper:

```typescript
// Before
const TestElement = defineCustomElement(setupFn, defineProps({}))

// After
const TestElement = defineCustomElement(defineProps({}), setupFn)
```

---

## Todo List

### Phase 1: Modify `defineCustomElement`
- [ ] Update `defineCustomElement` in `packages/core/src/define-custom-element.ts`:
  - [ ] Swap argument order from `(setup, props)` to `(props, setup)`
  - [ ] Add `createAttributePropertyNameMap` call at class-definition time
  - [ ] Add `static observedAttributes` to the returned class
  - [ ] Add `attributeChangedCallback` to the returned class
  - [ ] Add `usePropertiesToAttributes` call in constructor (conditional on having attributes)
  - [ ] Update `HostElementConstructor` type to include `observedAttributes`
- [ ] Run typecheck to verify core package compiles

### Phase 2: Update test call sites
- [ ] Update `packages/core/src/use-effect.test.ts` — swap argument order (~12 sites)
- [ ] Update `packages/utils/src/use-press.test.ts` — swap argument order (1 site)
- [ ] Run tests to verify they still pass

### Phase 3: Simplify CLI generator
- [ ] Rewrite `generateWebComponentFile` in `packages/cli/src/generate.ts`
- [ ] Build CLI package
- [ ] Run `pnpm run build:gen` in elements package to regenerate files
- [ ] Verify the regenerated files look correct

### Phase 4: Verify everything works
- [ ] Run typecheck across the entire repo
- [ ] Run elements tests
- [ ] Run utils tests
- [ ] Verify no leftover references to old imports (`createAttributePropertyNameMap`, `handleAttributeChanged`, `usePropertiesToAttributes`) in generated element files
