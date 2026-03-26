# Plan: Replace Generated Element Files with `defineCustomElement`

## Goal

Eliminate the generated `elements/*.gen.ts` files entirely. Move the element class and register function directly into each ComponentPart source file using a simple pattern:

```typescript
export class PopoverRootElement extends defineCustomElement(setupPopoverRoot, PopoverRootPropsDeclaration) {}

export function registerPopoverRootElement(): void {
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}
```

Currently, the CLI generates verbose element files (100+ lines of boilerplate). By absorbing all attribute/property logic into `defineCustomElement`, we can hand-write the element class in a single line, and the `generated/elements/` directory goes away completely.

## Current vs. Proposed

### Before (generated `popover-root.gen.ts` — 103 lines, separate from source)

```typescript
// packages/elements/src/generated/elements/popover-root.gen.ts
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
  // ... more getter/setters
}

export function registerPopoverRootElement(): void {
  registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
```

### After (added to `popover-root.ts` — 2 exports, ~6 lines)

```typescript
// packages/elements/src/popover/popover-root.ts (at the bottom of the existing file)

export class PopoverRootElement extends defineCustomElement(
  setupPopoverRoot,
  PopoverRootPropsDeclaration,
) {}

export function registerPopoverRootElement(): void {
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}
```

The `generated/elements/` directory is deleted. The element class lives alongside its Props, Events, and setup function in the same source file.

### After — Component Without Props (popover-popup)

```typescript
// packages/elements/src/popover/popover-popup.ts (at the bottom of the existing file)

export class PopoverPopupElement extends defineCustomElement(
  setupPopoverPopup,
  PopoverPopupPropsDeclaration,
) {}

export function registerPopoverPopupElement(): void {
  registerCustomElement('aria-ui-popover-popup', PopoverPopupElement)
}
```

Uniform shape regardless of whether the component has props.

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
- `attributeChangedCallback` — attribute→property sync (with `oldValue === newValue` early return)
- `usePropertiesToAttributes()` — property→attribute sync in constructor

All of these are currently handled by the *generated* code. Moving them into `defineCustomElement` means the generated code is no longer needed.

### 1.2 Argument order

Keep the current argument order `(setup, props)`. No change.

### 1.3 New implementation

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

export type HostElementConstructor<Props extends AnyProps> = new () => HostElement & Props

type SetupFunction<Props extends AnyProps> = (
  host: HostElement,
  props: Store<Props>,
) => void

export function defineCustomElement<
  Props extends AnyProps = { __noProps__: never },
>(
  setup: SetupFunction<Props>,
  props: PropsDeclaration<Props>,
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
      oldValue: string | null,
      newValue: string | null,
    ): void {
      if (oldValue === newValue) return

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

### 1.4 Behavioral differences from current

| Aspect | Current `defineCustomElement` | New `defineCustomElement` |
|--------|------------------------------|---------------------------|
| Argument order | `(setup, props)` | `(setup, props)` (unchanged) |
| `observedAttributes` | Not handled | Static property on returned class |
| `attributeChangedCallback` | Not handled | Defined on class prototype, with `oldValue === newValue` early return |
| `usePropertiesToAttributes` | Not handled | Called in constructor (conditional on having attributes) |
| `createAttributePropertyNameMap` | Not handled | Called once at class definition time |
| Getter/setter pairs | ✓ | ✓ (unchanged) |

### 1.5 Empty-props component behavior

When `PropsDeclaration` is `{}` (like `PopoverPopup`):
- `attributeNameToPropertyName` is an empty `Map`
- `observedAttributes` is `[]`
- `hasAttributes` is `false`, so `usePropertiesToAttributes` is skipped
- `attributeChangedCallback` is a no-op (never called by the browser since `observedAttributes` is empty)
- No getter/setter pairs are defined

No performance overhead for empty-props components.

### 1.6 Update `packages/core/src/index.ts`

No change needed. `defineCustomElement` and `HostElementConstructor` are already exported.

### 1.7 No test changes needed

The argument order is unchanged, so existing test call sites continue to work as-is:

```typescript
const TestElement = defineCustomElement(setupFn, defineProps({}))
```

No changes in `packages/core/src/use-effect.test.ts` or `packages/utils/src/use-press.test.ts`.

---

## Phase 2: Add Element Classes to Source Files

### 2.1 What to add to each ComponentPart file

Each ComponentPart file (e.g., `popover-root.ts`) gets two new exports at the bottom:

```typescript
/**
 * @public
 */
export class PopoverRootElement extends defineCustomElement(
  setupPopoverRoot,
  PopoverRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerPopoverRootElement(): void {
  registerCustomElement('aria-ui-popover-root', PopoverRootElement)
}
```

Need to add `defineCustomElement` and `registerCustomElement` to the imports from `@aria-ui-v2/core`.

### 2.2 Files to modify

- `packages/elements/src/popover/popover-root.ts` — add `PopoverRootElement` + `registerPopoverRootElement`
- `packages/elements/src/popover/popover-trigger.ts` — add `PopoverTriggerElement` + `registerPopoverTriggerElement`
- `packages/elements/src/popover/popover-popup.ts` — add `PopoverPopupElement` + `registerPopoverPopupElement`
- `packages/elements/src/popover/popover-positioner.ts` — add `PopoverPositionerElement` + `registerPopoverPositionerElement`

### 2.3 Tag name convention

The tag name follows the same convention as before: `aria-ui-{kebab-case-component-name}`.

```
PopoverRoot       → aria-ui-popover-root
PopoverTrigger    → aria-ui-popover-trigger
PopoverPopup      → aria-ui-popover-popup
PopoverPositioner → aria-ui-popover-positioner
```

### 2.4 Update `popover/index.ts` entry file

Add re-exports for the new element classes and register functions:

```typescript
export {
  OpenChangeEvent,
  setupPopoverRoot,
  PopoverRootElement,
  registerPopoverRootElement,
  type PopoverRootEvents,
  type PopoverRootProps,
  type PopoverRootPropsDeclaration,
} from './popover-root.ts'

export {
  setupPopoverTrigger,
  PopoverTriggerElement,
  registerPopoverTriggerElement,
  type PopoverTriggerEvents,
  type PopoverTriggerProps,
  type PopoverTriggerPropsDeclaration,
} from './popover-trigger.ts'

export {
  setupPopoverPopup,
  PopoverPopupElement,
  registerPopoverPopupElement,
  type PopoverPopupProps,
  type PopoverPopupPropsDeclaration,
} from './popover-popup.ts'

export {
  setupPopoverPositioner,
  PopoverPositionerElement,
  registerPopoverPositionerElement,
  type PopoverPositionerProps,
  type PopoverPositionerPropsDeclaration,
} from './popover-positioner.ts'
```

---

## Phase 3: Modify CLI (`packages/cli/src/generate.ts`)

### 3.1 Delete `generateWebComponentFile`

Remove the `generateWebComponentFile` function entirely. The CLI no longer generates `elements/*.gen.ts` files.

### 3.2 Remove `elements` output directory

In `generateFiles`, remove the `elements` directory from `outputDirs`:

```typescript
const outputDirs = {
  // elements: removed
  react: path.join(outputDir, 'react'),
  preact: path.join(outputDir, 'preact'),
  solid: path.join(outputDir, 'solid'),
  vue: path.join(outputDir, 'vue'),
  svelte: path.join(outputDir, 'svelte'),
}
```

Remove the element file generation from the loop:

```typescript
for (const component of components) {
  // No more: writeSourceFile(elementsPath, generateWebComponentFile)

  const reactPath = path.join(outputDirs.react, fileName)
  yield* writeSourceFile(reactPath, (sourceFile) => generateReactComponentFile(...))
  // ... preact, solid, vue, svelte
}
```

### 3.3 Update framework wrapper generators — import path changes

All framework wrapper generators currently import `registerXXXElement` and `type XXXElement` from `../elements/xxx.gen`. These imports must change to point at the source file directly.

The generators already compute `relativePathToSource` for importing `XXXProps`/`XXXEvents`. The same path now also provides `XXXElement` and `registerXXXElement`.

**React generator — before:**

```typescript
// Two separate imports: types from source, element from generated
import type { PopoverRootProps as PopoverRootElementProps, PopoverRootEvents as PopoverRootElementEvents } from "../../popover/popover-root";
import { registerPopoverRootElement, type PopoverRootElement } from "../elements/popover-root.gen";
```

**React generator — after:**

```typescript
// Single import from the source file
import {
  registerPopoverRootElement,
  type PopoverRootElement,
  type PopoverRootProps as PopoverRootElementProps,
  type PopoverRootEvents as PopoverRootElementEvents,
} from "../../popover/popover-root";
```

The two separate imports (types from source + element from generated) merge into a single import from the source file. This applies to all 5 framework generators:

- **React**: import `registerXXXElement` + `type XXXElement` from source
- **Preact**: import `registerXXXElement` + `type XXXElement` from source
- **Solid**: import `registerXXXElement` + `type XXXElement` from source
- **Vue**: import `registerXXXElement` from source (no `type XXXElement` needed)
- **Svelte `.gen.svelte`**: import `registerXXXElement` from source

### 3.4 Example: Updated React generated file

```typescript
import { createComponent } from "@aria-ui-v2/integrations/react";
import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";
import {
  registerPopoverRootElement,
  type PopoverRootElement,
  type PopoverRootProps as PopoverRootElementProps,
  type PopoverRootEvents as PopoverRootElementEvents,
} from "../../popover/popover-root";

export interface PopoverRootProps extends HTMLAttributes<PopoverRootElement> {
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  open?: PopoverRootElementProps["open"];
  modal?: PopoverRootElementProps["modal"];
  disabled?: PopoverRootElementProps["disabled"];
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
}

const propNames: string[] = ["defaultOpen", "open", "modal", "disabled"];
const eventHandlersMap: Record<string, string> = { onOpenChange: "openChange" };
export const PopoverRoot: ForwardRefExoticComponent<
  PopoverRootProps & RefAttributes<PopoverRootElement>
> = /* @__PURE__ */ createComponent(
  "aria-ui-popover-root",
  "PopoverRoot",
  propNames,
  eventHandlersMap,
  registerPopoverRootElement,
);
```

### 3.5 Example: Updated Svelte `.gen.svelte` file

The import path changes from `'../elements/popover-root.gen'` to the source file path:

```svelte
<script lang="js">
  import { registerPopoverRootElement } from '../../popover/popover-root'
  registerPopoverRootElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-root {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-root>
```

### 3.6 Delete existing `generated/elements/` files

After the CLI is updated and regenerated, the `packages/elements/src/generated/elements/` directory and all its `.gen.ts` files should be deleted.

---

## Phase 4: Update `AGENTS.md`

### 4.1 File Structure section

Update to mention that the element class and register function live in the ComponentPart file:

> For each **ComponentPart** (e.g., `FooRoot`), create:
>
> - `packages/elements/src/foo/foo-root.ts` - ComponentPart implementation (contains Props, PropsDeclaration, Events, setup function, Element class, and register function)

Remove the old note about generated element files.

### 4.2 ComponentPart File Structure section

Add the element class and register function to the template:

```typescript
/**
 * @public
 */
export interface FooRootProps { ... }

/**
 * @internal
 */
export const FooRootPropsDeclaration = /* @__PURE__ */ defineProps<FooRootProps>({ ... })

/**
 * @public
 * Optional: Only include if the component emits events
 */
export interface FooRootEvents { ... }

/**
 * @internal
 */
export function setupFooRoot(host: HostElement, props: Store<FooRootProps>) {
  // Setup logic
}

/**
 * @public
 */
export class FooRootElement extends defineCustomElement(
  setupFooRoot,
  FooRootPropsDeclaration,
) {}

/**
 * @internal
 */
export function registerFooRootElement(): void {
  registerCustomElement('aria-ui-foo-root', FooRootElement)
}
```

### 4.3 Export Visibility Rules section

Add the new exports:

**Always `@public`:**

- `{ComponentPartName}Props` interface (if exists)
- `{ComponentPartName}Events` interface (if exists)
- `{ComponentPartName}Element` class

**Always `@internal`:**

- `{ComponentPartName}PropsDeclaration` constant (if exists)
- `setup{ComponentPartName}` function
- `register{ComponentPartName}Element` function

### 4.4 Registration section

Update to import from ComponentPart files instead of generated files:

```typescript
import { registerFooItemElement } from './foo/foo-item.ts'
import { registerFooRootElement } from './foo/foo-root.ts'

export function registerElements(): void {
  if (typeof window === 'undefined') {
    return
  }

  registerFooRootElement()
  registerFooItemElement()
}
```

### 4.5 Remove generated element file references

Remove/update any mentions of `packages/elements/src/generated/elements/` since that directory no longer exists. The framework wrapper files (React, Preact, Solid, Vue, Svelte) are still generated to `packages/elements/src/generated/{framework}/`.

---

## Phase 5: Verify Everything Works

- [x] Run typecheck across the entire repo
- [x] Run elements tests
- [x] Run utils tests
- [x] Verify no remaining references to `generated/elements/` in any source or generated file
- [x] Verify framework wrapper generated files import from source files, not from `../elements/xxx.gen`

---

## Todo List

### Phase 1: Modify `defineCustomElement`
- [x] Update `defineCustomElement` in `packages/core/src/define-custom-element.ts`:
  - [x] Add `createAttributePropertyNameMap` call at class-definition time
  - [x] Add `static observedAttributes` to the returned class
  - [x] Add `attributeChangedCallback` with `oldValue === newValue` early return
  - [x] Add `usePropertiesToAttributes` call in constructor (conditional on having attributes)
- [x] Run typecheck to verify core package compiles

### Phase 2: Add element classes to source files
- [x] Add `PopoverRootElement` + `registerPopoverRootElement` to `popover-root.ts`
- [x] Add `PopoverTriggerElement` + `registerPopoverTriggerElement` to `popover-trigger.ts`
- [x] Add `PopoverPopupElement` + `registerPopoverPopupElement` to `popover-popup.ts`
- [x] Add `PopoverPositionerElement` + `registerPopoverPositionerElement` to `popover-positioner.ts`
- [x] Update `popover/index.ts` to re-export new element classes and register functions

### Phase 3: Modify CLI generator
- [x] Delete `generateWebComponentFile` function from `generate.ts`
- [x] Remove `elements` from output directories
- [x] Remove element file generation from the component loop
- [x] Update React generator — import `registerXXXElement` + `type XXXElement` from source path
- [x] Update Preact generator — import from source path
- [x] Update Solid generator — import from source path
- [x] Update Vue generator — import from source path
- [x] Update Svelte `.gen.ts` generator — no change (doesn't import from element files)
- [x] Update Svelte `.gen.svelte` generator — import from source path
- [x] Build CLI package
- [x] Run `pnpm run build:gen` in elements package to regenerate framework wrapper files
- [x] Delete `packages/elements/src/generated/elements/` directory

### Phase 4: Update `AGENTS.md`
- [x] Update File Structure section
- [x] Update ComponentPart File Structure template
- [x] Update Export Visibility Rules
- [x] Update Registration section
- [x] Remove references to `generated/elements/`

### Phase 5: Verify everything works
- [x] Run typecheck across the entire repo
- [x] Run elements tests
- [x] Run utils tests
- [x] Verify no remaining references to `generated/elements/`
