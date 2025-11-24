---
title: prosekit/extensions/code-block
sidebar:
  label: extensions/code-block
---

## Interfaces

### CodeBlockAttrs {#codeblockattrs}

The attributes for the `codeBlock` node.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="language" href="#language">language</a>: `string`</code>

</dt>

</dl>

***

### ShikiBundledLanguageInfo {#shikibundledlanguageinfo}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="id" href="#id">id</a>: `string`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="name" href="#name">name</a>: `string`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="import" href="#import">import</a>: `DynamicImportLanguageRegistration`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="aliases" href="#aliases">aliases</a><i>?</i>: `string`[]</code>

</dt>

</dl>

***

### ShikiBundledThemeInfo {#shikibundledthemeinfo}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="id-1" href="#id-1">id</a>: `string`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="displayname" href="#displayname">displayName</a>: `string`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="type" href="#type">type</a>: `"light"` \| `"dark"`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="import-1" href="#import-1">import</a>: `DynamicImportThemeRegistration`</code>

</dt>

</dl>

## Type Aliases

### HighlightParser {#highlightparser}

<dl>

<dt>

<code data-typedoc-code>type <a id="highlightparser" href="#highlightparser">HighlightParser</a> = `Parser`</code>

</dt>

<dd>

An alias for the `Parser` type from the `prosemirror-highlight` package.

</dd>

</dl>

***

### CodeBlockHighlightOptions {#codeblockhighlightoptions}

<code data-typedoc-code>type <a id="codeblockhighlightoptions" href="#codeblockhighlightoptions">CodeBlockHighlightOptions</a> = \{ `parser`: [`HighlightParser`](#highlightparser); \}</code>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="parser" href="#parser">parser</a>: [`HighlightParser`](#highlightparser)</code>

</dt>

</dl>

***

### ShikiBundledLanguage {#shikibundledlanguage}

<dl>

<dt>

<code data-typedoc-code>type <a id="shikibundledlanguage" href="#shikibundledlanguage">ShikiBundledLanguage</a> = `"1c"` \| `"1c-query"` \| `"abap"` \| `"actionscript-3"` \| `"ada"` \| `"adoc"` \| `"angular-html"` \| `"angular-ts"` \| `"apache"` \| `"apex"` \| `"apl"` \| `"applescript"` \| `"ara"` \| `"asciidoc"` \| `"asm"` \| `"astro"` \| `"awk"` \| `"ballerina"` \| `"bash"` \| `"bat"` \| `"batch"` \| `"be"` \| `"beancount"` \| `"berry"` \| `"bibtex"` \| `"bicep"` \| `"blade"` \| `"bsl"` \| `"c"` \| `"c#"` \| `"c++"` \| `"cadence"` \| `"cairo"` \| `"cdc"` \| `"cjs"` \| `"clarity"` \| `"clj"` \| `"clojure"` \| `"closure-templates"` \| `"cmake"` \| `"cmd"` \| `"cobol"` \| `"codeowners"` \| `"codeql"` \| `"coffee"` \| `"coffeescript"` \| `"common-lisp"` \| `"console"` \| `"coq"` \| `"cpp"` \| `"cql"` \| `"crystal"` \| `"cs"` \| `"csharp"` \| `"css"` \| `"csv"` \| `"cts"` \| `"cue"` \| `"cypher"` \| `"d"` \| `"dart"` \| `"dax"` \| `"desktop"` \| `"diff"` \| `"docker"` \| `"dockerfile"` \| `"dotenv"` \| `"dream-maker"` \| `"edge"` \| `"elisp"` \| `"elixir"` \| `"elm"` \| `"emacs-lisp"` \| `"erb"` \| `"erl"` \| `"erlang"` \| `"f"` \| `"f#"` \| `"f03"` \| `"f08"` \| `"f18"` \| `"f77"` \| `"f90"` \| `"f95"` \| `"fennel"` \| `"fish"` \| `"fluent"` \| `"for"` \| `"fortran-fixed-form"` \| `"fortran-free-form"` \| `"fs"` \| `"fsharp"` \| `"fsl"` \| `"ftl"` \| `"gdresource"` \| `"gdscript"` \| `"gdshader"` \| `"genie"` \| `"gherkin"` \| `"git-commit"` \| `"git-rebase"` \| `"gjs"` \| `"gleam"` \| `"glimmer-js"` \| `"glimmer-ts"` \| `"glsl"` \| `"gnuplot"` \| `"go"` \| `"gql"` \| `"graphql"` \| `"groovy"` \| `"gts"` \| `"hack"` \| `"haml"` \| `"handlebars"` \| `"haskell"` \| `"haxe"` \| `"hbs"` \| `"hcl"` \| `"hjson"` \| `"hlsl"` \| `"hs"` \| `"html"` \| `"html-derivative"` \| `"http"` \| `"hurl"` \| `"hxml"` \| `"hy"` \| `"imba"` \| `"ini"` \| `"jade"` \| `"java"` \| `"javascript"` \| `"jinja"` \| `"jison"` \| `"jl"` \| `"js"` \| `"json"` \| `"json5"` \| `"jsonc"` \| `"jsonl"` \| `"jsonnet"` \| `"jssm"` \| `"jsx"` \| `"julia"` \| `"kdl"` \| `"kotlin"` \| `"kql"` \| `"kt"` \| `"kts"` \| `"kusto"` \| `"latex"` \| `"lean"` \| `"lean4"` \| `"less"` \| `"liquid"` \| `"lisp"` \| `"lit"` \| `"llvm"` \| `"log"` \| `"logo"` \| `"lua"` \| `"luau"` \| `"make"` \| `"makefile"` \| `"markdown"` \| `"marko"` \| `"matlab"` \| `"md"` \| `"mdc"` \| `"mdx"` \| `"mediawiki"` \| `"mermaid"` \| `"mips"` \| `"mipsasm"` \| `"mjs"` \| `"mmd"` \| `"mojo"` \| `"move"` \| `"mts"` \| `"nar"` \| `"narrat"` \| `"nextflow"` \| `"nf"` \| `"nginx"` \| `"nim"` \| `"nix"` \| `"nu"` \| `"nushell"` \| `"objc"` \| `"objective-c"` \| `"objective-cpp"` \| `"ocaml"` \| `"pascal"` \| `"perl"` \| `"perl6"` \| `"php"` \| `"pkl"` \| `"plsql"` \| `"po"` \| `"polar"` \| `"postcss"` \| `"pot"` \| `"potx"` \| `"powerquery"` \| `"powershell"` \| `"prisma"` \| `"prolog"` \| `"properties"` \| `"proto"` \| `"protobuf"` \| `"ps"` \| `"ps1"` \| `"pug"` \| `"puppet"` \| `"purescript"` \| `"py"` \| `"python"` \| `"ql"` \| `"qml"` \| `"qmldir"` \| `"qss"` \| `"r"` \| `"racket"` \| `"raku"` \| `"razor"` \| `"rb"` \| `"reg"` \| `"regex"` \| `"regexp"` \| `"rel"` \| `"riscv"` \| `"rosmsg"` \| `"rs"` \| `"rst"` \| `"ruby"` \| `"rust"` \| `"sas"` \| `"sass"` \| `"scala"` \| `"scheme"` \| `"scss"` \| `"sdbl"` \| `"sh"` \| `"shader"` \| `"shaderlab"` \| `"shell"` \| `"shellscript"` \| `"shellsession"` \| `"smalltalk"` \| `"solidity"` \| `"soy"` \| `"sparql"` \| `"spl"` \| `"splunk"` \| `"sql"` \| `"ssh-config"` \| `"stata"` \| `"styl"` \| `"stylus"` \| `"svelte"` \| `"swift"` \| `"system-verilog"` \| `"systemd"` \| `"talon"` \| `"talonscript"` \| `"tasl"` \| `"tcl"` \| `"templ"` \| `"terraform"` \| `"tex"` \| `"tf"` \| `"tfvars"` \| `"toml"` \| `"ts"` \| `"ts-tags"` \| `"tsp"` \| `"tsv"` \| `"tsx"` \| `"turtle"` \| `"twig"` \| `"typ"` \| `"typescript"` \| `"typespec"` \| `"typst"` \| `"v"` \| `"vala"` \| `"vb"` \| `"verilog"` \| `"vhdl"` \| `"vim"` \| `"viml"` \| `"vimscript"` \| `"vue"` \| `"vue-html"` \| `"vue-vine"` \| `"vy"` \| `"vyper"` \| `"wasm"` \| `"wenyan"` \| `"wgsl"` \| `"wiki"` \| `"wikitext"` \| `"wit"` \| `"wl"` \| `"wolfram"` \| `"xml"` \| `"xsl"` \| `"yaml"` \| `"yml"` \| `"zenscript"` \| `"zig"` \| `"zsh"` \| `"文言"`</code>

</dt>

</dl>

***

### ShikiBundledTheme {#shikibundledtheme}

<dl>

<dt>

<code data-typedoc-code>type <a id="shikibundledtheme" href="#shikibundledtheme">ShikiBundledTheme</a> = `"andromeeda"` \| `"aurora-x"` \| `"ayu-dark"` \| `"catppuccin-frappe"` \| `"catppuccin-latte"` \| `"catppuccin-macchiato"` \| `"catppuccin-mocha"` \| `"dark-plus"` \| `"dracula"` \| `"dracula-soft"` \| `"everforest-dark"` \| `"everforest-light"` \| `"github-dark"` \| `"github-dark-default"` \| `"github-dark-dimmed"` \| `"github-dark-high-contrast"` \| `"github-light"` \| `"github-light-default"` \| `"github-light-high-contrast"` \| `"gruvbox-dark-hard"` \| `"gruvbox-dark-medium"` \| `"gruvbox-dark-soft"` \| `"gruvbox-light-hard"` \| `"gruvbox-light-medium"` \| `"gruvbox-light-soft"` \| `"houston"` \| `"kanagawa-dragon"` \| `"kanagawa-lotus"` \| `"kanagawa-wave"` \| `"laserwave"` \| `"light-plus"` \| `"material-theme"` \| `"material-theme-darker"` \| `"material-theme-lighter"` \| `"material-theme-ocean"` \| `"material-theme-palenight"` \| `"min-dark"` \| `"min-light"` \| `"monokai"` \| `"night-owl"` \| `"nord"` \| `"one-dark-pro"` \| `"one-light"` \| `"plastic"` \| `"poimandres"` \| `"red"` \| `"rose-pine"` \| `"rose-pine-dawn"` \| `"rose-pine-moon"` \| `"slack-dark"` \| `"slack-ochin"` \| `"snazzy-light"` \| `"solarized-dark"` \| `"solarized-light"` \| `"synthwave-84"` \| `"tokyo-night"` \| `"vesper"` \| `"vitesse-black"` \| `"vitesse-dark"` \| `"vitesse-light"`</code>

</dt>

</dl>

## Variables

### shikiBundledLanguagesInfo {#shikibundledlanguagesinfo}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="shikibundledlanguagesinfo" href="#shikibundledlanguagesinfo">shikiBundledLanguagesInfo</a>: [`ShikiBundledLanguageInfo`](#shikibundledlanguageinfo)[]</code>

</dt>

</dl>

***

### shikiBundledThemesInfo {#shikibundledthemesinfo}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="shikibundledthemesinfo" href="#shikibundledthemesinfo">shikiBundledThemesInfo</a>: [`ShikiBundledThemeInfo`](#shikibundledthemeinfo)[]</code>

</dt>

</dl>

## Functions

### defineCodeBlockCommands() {#definecodeblockcommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockcommands" href="#definecodeblockcommands">defineCodeBlockCommands</a>(): `CodeBlockCommandsExtension`</code>

</dt>

<dd>

Adds commands for working with `codeBlock` nodes.

</dd>

</dl>

***

### defineCodeBlockHighlight() {#definecodeblockhighlight}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockhighlight" href="#definecodeblockhighlight">defineCodeBlockHighlight</a>(`options`: [`CodeBlockHighlightOptions`](#codeblockhighlightoptions)): [`Extension`](../core.md#extension-1)</code>

</dt>

<dd>

Adds syntax highlighting to code blocks. This function requires a `Parser`
instance from the `prosemirror-highlight` package. See the
[documentation](https://github.com/ocavue/prosemirror-highlight) for more
information.

</dd>

</dl>

***

### defineCodeBlockInputRule() {#definecodeblockinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockinputrule" href="#definecodeblockinputrule">defineCodeBlockInputRule</a>(): `PlainExtension`</code>

</dt>

<dd>

Adds input rules for `codeBlock` nodes.

</dd>

</dl>

***

### defineCodeBlockEnterRule() {#definecodeblockenterrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockenterrule" href="#definecodeblockenterrule">defineCodeBlockEnterRule</a>(): `PlainExtension`</code>

</dt>

<dd>

Adds enter rules for `codeBlock` nodes.

</dd>

</dl>

***

### defineCodeBlockKeymap() {#definecodeblockkeymap}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockkeymap" href="#definecodeblockkeymap">defineCodeBlockKeymap</a>(): `PlainExtension`</code>

</dt>

<dd>

Defines the keymap for code blocks.

</dd>

</dl>

***

### defineCodeBlockShiki() {#definecodeblockshiki}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockshiki" href="#definecodeblockshiki">defineCodeBlockShiki</a>(`options`: `CodeBlockShikiOptions`): [`Extension`](../core.md#extension-1)</code>

</dt>

<dd>

Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.

It will set two CSS variables on the code block elements:

- `--prosemirror-highlight`: sets text color
- `--prosemirror-highlight-bg`: sets background color

</dd>

</dl>

***

### defineCodeBlockSpec() {#definecodeblockspec}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblockspec" href="#definecodeblockspec">defineCodeBlockSpec</a>(): `CodeBlockSpecExtension`</code>

</dt>

<dd>

Defines the `codeBlock` node spec.

</dd>

</dl>

***

### defineCodeBlock() {#definecodeblock}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecodeblock" href="#definecodeblock">defineCodeBlock</a>(): `CodeBlockExtension`</code>

</dt>

<dd>

Adds `codeBlock` nodes to the editor. This includes the following extensions:

- [defineCodeBlockSpec](#definecodeblockspec)
- [defineCodeBlockInputRule](#definecodeblockinputrule)
- [defineCodeBlockEnterRule](#definecodeblockenterrule)
- [defineCodeBlockKeymap](#definecodeblockkeymap)
- [defineCodeBlockCommands](#definecodeblockcommands).

</dd>

</dl>
