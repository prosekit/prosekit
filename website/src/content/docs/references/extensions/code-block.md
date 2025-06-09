---
title: prosekit/extensions/code-block
sidebar:
  label: extensions/code-block
---


## CodeBlockAttrs {#code-block-attrs}

The attributes for the `codeBlock` node.

<dl>

<dt>

`language: string`

</dt>

<dd>

</dd>

</dl>

## ShikiBundledLanguageInfo {#shiki-bundled-language-info}

<dl>

<dt>

`aliases?: string[]`

</dt>

<dd>

</dd>

<dt>

`id: string`

</dt>

<dd>

</dd>

<dt>

`import: DynamicImportLanguageRegistration`

</dt>

<dd>

</dd>

<dt>

`name: string`

</dt>

<dd>

</dd>

</dl>

## ShikiBundledThemeInfo {#shiki-bundled-theme-info}

<dl>

<dt>

`displayName: string`

</dt>

<dd>

</dd>

<dt>

`id: string`

</dt>

<dd>

</dd>

<dt>

`import: DynamicImportThemeRegistration`

</dt>

<dd>

</dd>

<dt>

`type: "light" | "dark"`

</dt>

<dd>

</dd>

</dl>

## CodeBlockHighlightOptions {#code-block-highlight-options}

**Type**: `{ parser: HighlightParser }`

## HighlightParser {#highlight-parser}

An alias for the `Parser` type from the `prosemirror-highlight` package.

**Type**: `Parser`

## ShikiBundledLanguage {#shiki-bundled-language}

**Type**: `"1c" | "1c-query" | "abap" | "actionscript-3" | "ada" | "adoc" | "angular-html" | "angular-ts" | "apache" | "apex" | "apl" | "applescript" | "ara" | "asciidoc" | "asm" | "astro" | "awk" | "ballerina" | "bash" | "bat" | "batch" | "be" | "beancount" | "berry" | "bibtex" | "bicep" | "blade" | "bsl" | "c" | "c#" | "c++" | "cadence" | "cairo" | "cdc" | "clarity" | "clj" | "clojure" | "closure-templates" | "cmake" | "cmd" | "cobol" | "codeowners" | "codeql" | "coffee" | "coffeescript" | "common-lisp" | "console" | "coq" | "cpp" | "cql" | "crystal" | "cs" | "csharp" | "css" | "csv" | "cue" | "cypher" | "d" | "dart" | "dax" | "desktop" | "diff" | "docker" | "dockerfile" | "dotenv" | "dream-maker" | "edge" | "elisp" | "elixir" | "elm" | "emacs-lisp" | "erb" | "erl" | "erlang" | "f" | "f#" | "f03" | "f08" | "f18" | "f77" | "f90" | "f95" | "fennel" | "fish" | "fluent" | "for" | "fortran-fixed-form" | "fortran-free-form" | "fs" | "fsharp" | "fsl" | "ftl" | "gdresource" | "gdscript" | "gdshader" | "genie" | "gherkin" | "git-commit" | "git-rebase" | "gjs" | "gleam" | "glimmer-js" | "glimmer-ts" | "glsl" | "gnuplot" | "go" | "gql" | "graphql" | "groovy" | "gts" | "hack" | "haml" | "handlebars" | "haskell" | "haxe" | "hbs" | "hcl" | "hjson" | "hlsl" | "hs" | "html" | "html-derivative" | "http" | "hxml" | "hy" | "imba" | "ini" | "jade" | "java" | "javascript" | "jinja" | "jison" | "jl" | "js" | "json" | "json5" | "jsonc" | "jsonl" | "jsonnet" | "jssm" | "jsx" | "julia" | "kotlin" | "kql" | "kt" | "kts" | "kusto" | "latex" | "lean" | "lean4" | "less" | "liquid" | "lisp" | "lit" | "llvm" | "log" | "logo" | "lua" | "luau" | "make" | "makefile" | "markdown" | "marko" | "matlab" | "md" | "mdc" | "mdx" | "mediawiki" | "mermaid" | "mips" | "mipsasm" | "mmd" | "mojo" | "move" | "nar" | "narrat" | "nextflow" | "nf" | "nginx" | "nim" | "nix" | "nu" | "nushell" | "objc" | "objective-c" | "objective-cpp" | "ocaml" | "pascal" | "perl" | "perl6" | "php" | "plsql" | "po" | "polar" | "postcss" | "pot" | "potx" | "powerquery" | "powershell" | "prisma" | "prolog" | "properties" | "proto" | "protobuf" | "ps" | "ps1" | "pug" | "puppet" | "purescript" | "py" | "python" | "ql" | "qml" | "qmldir" | "qss" | "r" | "racket" | "raku" | "razor" | "rb" | "reg" | "regex" | "regexp" | "rel" | "riscv" | "rs" | "rst" | "ruby" | "rust" | "sas" | "sass" | "scala" | "scheme" | "scss" | "sdbl" | "sh" | "shader" | "shaderlab" | "shell" | "shellscript" | "shellsession" | "smalltalk" | "solidity" | "soy" | "sparql" | "spl" | "splunk" | "sql" | "ssh-config" | "stata" | "styl" | "stylus" | "svelte" | "swift" | "system-verilog" | "systemd" | "talon" | "talonscript" | "tasl" | "tcl" | "templ" | "terraform" | "tex" | "tf" | "tfvars" | "toml" | "ts" | "ts-tags" | "tsp" | "tsv" | "tsx" | "turtle" | "twig" | "typ" | "typescript" | "typespec" | "typst" | "v" | "vala" | "vb" | "verilog" | "vhdl" | "vim" | "viml" | "vimscript" | "vue" | "vue-html" | "vy" | "vyper" | "wasm" | "wenyan" | "wgsl" | "wiki" | "wikitext" | "wit" | "wl" | "wolfram" | "xml" | "xsl" | "yaml" | "yml" | "zenscript" | "zig" | "zsh" | "文言"`

## ShikiBundledTheme {#shiki-bundled-theme}

**Type**: `"andromeeda" | "aurora-x" | "ayu-dark" | "catppuccin-frappe" | "catppuccin-latte" | "catppuccin-macchiato" | "catppuccin-mocha" | "dark-plus" | "dracula" | "dracula-soft" | "everforest-dark" | "everforest-light" | "github-dark" | "github-dark-default" | "github-dark-dimmed" | "github-dark-high-contrast" | "github-light" | "github-light-default" | "github-light-high-contrast" | "gruvbox-dark-hard" | "gruvbox-dark-medium" | "gruvbox-dark-soft" | "gruvbox-light-hard" | "gruvbox-light-medium" | "gruvbox-light-soft" | "houston" | "kanagawa-dragon" | "kanagawa-lotus" | "kanagawa-wave" | "laserwave" | "light-plus" | "material-theme" | "material-theme-darker" | "material-theme-lighter" | "material-theme-ocean" | "material-theme-palenight" | "min-dark" | "min-light" | "monokai" | "night-owl" | "nord" | "one-dark-pro" | "one-light" | "plastic" | "poimandres" | "red" | "rose-pine" | "rose-pine-dawn" | "rose-pine-moon" | "slack-dark" | "slack-ochin" | "snazzy-light" | "solarized-dark" | "solarized-light" | "synthwave-84" | "tokyo-night" | "vesper" | "vitesse-black" | "vitesse-dark" | "vitesse-light"`

## shikiBundledLanguagesInfo {#shiki-bundled-languages-info}

**Type**: `ShikiBundledLanguageInfo[]`

## shikiBundledThemesInfo {#shiki-bundled-themes-info}

**Type**: `ShikiBundledThemeInfo[]`

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

It will set two CSS variables on the code block elements:

* `--prosemirror-highlight`: sets text color
* `--prosemirror-highlight-bg`: sets background color

## defineCodeBlockSpec {#define-code-block-spec}

```ts
function defineCodeBlockSpec(): CodeBlockSpecExtension
```

Defines the `codeBlock` node spec.
