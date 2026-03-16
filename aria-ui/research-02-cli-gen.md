# Research: CLI Code Generation (`@aria-ui-v2/cli`)

## Overview

The `@aria-ui-v2/cli` package is a code generation tool that reads hand-written component source files and automatically generates framework-specific wrappers for **6 targets**: Web Components (custom elements), React, Preact, Solid, Vue, and Svelte. The single source of truth is the component source file (e.g., `popover-root.ts`); the generator produces everything needed to use that component in each framework.

## Architecture

```
Source Files                    CLI                        Generated Files
─────────────                   ───                        ───────────────
popover/popover-root.ts    ┐                          ┌─ elements/popover-root.gen.ts
popover/popover-trigger.ts ┤                          ├─ react/popover-root.gen.ts
popover/popover-popup.ts   ┤    parse.ts              ├─ preact/popover-root.gen.ts
popover/popover-positioner.ts ┤  ──────────►          ├─ solid/popover-root.gen.ts
popover/index.ts ──────────┘    generate.ts           ├─ vue/popover-root.gen.ts
                                                      ├─ svelte/popover-root.gen.ts
                                                      └─ svelte/popover-root.gen.svelte
                                                      (× 4 components = 28 files total)
```

## Entry Point and Invocation

### CLI Binary

The CLI is exposed as `aria-ui` via `packages/cli/bin/aria-ui.mjs`:

```js
#!/usr/bin/env node
import '../dist/bin.mjs'
```

### CLI Arguments

Defined in `bin.ts` using the `@effect/cli` framework:

```
aria-ui --tsconfig <path> --entry <path> --output <dir>
```

| Flag | Description |
|------|-------------|
| `--tsconfig` | Path to `tsconfig.json` (must exist) |
| `--entry` | Path to the component group's `index.ts` entry file (must exist) |
| `--output` | Directory where generated files are written |

### How It's Invoked

In `packages/elements/package.json`:

```json
{
  "scripts": {
    "build": "pnpm run build:tsdown && pnpm run build:gen",
    "build:gen": "aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated"
  }
}
```

The CLI runs after `tsdown` builds the package — it generates the framework wrapper files into `src/generated/`.

### Dependencies

| Package | Purpose |
|---------|---------|
| `@effect/cli` | CLI argument parsing and command structure |
| `@effect/platform` + `@effect/platform-node` | Cross-platform filesystem and path operations |
| `effect` | Effect runtime for structured concurrency |
| `ts-morph` | TypeScript AST manipulation for both parsing and generation |
| `prettier` | Code formatting of generated `.ts` files |
| `typescript` | TypeScript compiler (peer dependency) |

---

## Phase 1: Parsing (`parse.ts`)

The parser uses `ts-morph` to analyze TypeScript source files and extract component metadata.

### Data Model

```typescript
interface PropInfo {
  name: string     // e.g., "defaultOpen"
  comment: string  // JSDoc comment text
}

interface EventInfo {
  name: string     // e.g., "openChange"
  comment: string  // JSDoc comment text
}

interface ComponentInfo {
  name: string            // e.g., "PopoverRoot"
  sourceFilePath: string  // Absolute path to the source file
  props: PropInfo[]
  events: EventInfo[]
}
```

### Step-by-Step Parsing Flow

**1. Load the TypeScript project**

```typescript
const project = new Project({ tsConfigFilePath })
const sourceFile = project.getSourceFileOrThrow(entryFilePath)
```

**2. Extract component names from `setupXXX` exports**

The parser scans the entry file (e.g., `popover/index.ts`) for all export declarations and looks for named exports starting with `setup`. The component name is derived by stripping the `setup` prefix:

```
setupPopoverRoot       → PopoverRoot
setupPopoverTrigger    → PopoverTrigger
setupPopoverPopup      → PopoverPopup
setupPopoverPositioner → PopoverPositioner
```

**3. Resolve the source file path**

For each `setupXXX`, the parser follows the re-export chain from the entry file back to the actual source file. Using `exportDecl.getModuleSpecifierSourceFileOrThrow()`, it resolves e.g. `'./popover-root.ts'` to its absolute path.

**4. Extract props from `XXXProps` interface**

The parser looks for an export named `{ComponentName}Props` in the entry file. If found, it:
1. Follows the re-export to the source file
2. Finds the `InterfaceDeclaration` by name
3. Uses `interfaceDecl.getType().getProperties()` to get all properties (including those from `extends` or type manipulation like `Omit`)
4. For each property, extracts the name and JSDoc comment text

The use of `getType().getProperties()` is significant — it resolves the *final* set of properties after TypeScript evaluates any type-level operations (extends, Omit, Pick, etc.), not just the properties declared directly in the interface.

**5. Extract events from `XXXEvents` interface**

Identical to props extraction, but looks for `{ComponentName}Events` interface. Events are optional — components without events simply return an empty array.

### Entry File Convention

The entry file must re-export `setupXXX`, `type XXXProps`, and optionally `type XXXEvents` from each component part file:

```typescript
// popover/index.ts
export { setupPopoverRoot, type PopoverRootProps, type PopoverRootEvents } from './popover-root.ts'
export { setupPopoverTrigger, type PopoverTriggerProps, type PopoverTriggerEvents } from './popover-trigger.ts'
export { setupPopoverPopup, type PopoverPopupProps } from './popover-popup.ts'
export { setupPopoverPositioner, type PopoverPositionerProps } from './popover-positioner.ts'
```

---

## Phase 2: Generation (`generate.ts`)

The generator creates files using `ts-morph`'s AST manipulation API. For each component, it creates up to 7 files (6 `.gen.ts` + 1 `.gen.svelte`).

### Output Directory Structure

```
src/generated/
├── elements/    # Web Component classes
│   ├── popover-root.gen.ts
│   ├── popover-trigger.gen.ts
│   ├── popover-popup.gen.ts
│   └── popover-positioner.gen.ts
├── react/       # React wrappers
├── preact/      # Preact wrappers
├── solid/       # Solid wrappers
├── vue/         # Vue wrappers
└── svelte/      # Svelte wrappers (.gen.ts + .gen.svelte)
```

### Helper Types and Functions

```typescript
type ComponentMeta = {
  componentName: string          // "PopoverRoot"
  kebabName: string              // "popover-root"
  props: PropInfo[]
  events: EventInfo[]
  hasProps: boolean
  hasEvents: boolean
  eventHandlers: Array<{
    eventName: string            // "openChange"
    handlerName: string          // "onOpenChange"
  }>
}
```

Key helper functions:
- `toKebabCase("PopoverRoot")` → `"popover-root"`
- `toEventHandlerName("openChange")` → `"onOpenChange"`
- `toEventAttributeName("openChange")` → `"onopenChange"` (for Svelte)
- `getRelativePathToSource()` — computes the relative import path from a generated file back to the source file
- `formatArrayInitializer(["'a'", "'b'"])` → `"['a', 'b']"`
- `formatObjectInitializer(["a: 'b'"])` → `"{a: 'b'}"`

### File Writing Pipeline

1. Create a `ts-morph` `SourceFile` in memory
2. Call the framework-specific generation function to populate the AST
3. Extract the full text from the source file
4. Format with Prettier (`.ts` files only, `.svelte` files skip formatting)
5. Write to the filesystem

---

## Generated Output: Web Components (`elements/`)

This is the most substantial generation target. It produces a `{ComponentName}Element` class extending `HostElement`.

### Conditional Generation Based on Props

The generated code varies based on whether the component has props:

| Feature | Has Props | No Props |
|---------|-----------|----------|
| `createAttributePropertyNameMap` import | ✓ | ✗ |
| `handleAttributeChanged` import | ✓ | ✗ |
| `usePropertiesToAttributes` import | ✓ | ✗ |
| `attributeNameToPropertyName` variable | ✓ | ✗ |
| `observedAttributes` variable + static property | ✓ | ✗ |
| `attributeChangedCallback` method | ✓ | ✗ |
| `usePropertiesToAttributes()` in constructor | ✓ | ✗ |
| getter/setter pairs | ✓ (one per prop) | ✗ |

### Full Example: Component With Props (PopoverRoot)

```typescript
import {
  createAttributePropertyNameMap,
  createStore,
  handleAttributeChanged,
  HostElement,
  registerCustomElement,
  type Store,
  usePropertiesToAttributes,
} from "@aria-ui-v2/core";
import {
  PopoverRootPropsDeclaration,
  setupPopoverRoot,
  type PopoverRootProps,
} from "../../popover/popover-root";

const attributeNameToPropertyName =
  /* @__PURE__ */ createAttributePropertyNameMap(PopoverRootPropsDeclaration);
const observedAttributes: string[] =
  /* @__PURE__ */ Array.from(attributeNameToPropertyName.keys());

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

  /** ... JSDoc from source ... */
  get defaultOpen(): PopoverRootProps["defaultOpen"] { return this._store.defaultOpen.get(); }
  set defaultOpen(value: PopoverRootProps["defaultOpen"]) { this._store.defaultOpen.set(value); }

  // ... more getter/setters for each prop
}

export function registerPopoverRootElement(): void {
  registerCustomElement("aria-ui-popover-root", PopoverRootElement);
}
```

### Minimal Example: Component Without Props (PopoverPopup)

```typescript
import { createStore, HostElement, registerCustomElement, type Store } from "@aria-ui-v2/core";
import { PopoverPopupPropsDeclaration, setupPopoverPopup, type PopoverPopupProps } from "../../popover/popover-popup";

export class PopoverPopupElement extends HostElement {
  private _store: Store<PopoverPopupProps>;

  constructor() {
    super();
    this._store = createStore(this, PopoverPopupPropsDeclaration);
    setupPopoverPopup(this, this._store);
  }
}

export function registerPopoverPopupElement(): void {
  registerCustomElement("aria-ui-popover-popup", PopoverPopupElement);
}
```

### How the Pieces Fit Together

1. **`createStore(host, PropsDeclaration)`** — creates a `Store<Props>` where each key is a `Signal`. The store is the reactive state container.
2. **`setupXXX(host, store)`** — the hand-written setup function receives the host element and the reactive store to wire up component behavior.
3. **`usePropertiesToAttributes(host, store, PropsDeclaration)`** — creates effects that watch each signal and sync property values to HTML attributes.
4. **`attributeChangedCallback`** — the standard custom element callback; when an HTML attribute changes, it updates the corresponding signal in the store via `handleAttributeChanged()`.
5. **Getter/setter pairs** — expose each prop as a JavaScript property on the element class, proxying reads/writes to the signal's `.get()` / `.set()`.
6. **`registerXXXElement()`** — calls `registerCustomElement()` which safely registers the element in `customElements` (no-op if already registered or in SSR).
7. **`/* @__PURE__ */` annotations** — on module-level computations (`createAttributePropertyNameMap`, `Array.from`) to enable tree-shaking by bundlers.

### Attribute Binding System

Each prop in `PropsDeclaration` can specify:

```typescript
{
  default: false,           // Default value
  attribute: 'default-open', // HTML attribute name (or false to skip)
  type: 'boolean',          // Serialization type: 'boolean' | 'string' | 'number' | 'json'
}
```

The attribute system provides bidirectional sync:
- **Property → Attribute**: `usePropertiesToAttributes` watches each signal and calls `element.setAttribute()` when the value changes
- **Attribute → Property**: `attributeChangedCallback` parses the attribute value and calls `signal.set()`

Type-specific serialization (`attribute.ts`):
- `boolean`: `true`/`false` ↔ `"true"`/`"false"` (empty string also maps to `true`)
- `string`: pass-through
- `number`: `Number()` / `String()`
- `json`: `JSON.parse()` / `JSON.stringify()`

---

## Generated Output: React (`react/`)

React wrappers use a shared `createComponent()` function from `@aria-ui-v2/integrations/react`.

### Generated Structure

```typescript
import { createComponent } from "@aria-ui-v2/integrations/react";
import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";
import type { PopoverRootProps as PopoverRootElementProps, PopoverRootEvents as PopoverRootElementEvents } from "../../popover/popover-root";
import { registerPopoverRootElement, type PopoverRootElement } from "../elements/popover-root.gen";

export interface PopoverRootProps extends HTMLAttributes<PopoverRootElement> {
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  open?: PopoverRootElementProps["open"];
  // ... more optional props
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
}

const propNames: string[] = ["defaultOpen", "open", "modal", "disabled"];
const eventHandlersMap: Record<string, string> = { onOpenChange: "openChange" };

export const PopoverRoot: ForwardRefExoticComponent<PopoverRootProps & RefAttributes<PopoverRootElement>>
  = /* @__PURE__ */ createComponent("aria-ui-popover-root", "PopoverRoot", propNames, eventHandlersMap, registerPopoverRootElement);
```

### Key Design Decisions

- **Props are optional** in the React interface (use `?` modifier), unlike the source interface where they're required. This is because React consumers rely on the custom element's default values.
- **Type aliasing**: The source `PopoverRootProps` is imported as `PopoverRootElementProps` to avoid name collision with the generated React props interface.
- **Event handler naming**: `openChange` event → `onOpenChange` prop (standard React convention).
- **Extends `HTMLAttributes`**: Allows passing standard HTML/React props like `className`, `style`, `onClick`, etc.

### `createComponent()` Runtime Behavior (from `integrations/react.ts`)

The shared `createComponent` function creates a `forwardRef` component that:

1. **Lazy registration**: Calls `register()` once on first render to define the custom element
2. **Prop separation**: Splits incoming props into three buckets:
   - `elementProps` — component-specific props (matched against `propNames`)
   - `eventHandlers` — event callbacks (matched against `eventNameMap`)
   - `reactProps` — everything else (passed directly to `createElement`)
3. **Property setting via `useLayoutEffect`**: Sets element properties imperatively after mount (not via attributes), so complex values like objects/booleans work correctly
4. **Event listeners via `AbortController`**: Registers event listeners once (empty deps `[]`) using `AbortController` for cleanup. Uses a ref (`eventHandlersRef`) to always access the latest callback without re-registering listeners
5. **Ref merging**: Merges the internal `elementRef` (for property/event access) with the forwarded ref (for consumer access)
6. **Hydration warning suppression**: Sets `suppressHydrationWarning: true` since attributes are set post-mount

---

## Generated Output: Preact (`preact/`)

Nearly identical to React, but imports from `preact` and `preact/compat` instead:

```typescript
import { createComponent } from "@aria-ui-v2/integrations/preact";
import type { HTMLAttributes } from "preact";
import type { ForwardRefExoticComponent, RefAttributes } from "preact/compat";
```

The `createComponent` implementation in `integrations/preact.ts` is an exact copy of the React version, adapted for Preact's API surface.

---

## Generated Output: Solid (`solid/`)

Solid uses a different approach because it doesn't have a vdom — it uses fine-grained reactivity.

### Generated Structure

```typescript
import type { PopoverRootEvents as PopoverRootElementEvents, PopoverRootProps as PopoverRootElementProps } from "../../popover/popover-root";
import { registerPopoverRootElement, type PopoverRootElement } from "../elements/popover-root.gen";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

export interface PopoverRootProps extends JSX.HTMLAttributes<PopoverRootElement> { ... }

export const PopoverRoot: Component<PopoverRootProps> = (props): any => {
  registerPopoverRootElement();

  const [elementProps, eventHandlers, restProps] = splitProps(
    props,
    ["defaultOpen", "open", "modal", "disabled"],
    ["onOpenChange"],
  );

  return h(
    "aria-ui-popover-root",
    mergeProps(restProps, {
      "prop:defaultOpen": () => elementProps.defaultOpen,
      "prop:open": () => elementProps.open,
      "prop:modal": () => elementProps.modal,
      "prop:disabled": () => elementProps.disabled,
      "on:openChange": (event: PopoverRootElementEvents["openChange"]) =>
        eventHandlers.onOpenChange?.(event),
    }),
  );
};
```

### Key Solid-Specific Patterns

- **`splitProps()`**: Splits the props object into separate reactive groups without losing reactivity. This is Solid's alternative to destructuring (which breaks reactivity).
- **`prop:` prefix**: Tells Solid to set the value as a DOM property (not attribute). Required for complex types.
- **Getter functions**: Properties are wrapped in `() => elementProps.propName` to preserve reactivity — Solid tracks access lazily.
- **`on:` prefix**: Custom event binding syntax in Solid's hyperscript.
- **`mergeProps()`**: Combines rest props with element-specific props reactively.
- **`solid-js/h`**: Hyperscript for creating elements (used instead of JSX to avoid build dependency).
- **No `createComponent` helper**: Unlike React/Preact, the component function is generated inline because Solid's reactivity model requires different patterns.

### Import Order Note

The generator uses `'events-first'` import ordering for Solid (and Vue/Svelte), placing `XXXEvents` before `XXXProps` in the type import. React/Preact use `'props-first'`. This is purely cosmetic but ensures consistent formatting.

---

## Generated Output: Vue (`vue/`)

### Generated Structure

```typescript
import { defineComponent, h, type DefineSetupFnComponent, type HTMLAttributes } from "vue";
import type { PopoverRootEvents as PopoverRootElementEvents, PopoverRootProps as PopoverRootElementProps } from "../../popover/popover-root";
import { registerPopoverRootElement } from "../elements/popover-root.gen";

export interface PopoverRootProps { ... }

export const PopoverRoot: DefineSetupFnComponent<PopoverRootProps & HTMLAttributes> = defineComponent<PopoverRootProps & HTMLAttributes>(
  (_props, { slots: _slots }) => {
    registerPopoverRootElement();

    return () => {
      const { defaultOpen, open, modal, disabled, onOpenChange, ..._restProps } = _props;
      return h(
        "aria-ui-popover-root",
        {
          ..._restProps,
          "defaultOpen.prop": defaultOpen,
          "open.prop": open,
          "modal.prop": modal,
          "disabled.prop": disabled,
          "v-on:openChange": onOpenChange,
        },
        _slots.default?.(),
      );
    };
  },
  {
    props: ["defaultOpen", "open", "modal", "disabled", "onOpenChange"],
  },
);
```

### Key Vue-Specific Patterns

- **`defineComponent()` with setup function**: Uses the setup function variant (not options API) for cleaner typing.
- **`.prop` suffix**: `"defaultOpen.prop": defaultOpen` tells Vue to set a DOM property rather than attribute.
- **`v-on:` prefix**: `"v-on:openChange": onOpenChange` binds a custom event listener in Vue's `h()`.
- **Props config**: The second argument `{ props: [...] }` declares which props the component accepts, enabling Vue's props validation.
- **Destructuring in render function**: Props are destructured inside the returned render function (not in setup), ensuring reactivity is maintained — setup only runs once, but the render function re-runs.
- **Slot support**: `_slots.default?.()` renders the default slot content (children).
- **No `XXXElement` type import**: Vue doesn't need the element class for its props interface since it doesn't use `HTMLAttributes<Element>` like React.

---

## Generated Output: Svelte (`svelte/`)

Svelte requires a two-file approach because Svelte components are `.svelte` files, not JavaScript classes.

### TypeScript File (`.gen.ts`)

```typescript
import PopoverRootComponent from "./popover-root.gen.svelte";
import type { PopoverRootEvents as PopoverRootElementEvents, PopoverRootProps as PopoverRootElementProps } from "../../popover/popover-root";
import type { Component, Snippet } from "svelte";

export interface PopoverRootProps {
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  // ... more optional props
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
  children?: Snippet;
}

export const PopoverRoot: Component<PopoverRootProps> = PopoverRootComponent;
```

### Svelte Template File (`.gen.svelte`)

```svelte
<script lang="js">
  import { registerPopoverRootElement } from '../elements/popover-root.gen'
  registerPopoverRootElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-root {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-root>
```

### Key Svelte-Specific Patterns

- **`$props()` rune**: Svelte 5 rune for reactive prop destructuring. Default values (`= undefined`) are provided for optional props.
- **`{@render children?.()}` snippet**: Svelte 5 snippet syntax for rendering child content.
- **`on` + event name**: Event attribute naming in Svelte uses lowercase `on` prefix directly on the element: `onopenChange={onOpenChange}`.
- **`..._restProps` spread**: All unrecognized props are spread onto the custom element.
- **`children?: Snippet`**: Svelte includes a `children` prop typed as `Snippet` — this is unique to the Svelte target and not present in other frameworks.
- **`.svelte` not formatted by Prettier**: The `.gen.svelte` file is written as-is (the `writeFormattedFile` function only runs Prettier on `.ts` files).
- **`lang="js"` in script**: Even though types are in the `.gen.ts` file, the `.svelte` component uses JavaScript since all type information is handled externally.

---

## Props Interface Generation Pattern

The `addPropsInterface()` helper generates framework-specific props interfaces with a common pattern:

1. **Framework base type extension** (when applicable):
   - React: `extends HTMLAttributes<XXXElement>`
   - Preact: `extends HTMLAttributes<XXXElement>`
   - Solid: `extends JSX.HTMLAttributes<XXXElement>`
   - Vue: no extends (standalone interface)
   - Svelte: no extends (standalone interface)

2. **Props from source**: Each prop becomes an optional property (`?`) with a type reference like `PopoverRootElementProps["defaultOpen"]` and the original JSDoc comment.

3. **Event handlers from source**: Each event becomes an optional handler like `onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void`.

4. **Children (Svelte only)**: `children?: Snippet` added when `includeChildren: true`.

---

## `@__PURE__` Annotations

The generator uses `/* @__PURE__ */` annotations in several places:

- Module-level variable initializers: `createAttributePropertyNameMap(...)`, `Array.from(...)`
- Component factory calls: `createComponent(...)` in React/Preact

These annotations tell bundlers (Webpack, Rollup, esbuild) that the expression has no side effects. If the exported symbol is unused, the entire expression can be tree-shaken away.

---

## Tag Name Convention

All custom elements are registered with the prefix `aria-ui-`:

```
PopoverRoot       → aria-ui-popover-root
PopoverTrigger    → aria-ui-popover-trigger
PopoverPopup      → aria-ui-popover-popup
PopoverPositioner → aria-ui-popover-positioner
```

The `toKebabCase()` function converts PascalCase to kebab-case using regex: `str.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()`.

---

## End-to-End Data Flow

```
1. Developer writes:
   - popover-root.ts  (PopoverRootProps, PopoverRootEvents, setupPopoverRoot)
   - popover/index.ts (re-exports setup functions and types)

2. Build runs:
   pnpm run build:gen
   → aria-ui --tsconfig ./tsconfig.json --entry ./src/popover/index.ts --output ./src/generated

3. Parser (parse.ts):
   - Loads TS project via ts-morph
   - Finds setupXXX exports → component names
   - For each component:
     - Resolves source file path
     - Extracts Props interface properties + JSDoc
     - Extracts Events interface properties + JSDoc
   - Returns ComponentInfo[]

4. Generator (generate.ts):
   - For each ComponentInfo, generates:
     a. Web Component class with store, getters/setters, attribute sync
     b. React wrapper via createComponent()
     c. Preact wrapper via createComponent()
     d. Solid component with splitProps/mergeProps
     e. Vue component with defineComponent
     f. Svelte .gen.ts type file + .gen.svelte template
   - Each file is formatted with Prettier (except .svelte)
   - Written to src/generated/{framework}/

5. Result: Framework-specific components that wrap the custom element,
   with full TypeScript types, event handling, and property binding.
```

---

## Design Principles

1. **Single source of truth**: Hand-written component files define props, events, and behavior once. All framework wrappers are derived.

2. **Type safety across frameworks**: Generated interfaces reference source types via indexed access (`PopoverRootElementProps["defaultOpen"]`), ensuring type changes propagate automatically.

3. **Lazy registration**: All frameworks call `register()` on first use, avoiding side effects at import time.

4. **Property-based binding**: All frameworks set values as DOM properties (not attributes) on the custom element. This preserves rich types (booleans, objects, null) that would be lost in attribute serialization.

5. **Framework-idiomatic APIs**: Each generated wrapper follows its framework's conventions — React's `forwardRef`, Solid's `splitProps`, Vue's `defineComponent`, Svelte's runes and snippets.

6. **Tree-shakeable**: `/* @__PURE__ */` annotations ensure unused components can be eliminated by bundlers.
