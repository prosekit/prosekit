# ProseKit Registry

The registry contains framework examples and shared UI components. Source files are organized in `registry/src`, with dedicated directories for each supported framework: `react`, `vue`, `svelte`, `solid`, and `preact`.

## Common Guidelines

### Same DOM Across Frameworks

All framework implementations of the same example must render identical DOM structures.

### No Props Destructuring

Avoid destructuring component props across all frameworks. Destructuring breaks reactivity in frameworks like Solid. Maintaining consistent syntax across frameworks also improves code maintainability.

**Correct:**

```tsx
function Foo(props: FooProps) {
  return <div>{props.foo}</div>;
}
```

**Incorrect:**

```tsx
function Foo({ foo }: FooProps) {
  return <div>{foo}</div>;
}
```

### Union Call Convention

The `union` function should be called with individual arguments, not an array.

**Correct:**

```ts
return union(
  defineBasicExtension(),
  defineCodeBlockView(),
)
```

**Incorrect:**

```ts
return union([
  defineBasicExtension(),
  defineCodeBlockView(),
])
```

### Default Content Location

To provide default content for an example, create a file at `registry/src/<framework>/sample/sample-doc-<example-name>.ts` and export the content using the following format:

```ts
import type { NodeJSON } from "prosekit/core";

export const defaultContent: NodeJSON = {
  /* ... */
};
```

## Vue-Specific Guidelines

### Event Handlers

Use `@event-name` syntax instead of `:on-event-name` for event handlers in Vue templates.

**Good:**

```
<Component @query-change="handleQueryChange" />
```

**Bad:**

```
<Component :on-query-change="handleQueryChange" />
```

### Side Effects with Cleanup

Prefer `watchEffect` over `watch` to track reactive dependencies automatically.

**Good:**

```ts
watchEffect((onCleanup) => {
  const value = valueRef.value;
  // do something with value
  onCleanup(() => {
    // cleanup logic
  });
});
```

**Bad:**

```ts
watch([valueRef], (newValue, oldValue, onCleanup) => {
  // do something with newValue
  onCleanup(() => {
    // cleanup logic
  });
});
```


## Svelte-Specific Guidelines

### Syntax

Use Svelte v5 runes syntax (`$state`, `$derived`, `$props`, `$effect`) instead of legacy syntax.

**Good:**

```svelte
<script lang="ts">
  interface Props {
    name: string;
  }
  const props: Props = $props();
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<div>{props.name} {doubled}</div>
```

**Bad:**

```svelte
<script lang="ts">
  export let name = 'World';
  let count = 0;
  $: doubled = count * 2;
</script>

<div>{name} {doubled}</div>
```
