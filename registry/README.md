# ProseKit Registry

The registry contains framework examples and shared UI components. Source files are organized in `registry/src`, with dedicated directories for each supported framework: `react`, `vue`, `svelte`, `solid`, and `preact`.

## Implementation Guidelines

### Same DOM Across Frameworks

All framework implementations of the same example must render identical DOM structures.

### No Props Destructuring

Avoid destructuring component props across all frameworks. Destructuring breaks reactivity in frameworks like Solid. Maintaining consistent syntax across frameworks also improves code maintainability.

**Correct:**

```tsx
function Foo(props: FooProps) {
  return <div>{props.foo}</div>
}
```

**Incorrect:**

```tsx
function Foo({ foo }: FooProps) {
  return <div>{foo}</div>
}
```

### Default Content Location

To provide default content for an example, create a file at `registry/src/<framework>/sample/sample-doc-<example-name>.ts` and export the content as `defaultContent`.
