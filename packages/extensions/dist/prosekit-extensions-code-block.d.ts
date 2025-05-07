import { ShikiHighlighterOptions } from "./shiki-highlighter-chunk-Cd3WeOKL.js";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Parser } from "prosemirror-highlight";
import { BundledLanguage as ShikiBundledLanguage, BundledLanguageInfo as ShikiBundledLanguageInfo, BundledTheme as ShikiBundledTheme, BundledThemeInfo as ShikiBundledThemeInfo, SpecialLanguage, bundledLanguagesInfo as shikiBundledLanguagesInfo, bundledThemesInfo as shikiBundledThemesInfo } from "shiki";

//#region src/code-block/code-block-types.d.ts
/**
* The attributes for the `codeBlock` node.
*
* @public
*/
/**
* The attributes for the `codeBlock` node.
*
* @public
*/
interface CodeBlockAttrs {
  language: string;
}

//#endregion
//#region src/code-block/code-block-commands.d.ts
/**
* @internal
*/
type CodeBlockCommandsExtension = Extension<{
  Commands: {
    setCodeBlock: [attrs?: CodeBlockAttrs];
    insertCodeBlock: [attrs?: CodeBlockAttrs];
    toggleCodeBlock: [attrs?: CodeBlockAttrs];
    setCodeBlockAttrs: [attrs: CodeBlockAttrs];
  };
}>;
/**
* Adds commands for working with `codeBlock` nodes.
*
* @public
*/
declare function defineCodeBlockCommands(): CodeBlockCommandsExtension;

//#endregion
//#region src/code-block/code-block-spec.d.ts
/**
* @internal
*/
type CodeBlockSpecExtension = Extension<{
  Nodes: {
    codeBlock: CodeBlockAttrs;
  };
}>;
/**
* Defines the `codeBlock` node spec.
*
* @public
*/
declare function defineCodeBlockSpec(): CodeBlockSpecExtension;

//#endregion
//#region src/code-block/code-block.d.ts
/**
* @internal
*/
type CodeBlockExtension = Union<[CodeBlockSpecExtension, CodeBlockCommandsExtension]>;
/**
* Adds `codeBlock` nodes to the editor. This includes the following extensions:
*
* - {@link defineCodeBlockSpec}
* - {@link defineCodeBlockInputRule}
* - {@link defineCodeBlockEnterRule}
* - {@link defineCodeBlockKeymap}
* - {@link defineCodeBlockCommands}.
*
* @public
*/
declare function defineCodeBlock(): CodeBlockExtension;

//#endregion
//#region src/code-block/code-block-highlight.d.ts
/**
* @public
*
* An alias for the `Parser` type from the `prosemirror-highlight` package.
*/
type HighlightParser = Parser;
/**
* @public
*/
type CodeBlockHighlightOptions = {
  parser: HighlightParser;
};
/**
* Adds syntax highlighting to code blocks. This function requires a `Parser`
* instance from the `prosemirror-highlight` package. See the
* [documentation](https://github.com/ocavue/prosemirror-highlight) for more
* information.
*
* @param options
*
* @public
*/
declare function defineCodeBlockHighlight({
  parser
}: CodeBlockHighlightOptions): Extension;

//#endregion
//#region src/code-block/code-block-input-rule.d.ts
/**
* Adds input rules for `codeBlock` nodes.
*
* @public
*/
declare function defineCodeBlockInputRule(): PlainExtension;
/**
* Adds enter rules for `codeBlock` nodes.
*
* @public
*/
declare function defineCodeBlockEnterRule(): PlainExtension;

//#endregion
//#region src/code-block/code-block-keymap.d.ts
/**
* Defines the keymap for code blocks.
*/
declare function defineCodeBlockKeymap(): PlainExtension;

//#endregion
//#region src/code-block/code-block-shiki.d.ts
/**
* The options to configure the Shiki highlighter.
*
* @public
*/
interface CodeBlockShikiOptions extends Omit<ShikiHighlighterOptions, "themes" | "langs" | "engine"> {
  /**
  * A list of Shiki themes to pre-load. The first theme in the list will be
  * used to render the code block.
  *
  * @default ['one-dark-pro']
  */
  themes?: ShikiBundledTheme[];
  /**
  * A list of Shiki languages to pre-load.
  *
  * @default ['text']
  */
  langs?: (ShikiBundledLanguage | SpecialLanguage)[];
  /**
  * The RegExp engine to use. By default, the JavaScript engine is used.
  */
  engine?: ShikiHighlighterOptions["engine"];
}
/**
* Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.
*
* It will set two CSS variables on the code block elements:
*
* - `--prosemirror-highlight`: sets text color
* - `--prosemirror-highlight-bg`: sets background color
*
* @param options - The options to configure the Shiki highlighter.
*
* @public
*/
declare function defineCodeBlockShiki({
  themes,
  langs,
  ...rest
}?: CodeBlockShikiOptions): Extension;

//#endregion
export { CodeBlockAttrs, CodeBlockCommandsExtension, CodeBlockExtension, CodeBlockHighlightOptions, CodeBlockSpecExtension, HighlightParser, ShikiBundledLanguage, ShikiBundledLanguageInfo, ShikiBundledTheme, ShikiBundledThemeInfo, defineCodeBlock, defineCodeBlockCommands, defineCodeBlockEnterRule, defineCodeBlockHighlight, defineCodeBlockInputRule, defineCodeBlockKeymap, defineCodeBlockShiki, defineCodeBlockSpec, shikiBundledLanguagesInfo, shikiBundledThemesInfo };