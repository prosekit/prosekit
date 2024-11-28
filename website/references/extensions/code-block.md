# prosekit/extensions/code-block

## CodeBlockAttrs {#code-block-attrs}

The attributes for the `codeBlock` node.

<dl>

<dt>

`language`

</dt>

<dd>

**Type**: `string`

</dd>

</dl>

## CodeBlockHighlightOptions {#code-block-highlight-options}

**Type**: `{ parser: HighlightParser }`

## HighlightParser {#highlight-parser}

An alias for the `Parser` type from the `prosemirror-highlight` package.

**Type**: `Parser`

## defineCodeBlock {#define-code-block}

```ts
function defineCodeBlock(): CodeBlockExtension
```

Adds `codeBlock` nodes to the editor. This includes the following extensions:

* [defineCodeBlockSpec](code-block.md#define-code-block-spec)
* [defineCodeBlockInputRule](code-block.md#define-code-block-input-rule)
* [defineCodeBlockEnterRule](code-block.md#define-code-block-enter-rule)
* [defineCodeBlockKeymap](code-block.md#define-code-block-keymap)
* [defineCodeBlockCommands](code-block.md#define-code-block-commands).

## defineCodeBlockCommands {#define-code-block-commands}

```ts
function defineCodeBlockCommands(): CodeBlockCommandsExtension
```

Adds commands for working with `codeBlock` nodes.

## defineCodeBlockEnterRule {#define-code-block-enter-rule}

```ts
function defineCodeBlockEnterRule(): PlainExtension
```

Adds enter rules for `codeBlock` nodes.

## defineCodeBlockHighlight {#define-code-block-highlight}

```ts
function defineCodeBlockHighlight(options: CodeBlockHighlightOptions): Extension
```

Adds syntax highlighting to code blocks. This function requires a `Parser`
instance from the `prosemirror-highlight` package. See the
[documentation](https://github.com/ocavue/prosemirror-highlight) for more
information.

## defineCodeBlockInputRule {#define-code-block-input-rule}

```ts
function defineCodeBlockInputRule(): PlainExtension
```

Adds input rules for `codeBlock` nodes.

## defineCodeBlockKeymap {#define-code-block-keymap}

```ts
function defineCodeBlockKeymap(): PlainExtension
```

Defines the keymap for code blocks.

## defineCodeBlockShiki {#define-code-block-shiki}

```ts
function defineCodeBlockShiki(options?: CodeBlockShikiOptions): Extension
```

Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.

## defineCodeBlockSpec {#define-code-block-spec}

```ts
function defineCodeBlockSpec(): CodeBlockSpecExtension
```

Defines the `codeBlock` node spec.
