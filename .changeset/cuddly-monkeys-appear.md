---
'prosekit': minor
'@prosekit/preact': minor
'@prosekit/svelte': minor
'@prosekit/react': minor
'@prosekit/solid': minor
'@prosekit/lit': minor
'@prosekit/vue': minor
'@prosekit/web': minor
---

This version introduces significant changes to the event handling mechanism for components:

- Implementation Changes: Events are no longer handled by passing them to callback functions. Instead, the underlying custom elements now use `dispatchEvent()` to propagate events upwards, similar to native HTML elements. This approach allows for more native-like event handling, reducing code complexity.
- Impact on UI Framework Integrations (React, Vue, Preact, Svelte, Solid): Except for the following change, the API remains largely unchanged.

Event handlers for component `ResizableRoot` has changed:

- Removed: `onSizeChangeStart`, `onSizeChange`, `onSizeChangeEnd`
- Replaced with: `onResizeStart`, `onResizeEnd`.

```tsx
// Previous code example
<ResizableRoot
  onSizeChangeEnd={(size) => { console.log(size.width, size.height) }}
/>

// Updated code example
<ResizableRoot
  onSizeChangeEnd={(event) => { console.log(event.size.width, event.size.height) }}
/>
```
