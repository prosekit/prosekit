# Research: `useInteraction` — Deep Dive

## Overview

`useInteraction` is a hook in `@aria-ui/core` that bridges the aria-ui reactive component lifecycle with `@remix-run/interaction`, a standalone event-binding library by Ryan Florence. It provides a declarative, lifecycle-aware way to attach event listeners (including semantic "interactions" like `press`) to `HostElement` instances.

---

## 1. `useInteraction` itself (the aria-ui side)

**File:** `packages/core/src/use-interaction.ts`

```ts
import { on, type EventListeners } from '@remix-run/interaction'
import type { HostElement } from './host-element.ts'
import { onMount } from './on-mount.ts'

export function useInteraction<T extends HostElement>(
  host: T,
  listeners: EventListeners<T>,
): VoidFunction {
  return onMount(host, () => {
    return on(host, listeners)
  })
}
```

This is remarkably simple — only 3 meaningful lines. It:

1. Waits for the host element to be connected to the DOM (via `onMount`).
2. Calls `on(host, listeners)` from `@remix-run/interaction` to attach the listeners.
3. Returns the dispose function from `on()` as the `onMount` cleanup, so listeners are removed when the element disconnects.
4. Returns an outer dispose function (from `onMount`) that can be called to tear down everything manually.

### Comparison with `useEffect`

`useEffect` wraps `onMount` too, but runs the callback inside `alien-signals`' `effect()` — meaning it re-runs reactively when signal dependencies change. `useInteraction` does **not** use reactive tracking; the listeners object is captured once at mount time and never re-evaluated. This is a key design choice: event listener bindings are static per mount cycle, not reactive.

### The `onMount` lifecycle wrapper

**File:** `packages/core/src/on-mount.ts`

`onMount(host, callback)` registers a `ReactiveController` on the host:

- **`hostConnected()`**: calls `callback()`, stores its return value as a cleanup function.
- **`hostDisconnected()`**: calls the cleanup function.
- If the host is already connected when `addController` is called, `hostConnected()` fires immediately.
- Returns a dispose function that removes the controller and runs cleanup.

This means `useInteraction` listeners are:
- Added when the element enters the DOM (`connectedCallback`)
- Removed when the element leaves the DOM (`disconnectedCallback`)
- Re-added if the element is re-connected
- Manually disposable via the returned function

---

## 2. `@remix-run/interaction` — The underlying library

**Package:** `@remix-run/interaction` v0.3.0
**Author:** Ryan Florence
**Tagline:** "Like components but for events"

### 2.1 Core API: `on(target, listeners)`

```ts
function on<target extends EventTarget>(
  target: target,
  listeners: EventListeners<target>,
): () => void
```

This is a thin wrapper around `createContainer`:

```ts
export function on(target, listeners) {
  let container = createContainer(target)
  container.set(listeners)
  return container.dispose
}
```

Returns a dispose function that removes all listeners.

### 2.2 `createContainer(target, options?)`

The real engine. Creates an `EventsContainer` that manages bindings between event types and listeners on a target.

**Key behaviors:**

1. **AbortController-based lifecycle**: Internally creates an `AbortController`. Disposal aborts it, which triggers cleanup of all bindings.

2. **External signal support**: Accepts an optional `AbortSignal` in options. When that signal aborts, the container disposes.

3. **Error handling**: Accepts `onError` callback (defaults to `throw`). All listener errors (sync and async) are routed through this.

4. **Efficient diffing via `container.set()`**: When `set()` is called with new listeners:
   - Normalizes each listener entry into a `Descriptor<Listener>` (separating listener function from options like `capture`, `once`, `passive`).
   - For each event type, compares against existing bindings by index:
     - If options changed → `rebind()` (remove old, add new with `addEventListener`)
     - If only listener changed → `setListener()` (swap the function reference in-place, no DOM API calls)
     - New excess descriptors → create new bindings
     - Excess old bindings → dispose them
   - This diffing is designed for vdom integrations where listeners are re-declared on every render.

### 2.3 `createBinding()` — The individual event binding

Each binding encapsulates one `addEventListener`/`removeEventListener` pair with these features:

#### Reentry protection (AbortSignal)

Every listener receives `(event, signal)` where `signal` is an `AbortSignal`. On each invocation:

```ts
let reentry = new AbortController()

let wrappedListener = (event) => {
  // Abort previous signal (marks it as "EventReentry")
  reentry.abort(new DOMException('', 'EventReentry'))
  reentry = new AbortController()

  let result = listener(event, reentry.signal)
  if (result instanceof Promise) {
    result.catch(onError)
  }
}
```

This means: if the same event fires again before a previous async handler completes, the old signal is aborted. This allows passing the signal to `fetch()` or checking `signal.aborted` to discard stale work. This is the "async reentry protection" feature.

#### Interaction initialization (reference counting)

When a binding is created for an event type that is a registered interaction (e.g., `"rmx:press"`):

1. Checks if the interaction setup has already been initialized for this target (via `initializedTargets` WeakMap).
2. If not, creates an `InteractionHandle` and calls `interaction.call(interactionContext)` — which runs the interaction's setup function.
3. Increments a reference count for that interaction on that target.
4. On dispose, decrements the ref count. (Note: the interaction's underlying listeners are tied to the container's signal, so they're cleaned up when the container aborts.)

**Key insight:** An interaction is initialized **at most once per target**, even if multiple listeners bind the same interaction type. This is enforced by the reference counting mechanism.

#### In-place listener swapping

```ts
setListener(newListener) {
  listener = newListener  // just swaps the closure variable
}
```

Since the actual `addEventListener` callback is `wrappedListener` which captures `listener` by reference (via closure), swapping the inner `listener` variable means the next event invocation will call the new function — **without any DOM API calls**. This is the key optimization for vdom integrations.

### 2.4 Listener formats

`EventListeners<target>` supports multiple formats per event type:

```ts
// Simple function
{ click(event, signal) { ... } }

// Descriptor with options
{ click: { capture: true, listener(event) { ... } } }

// Array of mixed
{ click: [
    (event) => { ... },
    { capture: true, listener(event) { ... } },
    { once: true, listener(event) { ... } },
  ]
}
```

Each entry is normalized into a `Descriptor<Listener>` with shape `{ listener, capture?, once?, passive?, signal? }`.

### 2.5 Type system

The type system is extensive and uses conditional types to map any `EventTarget` subclass to its correct event map:

- `HTMLElement` → `HTMLElementEventMap`
- `Window` → `WindowEventMap`
- `Document` → `DocumentEventMap`
- `TypedEventTarget<M>` → `M` (custom event maps)
- Falls back to `GlobalEventHandlersEventMap & Record<string, Event>`

The `Dispatched<event, target>` type overrides `currentTarget` to be the specific target type (not just `EventTarget`), giving precise types in handlers.

---

## 3. Built-in Interactions

Interactions are semantic, higher-level event types built on top of native events. They are defined with `defineInteraction(type, setupFn)`.

### 3.1 How `defineInteraction` works

```ts
let interactions = new Map<string, InteractionSetup>()

function defineInteraction(type, interaction) {
  interactions.set(type, interaction)  // registers in global map
  return type                          // returns the string key
}
```

The returned string is used as a computed property key in listener maps:

```ts
import { press } from '@remix-run/interaction/press'
on(button, {
  [press](event) { ... }  // press === "rmx:press"
})
```

When `createBinding` encounters the event type `"rmx:press"`, it finds it in the `interactions` map, runs the setup function (once per target), and the setup function uses `this.on(...)` to attach underlying native event listeners that dispatch synthetic events of type `"rmx:press"`.

### 3.2 The `Interaction` context (`this`)

Setup functions receive `this: Interaction` with:

- `this.target` — the EventTarget being bound
- `this.signal` — the container's AbortSignal (for cleanup)
- `this.raise` — error handler from parent container
- `this.on(target, listeners)` — creates a child container inheriting signal + error handler

This means interaction setup can listen on other targets (e.g., `target.ownerDocument`) and those listeners are automatically cleaned up when the parent container is disposed.

### 3.3 `press` interaction (`@remix-run/interaction/press`)

Defines 5 interaction types, all sharing the same `Press` setup function:

| Interaction | String Key | Description |
|---|---|---|
| `press` | `"rmx:press"` | Full press cycle (down + up) |
| `pressDown` | `"rmx:press-down"` | Press started |
| `pressUp` | `"rmx:press-up"` | Press released |
| `longPress` | `"rmx:long-press"` | Held for 500ms |
| `pressCancel` | `"rmx:press-cancel"` | Cancelled (pointer left, Escape key) |

**How `Press` works internally:**

1. Tracks `isPointerDown` and `isKeyboardDown` state.
2. On **pointerdown** (primary only): dispatches `pressDown`, starts 500ms long-press timer.
3. On **pointerup**: dispatches `pressUp` then `press` (unless suppressed by long press).
4. On **pointerleave**: clears long-press timer (but doesn't dispatch cancel — that comes from document-level pointerup).
5. On **keydown** (Enter/Space, non-repeat): dispatches `pressDown`, starts long-press timer.
6. On **keyup** (Enter/Space): dispatches `pressUp` then `press` (unless suppressed).
7. On **Escape** during active press: dispatches `pressCancel`, suppresses next up.
8. On **document pointerup** (pointer released outside target): dispatches `pressCancel`.

**Long press prevention:** When the 500ms timer fires, `longPress` is dispatched. If any handler calls `event.preventDefault()`, `suppressNextUp` is set, preventing the subsequent `press` and `pressUp` from firing.

**`PressEvent`** extends `Event` with `clientX`/`clientY`, `bubbles: true`, `cancelable: true`.

### 3.4 `keys` interactions (`@remix-run/interaction/keys`)

Provides 13 key-specific interactions: `escape`, `enter`, `space`, `backspace`, `del`, `arrowLeft`, `arrowRight`, `arrowUp`, `arrowDown`, `home`, `end`, `pageUp`, `pageDown`.

Each is created by `makeKeyInteraction(key)`:
- Listens for `keydown` on the target.
- If `event.key` matches, calls `event.preventDefault()` and dispatches a new `KeyboardEvent` with type `"keydown:{key}"`.
- Works on `HTMLElement`, `Document`, and `Window`.

### 3.5 `popover` interactions (`@remix-run/interaction/popover`)

- `popoverToggle` / `beforePopoverToggle`
- Reads `popovertarget` attribute from the target element, finds the referenced popover, and listens for `toggle`/`beforetoggle` on the popover. Dispatches synthetic `ToggleEvent` on the owner (trigger) element.
- Useful for reacting to native popover state changes from the trigger's perspective.

### 3.6 `form` interactions (`@remix-run/interaction/form`)

- `formReset` — dispatches on a form element when its parent form is reset.
- Finds the form via `target.form` or `target.closest('form')`.

---

## 4. How aria-ui uses `useInteraction` in practice

### Example: `PopoverTrigger`

```ts
useInteraction(host, {
  [press]() {
    const store = getStore()
    if (!store) return
    if (!getDisabled()) store.emitOpenChange(!store.getOpen())
  },
})
```

This:
1. Waits for the `PopoverTrigger` custom element to connect.
2. Calls `on(host, { [press]() { ... } })`.
3. `createBinding` sees `"rmx:press"` is a registered interaction.
4. The `Press` setup function runs once, attaching `pointerdown`, `pointerup`, `pointerleave`, `keydown`, `keyup` listeners on the host, plus `pointerup` on `document`.
5. When the user clicks or presses Enter/Space, the `Press` handler dispatches a synthetic `"rmx:press"` event on the host.
6. The user's listener fires, toggling the popover open state.
7. On disconnect, all listeners (both the user's `press` handler and the underlying native event listeners from the `Press` interaction) are cleaned up via the abort signal chain.

### Example: `useHover` (in `@aria-ui/utils`)

`useHover` uses `on()` directly (not `useInteraction`) because it's called inside a `useEffect` which already handles lifecycle:

```ts
const dispose = on(target, {
  mouseenter: handleMouseEnter,
  mouseleave: handleMouseLeave,
})
```

---

## 5. Lifecycle flow (end-to-end)

```
1. setupPopoverTrigger() is called during element construction
2. useInteraction(host, { [press]() {...} }) is called
3. onMount registers a ReactiveController on the host
4. Element is added to DOM → connectedCallback → hostConnected
5. on(host, listeners) is called:
   a. createContainer(host) creates an AbortController
   b. container.set(listeners) processes each event type:
      - For "rmx:press": createBinding sees it's an interaction
        - Press setup hasn't run for this target → runs Press()
        - Press attaches pointerdown/up/leave, keydown/up on host
        - Press attaches pointerup on document
        - ref count for Press on this target = 1
      - addEventListener("rmx:press", wrappedListener) on host
   c. Returns dispose function
6. User clicks button:
   a. Native pointerdown fires → Press dispatches PressEvent("rmx:press-down")
   b. Native pointerup fires → Press dispatches PressEvent("rmx:press-up")
      then PressEvent("rmx:press")
   c. wrappedListener catches "rmx:press" → calls user's listener
   d. Popover toggles
7. Element removed from DOM → disconnectedCallback → hostDisconnected
   a. onMount cleanup runs
   b. container.dispose() → AbortController.abort()
   c. All bindings clean up (removeEventListener, decrement ref counts)
   d. Press interaction's child container also disposes (signal chained)
```

---

## 6. Key design decisions and trade-offs

1. **Static listeners**: `useInteraction` captures listeners at mount time. If you need reactive listener logic (e.g., conditionally adding listeners based on signals), use `useEffect` + `on()` directly instead.

2. **One interaction setup per target**: Reference counting ensures `Press()` runs once even if you bind `[press]`, `[longPress]`, and `[pressDown]` on the same element. The underlying `pointerdown`/`keydown` etc. listeners are shared.

3. **No Shadow DOM**: aria-ui uses light DOM. Event delegation and bubbling work naturally. The `Press` interaction's document-level `pointerup` listener works because there's no shadow boundary.

4. **Abort-based cleanup**: The entire cleanup chain is built on `AbortSignal`. Container → child containers → individual bindings. This is elegant but means cleanup is one-shot (can't re-use a disposed container).

5. **Reentry protection**: The signal-per-invocation pattern solves a real problem with async event handlers (e.g., debouncing search input). But for aria-ui's current usage (synchronous press handlers), this feature is unused overhead — though negligible.

6. **`wrappedListener` closure trick**: By having `addEventListener` use a stable `wrappedListener` that delegates to a mutable `listener` variable, the library can swap listener implementations without touching the DOM. This is critical for React/vdom integrations but not leveraged by aria-ui (which uses static listeners).
