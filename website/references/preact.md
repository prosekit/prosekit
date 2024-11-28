# prosekit/preact

## ProseKitProps {#prose-kit-props}

<dl>

<dt>

`children`

</dt>

<dd>

**Type**: `ComponentChildren`

</dd>

<dt>

`editor`

</dt>

<dd>

**Type**: `Editor<any>`

</dd>

</dl>

## UseExtensionOptions {#use-extension-options}

<dl>

<dt>

`editor`

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

**Type**: `Editor<any>`

</dd>

<dt>

`priority`

</dt>

<dd>

Optional priority to add the extension with.

**Type**: `Priority`

</dd>

</dl>

## ProseKit {#prose-kit}

The root component for a ProseKit editor.

**Type**: `ComponentType<ProseKitProps>`

## useDocChange {#use-doc-change}

```ts
function useDocChange(handler: (doc: Node) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor document changes.

## useEditor {#use-editor}

```ts
function useEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options?: { update?: boolean }): Editor<E>
```

Retrieves the editor instance from the nearest ProseKit component.

## useExtension {#use-extension}

```ts
function useExtension(extension: null | Extension<ExtensionTyping<any, any, any>>, options?: UseExtensionOptions): void
```

Add an extension to the editor.

## useKeymap {#use-keymap}

```ts
function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void
```

## useStateUpdate {#use-state-update}

```ts
function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void
```

Calls the given handler whenever the editor state changes.
