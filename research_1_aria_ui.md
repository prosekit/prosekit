# Research Report: aria-ui Framework (v2)

## 1. Executive Summary

**aria-ui** is a framework for building **light-DOM-based accessible web components** using reactive primitives. It lives inside the ProseKit monorepo under `aria-ui-packages/` and `aria-ui-website/`, and is currently under active development on the `ocavue/aria-ui-v2` branch.

The framework provides:
- A **reactive core** built on `alien-signals` for fine-grained reactivity
- A **component system** with props, stores, context, and lifecycle hooks
- A **code generation CLI** that produces framework wrappers (React, Preact, Solid, Vue, Svelte) from a single component source
- A **utility layer** with ARIA helpers, feature detection, and interaction handling
- An **Astro-based documentation website** using Astrobook for interactive playground

**Key design decisions:**
- Light DOM only (no Shadow DOM) — allows external CSS styling
- Event-based context system (no prop drilling, no framework-specific context)
- Setup function pattern separates component logic from element class definition
- Auto-generated `.gen.ts` files bridge the gap between hand-written setup functions and registered custom elements

---

## 2. Monorepo Structure

```
prosekit/
├── aria-ui-packages/          # aria-ui source packages
│   ├── core/                  # @aria-ui-v2/core - Reactive framework
│   ├── elements/              # @aria-ui-v2/elements - Web components
│   ├── cli/                   # @aria-ui-v2/cli - Code generation
│   ├── utils/                 # @aria-ui-v2/utils - Utilities & feature detection
│   └── integrations/          # @aria-ui-v2/integrations - React/Preact wrappers
├── aria-ui-website/           # Astro + Astrobook documentation site
├── pnpm-workspace.yaml        # Includes aria-ui-packages/* and aria-ui-website
└── turbo.json                 # Build orchestration (gen, build tasks)
```

The aria-ui packages are registered in the pnpm workspace (with a "TODO: remove me" comment, indicating they may move to a separate repo eventually).

---

## 3. Core Framework (`@aria-ui-v2/core`)

**Location:** `aria-ui-packages/core/src/`

### 3.1 Signals (`signal.ts`)

Thin wrapper around `alien-signals`:

```typescript
interface Signal<T> {
  get: () => T
  set: (value: T) => void
}

interface ReadonlySignal<T> {
  get: () => T
}

function createSignal<T>(initialValue: T): Signal<T>
```

- Signals are the atomic reactive unit
- `get()` tracks dependencies when called inside effects
- `set()` triggers reactive updates

### 3.2 Stores (`store.ts`)

A Store is a typed collection of Signals, one per prop:

```typescript
type Store<Props extends AnyProps> = {
  [Key in keyof Props]: Signal<Props[Key]>
}

function createStore<Props>(declaration: PropsDeclaration<Props>): Store<Props>
```

- Created from a `PropsDeclaration`
- Each signal initialized with its declared default value
- Automatically synced with element properties via getters/setters

### 3.3 Props Declaration System (`define-props.ts`)

```typescript
interface PropDeclaration<T> {
  default: T
  attribute: string | false    // HTML attribute name or false
  type: 'boolean' | 'string' | 'number' | 'json'
}

type PropsDeclaration<Props> = Readonly<{
  [K in keyof Props]: PropDeclaration<Props[K]>
}>

function defineProps<Props>(props: PropsDeclaration<Props>): PropsDeclaration<Props>
```

- `defineProps` freezes the declaration object
- Each prop must specify a default value, an attribute name (or `false`), and a type for serialization
- Types control how values are converted to/from HTML attribute strings

### 3.4 Attribute Handling (`attribute.ts`)

Bidirectional sync between element attributes and store signals:

**Prop → Attribute** (`usePropertiesToAttributes`):
- Runs as an effect; when a signal changes, converts to string and sets the attribute
- Skips setting attribute if value equals default and no attribute exists yet
- Type conversion: boolean → "true"/"false", number → string, json → JSON.stringify

**Attribute → Prop** (`handleAttributeChanged`):
- Called from `attributeChangedCallback`
- Looks up property name from attribute name via `createAttributePropertyNameMap`
- Converts attribute string back to typed value and sets the signal

### 3.5 Reactive Controller System (`reactive-controller.ts`, `host-element.ts`)

```typescript
interface ReactiveController {
  hostConnected?(): void
  hostDisconnected?(): void
}

interface ReactiveControllerHost {
  addController(controller: ReactiveController): void
  removeController(controller: ReactiveController): void
}
```

**HostElement** extends `HTMLElement` and implements `ReactiveControllerHost`:
- Manages a `Set<ReactiveController>`
- Calls `hostConnected()` on all controllers in `connectedCallback`
- Calls `hostDisconnected()` on all controllers in `disconnectedCallback`
- Snapshots the controller array during iteration (safe for nested add/remove)

### 3.6 Context System (`context.ts`)

Event-based context passing across the DOM tree — the most architecturally sophisticated part of the core:

```typescript
interface Context<T> {
  provide(element: HTMLElement, value: T): void
  consume(element: HTMLElement): () => T | undefined
}

function createContext<T>(key: string | symbol): Context<T>
```

**How it works:**

1. **Provider** — `context.provide(host, value)`:
   - Registers a ReactiveController on the host
   - On connect, listens for `aria-ui:context-request` events from descendants
   - Dispatches `aria-ui:context-provider` to announce availability

2. **Consumer** — `context.consume(host)` → getter function:
   - Registers a ConsumerController with an internal signal
   - On connect, dispatches `aria-ui:context-request` with a callback
   - Provider catches the event, calls the callback with the value
   - Returns a getter that reads the internal signal

3. **Nested providers** — When a new provider connects deeper in the tree, it dispatches a `ContextProviderEvent`. Ancestor providers detect this and re-parent their consumer subscriptions.

4. **Late binding** — The document root listens for pending context requests. If a consumer dispatches a request before any provider exists, the request is queued. When a provider eventually connects, all pending requests are re-dispatched.

5. **Memory safety** — Uses `WeakRef` and `WeakSet` to prevent memory leaks.

### 3.7 Custom Element Definition (`define-custom-element.ts`)

```typescript
function defineCustomElement<Props>(
  setup: (host: HostElement, props: Store<Props>) => void,
  props: PropsDeclaration<Props>,
): HostElementConstructor<Props>
```

- Creates a `CustomElement` class extending `HostElement`
- In the constructor: creates a store from the props declaration, then calls the `setup` function
- Defines property getters/setters on the class that delegate to the store's signals
- Enables `element.propName = value` access pattern

**Registration** (`register-custom-element.ts`):
```typescript
function registerCustomElement(name: string, constructor: CustomElementConstructor): void
```
- Wraps `customElements.define()` with a browser-environment check

### 3.8 Lifecycle Hooks

| Hook | File | Purpose |
|------|------|---------|
| `onMount(host, callback)` | `on-mount.ts` | Registers a controller; calls callback on connect; returns cleanup |
| `useEffect(host, callback)` | `use-effect.ts` | Reactive effect via `alien-signals`; tracks dependencies; manages cleanup between runs |
| `useId()` | `use-id.ts` | Generates unique IDs: `aria-ui-id-{n}` |
| `useInteraction(host, listeners)` | `use-interaction.ts` | Wraps `@remix-run/interaction` `on()` for event listeners with auto-cleanup |

### 3.9 Event Types (`event.ts`)

Provides `TypedEventTarget_v2<EventMap>` — a typed wrapper for `addEventListener`/`removeEventListener` with compile-time event name and handler type checking.

---

## 4. Elements Package (`@aria-ui-v2/elements`)

**Location:** `aria-ui-packages/elements/src/`

### 4.1 Component Architecture

**ComponentGroup** — a logical grouping (e.g., "Popover")
**ComponentPart** — individual web component (e.g., "PopoverRoot", "PopoverTrigger")

Each ComponentPart file follows a strict structure:
1. `{Name}Props` interface (`@public`) — all props required (no `?`), all with `@default` JSDoc
2. `{Name}PropsDeclaration` constant (`@internal`) — `defineProps(...)` with matching defaults
3. `{Name}Events` interface (`@public`, optional) — custom event types
4. `setup{Name}` function (`@internal`) — component logic

### 4.2 Popover Component Group

The only component group currently implemented. Has 4 parts:

#### PopoverRoot (`popover-root.ts`)
- **Props:** `defaultOpen` (false), `open` (undefined), `modal` (false), `disabled` (false)
- **Events:** `openChange: OpenChangeEvent`
- **Setup:** Computes effective open state, creates PopoverStore, provides via context, manages event emission, applies `aria-disabled`

#### PopoverTrigger (`popover-trigger.ts`)
- **Props:** `disabled` (false), `openOnHover` (false), `delay` (300ms), `closeDelay` (0ms)
- **Events:** `openChange: OpenChangeEvent`
- **Setup:** Consumes PopoverStoreContext, handles press interaction to toggle, optional hover behavior with delays, sets `aria-expanded`, `aria-disabled`, `aria-controls`

#### PopoverPopup (`popover-popup.ts`)
- **Props:** None (empty interface)
- **Setup:** Consumes PopoverStoreContext, generates unique ID, registers popup ID with store, sets `role="dialog"`

#### PopoverPositioner (`popover-positioner.ts`)
- **Props:** Extensive positioning options — `strategy`, `placement`, `autoUpdate`, `hoist`, `offset`, `flip`, `shift`, `overlap`, `fitViewport`, `sameWidth`, `sameHeight`, `inline`, `hide`, `boundary`, `rootBoundary`, `overflowPadding`, `elementContext`, `altBoundary`
- **Setup:** Consumes PopoverStoreContext, uses Popover API if supported (with togglePopover source), falls back to CSS display, calls `updatePlacement` from floating-ui, sets `data-side` and `data-align` attributes

#### PopoverStore (`popover-store.ts`)
Shared state object passed via context:
```typescript
class PopoverStore {
  readonly anchorElement = createSignal<HTMLElement | undefined>(undefined)
  constructor(
    readonly getOpen: () => boolean,
    readonly emitOpenChange: (open: boolean) => void,
  ) {}
  getPositionerId(): string
  setPositionerId(id: string): void
  getPopupId(): string
  setPopupId(id: string): void
}
```

#### Positioning Logic (`positioning.ts`)
- Uses `@floating-ui/dom` for position calculation
- Middleware stack: offset → flip → shift → size → inline → hide
- DPR-aware positioning (device pixel ratio)
- Auto-update with cleanup
- Sets CSS transform, position, visibility
- Supports Popover API hoisting

### 4.3 Element Registration (`index.ts`)

```typescript
export function registerElements(): void {
  if (typeof window === 'undefined') return
  registerPopoverRootElement()
  registerPopoverTriggerElement()
  registerPopoverPopupElement()
  registerPopoverPositionerElement()
}
```

Custom element tag names: `aria-ui-popover-root`, `aria-ui-popover-trigger`, `aria-ui-popover-popup`, `aria-ui-popover-positioner`.

Global `HTMLElementTagNameMap` extended for TypeScript support.

---

## 5. CLI & Code Generation (`@aria-ui-v2/cli`)

**Location:** `aria-ui-packages/cli/src/`

### 5.1 Parser (`parse.ts`)

```typescript
interface ComponentInfo {
  name: string
  sourceFilePath: string
  props: PropInfo[]
  events: EventInfo[]
}

function parse(tsconfigFilePath: string, entryFilePath: string): ComponentInfo[]
```

Uses `ts-morph` to:
1. Load TypeScript project from tsconfig
2. Find all `setupXXX` exports in the entry file
3. Extract corresponding `XXXProps` and `XXXEvents` interfaces
4. Extract JSDoc comments from interface properties
5. Resolve source file paths from import statements

### 5.2 Generator (`generate.ts`)

`generateFiles(components, outputDir)` produces 6 types of output per component:

| Target | Output | Approach |
|--------|--------|----------|
| **Web Component** | `.gen.ts` | Class extending HostElement with observedAttributes, getters/setters, attributeChangedCallback |
| **React** | `.gen.ts` | `createComponent()` → ForwardRefExoticComponent with ref forwarding, property sync via useLayoutEffect |
| **Preact** | `.gen.ts` | Identical to React but using Preact APIs |
| **Solid** | `.gen.ts` | `Component<Props>` with `splitProps`, returns `h()` element |
| **Vue** | `.gen.ts` | `defineComponent` with props array, destructured bindings |
| **Svelte** | `.gen.ts` + `.gen.svelte` | TypeScript wrapper + Svelte 5 syntax with `$props()` rune |

### 5.3 CLI Entry (`bin.ts`)

Uses `@effect/cli` for argument parsing:
- `--tsconfig` — path to tsconfig
- `--entry` — entry file with setup exports
- `--output` — output directory
- Runs `parse()` then `generateFiles()`

---

## 6. Utilities Package (`@aria-ui-v2/utils`)

**Location:** `aria-ui-packages/utils/src/`

### 6.1 ARIA Utilities (`aria.ts`)

| Function | Purpose |
|----------|---------|
| `useAriaDisabled(host, getDisabled)` | Sets `ariaDisabled` to "true" or null |
| `useAriaExpanded(host, getExpanded)` | Sets `ariaExpanded` to "true", "false", or null |
| `useAriaControls(host, getControls)` | Sets `aria-controls` attribute or removes it |

### 6.2 Element ID (`use-element-id.ts`)

`useElementId(element)` — returns existing `element.id` or generates a new one via `useId()`. Ensures elements have IDs for `aria-controls`, `aria-labelledby`, etc.

### 6.3 Hover Handling (`use-hover.ts`)

```typescript
interface UseHoverOptions {
  openDelay?: number
  closeDelay?: number
  onOpen?: () => void
  onClose?: () => void
}

function useHover(target: HTMLElement, options: UseHoverOptions): VoidFunction
```

Attaches mouseenter/mouseleave listeners with configurable delays. Returns cleanup function.

### 6.4 Feature Detection (`feature-detection/`)

| Module | Detects | Method |
|--------|---------|--------|
| `popover.ts` | Popover API support | `Object.hasOwn(HTMLElement.prototype, 'popover')` |
| `anchor-positioning.ts` | CSS Anchor Positioning | `CSS.supports('position-try', '...')` |
| `toggle-popover-source.ts` | `togglePopover({ source })` support | Depends on anchor positioning |

Each provides `get()` (cached), `detect()`, `override(value)` (for testing), and `reset()`.

---

## 7. Framework Integrations (`@aria-ui-v2/integrations`)

**Location:** `aria-ui-packages/integrations/src/`

### React (`react.ts`) and Preact (`preact.ts`)

Both use the same `createComponent` pattern:

```typescript
function createComponent<Props, CustomElement>(
  tagName: string,
  displayName: string,
  propNames: string[],
  eventNameMap: Record<string, string>,
  register: VoidFunction,
): ForwardRefExoticComponent<Props & RefAttributes<CustomElement>>
```

Key behaviors:
- Separates props, event handlers, and React/Preact attributes
- Syncs element properties via `useLayoutEffect`
- Event handler refs prevent stale closures
- Auto-registers custom element on first render
- `suppressHydrationWarning` for SSR compatibility
- Ref forwarding via `mergeRefs` helper

---

## 8. Generated Files

The CLI generates files into `aria-ui-packages/elements/src/generated/`:

```
generated/
├── elements/          # Web component classes
│   ├── popover-root.gen.ts
│   ├── popover-trigger.gen.ts
│   ├── popover-popup.gen.ts
│   └── popover-positioner.gen.ts
├── react/             # React wrappers
├── preact/            # Preact wrappers
├── solid/             # Solid wrappers
├── vue/               # Vue wrappers
└── svelte/            # Svelte wrappers + .gen.svelte files
```

Each generated web component file:
1. Extends `HostElement`
2. Implements `static observedAttributes` from prop declarations
3. Creates store in constructor and calls setup function
4. Implements `attributeChangedCallback` for attribute sync
5. Generates getter/setter for each prop with JSDoc
6. Exports a `register{Name}Element()` function

---

## 9. Testing

### Test Framework: Vitest

**Core tests** (`aria-ui-packages/core/src/`):
- `host-element.test.ts` — ReactiveController lifecycle, nested adds/removes, reconnection
- `use-effect.test.ts` — Effect hook with cleanup
- `use-id.test.ts` — ID generation uniqueness

**Component tests** (`aria-ui-packages/elements/src/popover/`):
- `popover.test.ts` — Comprehensive tests including:
  - Multiple browser feature combinations (Popover API on/off, anchor positioning on/off)
  - Rendering and visibility
  - Trigger click and hover behaviors
  - Controlled mode (external `open` prop)
  - Event emission (openChange)
  - Accessibility attributes (aria-expanded, aria-disabled, aria-controls, role)
  - Positioning and data attributes

Uses `lit-html` for rendering and `vitest/browser` for real DOM testing. Feature detection is overridden per test suite to simulate different browser capabilities.

---

## 10. Documentation Website (`aria-ui-website/`)

**Location:** `aria-ui-website/`

### Technology Stack
- **Astro** — Static site generator
- **Astrobook** — Interactive component playground at `/playground/`
- **Tailwind CSS v4** — Styling

### Structure
```
aria-ui-website/
├── src/
│   ├── content/docs/        # Documentation pages (MDX/Markdown)
│   ├── stories/             # Astrobook stories (framework-specific)
│   ├── styles/              # Tailwind CSS
│   └── pages/               # Astro routes
├── astro.config.ts          # Configuration
└── package.json
```

### Key Features
- Starlight documentation theme with custom Nova styling
- Multi-framework support: React, Vue, Preact, Svelte, Solid
- Interactive playground with framework switching
- OKLch color system with light/dark modes

---

## 11. Current Project State

### Branch: `ocavue/aria-ui-v2`

Recent commits suggest active, iterative development:
```
40922a6e  ignore
84576ec2  fix
370137c4  wix
c7fcf9e4  fix
a254734b  in
b525ccb7  v2
```

### What's Implemented
- Full reactive core (signals, stores, effects, context, lifecycle)
- HostElement base class with ReactiveController support
- Complete props declaration and attribute sync system
- Popover component group (4 parts: Root, Trigger, Popup, Positioner)
- Code generation CLI for 6 framework targets
- React and Preact integration wrappers
- Utility layer (ARIA helpers, feature detection, hover handling)
- Comprehensive test suite
- Documentation website scaffold

### What's Not Yet Implemented
- Only one component group (Popover) exists; no Menu, Button, Dialog, etc.
- Solid, Vue, Svelte integration wrappers exist only as generated code (no `createComponent` equivalent in integrations package)
- The workspace config has a "TODO: remove me" comment, suggesting the packages may eventually move to their own repo
- Website content appears minimal/in-progress

---

## 12. Architectural Patterns Summary

| Pattern | Implementation |
|---------|---------------|
| **Reactivity** | `alien-signals` for fine-grained dependency tracking |
| **Controller** | ReactiveController + HostElement for lifecycle management |
| **Context** | Custom DOM events (`aria-ui:context-request`, `aria-ui:context-provider`) |
| **Setup functions** | Logic separated from element class: `setupFooRoot(host, props)` |
| **Code generation** | CLI parses TypeScript AST → generates framework wrappers |
| **Type-safe props** | `PropsDeclaration` with defaults, attribute names, and types |
| **Light DOM** | No Shadow DOM — external CSS applies directly |
| **Attribute sync** | Bidirectional: prop→attribute (effects) and attribute→prop (attributeChangedCallback) |
| **Feature detection** | Cached detection with test overrides for Popover API, Anchor Positioning |
| **Positioning** | `@floating-ui/dom` with Popover API fallback |

---

## 13. Dependency Map

```
@aria-ui-v2/core
  ├── alien-signals          (signals)
  ├── @zag-js/dom-query      (DOM utilities)
  ├── @remix-run/interaction  (event handling)
  ├── @ocavue/utils          (utility functions)
  └── server-dom-shim        (SSR support)

@aria-ui-v2/elements
  ├── @aria-ui-v2/core
  ├── @aria-ui-v2/utils
  └── @floating-ui/dom       (positioning)

@aria-ui-v2/utils
  └── @aria-ui-v2/core

@aria-ui-v2/integrations
  ├── react / preact
  └── (framework-specific APIs)

@aria-ui-v2/cli
  ├── ts-morph               (AST manipulation)
  ├── prettier               (code formatting)
  ├── @effect/cli + effect   (CLI framework)
  └── @effect/platform       (file system)
```

---

## 14. Key Observations & Specificities

1. **No Shadow DOM** — This is a deliberate architectural choice. All components render in the light DOM, making them styleable with regular CSS/Tailwind. This is unusual for web component libraries.

2. **Event-based context** — Unlike React's context or Lit's context protocol, aria-ui uses custom DOM events for context. This works across any DOM tree regardless of framework, and supports late binding and nested providers.

3. **Two-phase component creation** — Components are authored as setup functions + props declarations, then the CLI generates the actual custom element classes. This keeps the authoring experience clean while handling the boilerplate of `observedAttributes`, getters/setters, and `attributeChangedCallback`.

4. **Multi-framework from single source** — The CLI generates React, Preact, Solid, Vue, and Svelte wrappers from the same component definition. This is the key value proposition for library authors.

5. **Popover API progressive enhancement** — The positioning system uses the native Popover API when available (for top-layer rendering) and falls back to CSS display toggling. Feature detection is cacheable and overridable for testing.

6. **Strict props contract** — Every prop must have a default value (no optional props), must be documented with `@default` in JSDoc, and must match between the interface and the declaration. This ensures predictable behavior and good documentation.

7. **alien-signals** — The choice of alien-signals (over preact-signals, solid-signals, etc.) suggests prioritizing performance and minimal bundle size for the reactive core.

8. **Effect-based CLI** — The CLI uses the Effect ecosystem (`@effect/cli`, `@effect/platform`), which is unusual but provides strong error handling and composability for the code generation pipeline.
