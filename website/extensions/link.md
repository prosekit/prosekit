# Link

The `link` mark is used to represent links. It will be rendered as `<a>` element in HTML.

<!-- @include: @/examples/link.md -->

## Commands

### `addLink`

```ts
editor.commands.addLink({ href: 'https://www.example.com' })
```

### `removeLink`

```ts
editor.commands.removeLink()
```

### `toggleLink`

```ts
editor.commands.toggleLink({ href: 'https://www.example.com' })
```
