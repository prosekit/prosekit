import { PluginKey } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Decoration, DecorationSet } from "@prosekit/pm/view";
import { Parser } from "prosemirror-highlight";
import { BundledHighlighterOptions, BundledLanguage, BundledLanguage as ShikiBundledLanguage, BundledLanguageInfo as ShikiBundledLanguageInfo, BundledTheme, BundledTheme as ShikiBundledTheme, BundledThemeInfo as ShikiBundledThemeInfo, SpecialLanguage, bundledLanguagesInfo as shikiBundledLanguagesInfo, bundledThemesInfo as shikiBundledThemesInfo } from "shiki";
/**
 * The attributes for the `codeBlock` node.
 */
interface CodeBlockAttrs {
  language: string;
}
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
 */
declare function defineCodeBlockCommands(): CodeBlockCommandsExtension;
/**
 * An alias for the `Parser` type from the `prosemirror-highlight` package.
 */
type HighlightParser = Parser;
type CodeBlockHighlightOptions = {
  /**
   * A parser instance from the `prosemirror-highlight` package.
   */
  parser: HighlightParser;
  /**
   * ProseMirror node types to highlight.
   *
   * @default ['codeBlock', 'mathBlock']
   */
  nodeTypes?: string[];
};
/**
 * Adds syntax highlighting to code blocks. This function requires a `Parser`
 * instance from the `prosemirror-highlight` package. See the
 * [documentation](https://github.com/ocavue/prosemirror-highlight) for more
 * information.
 *
 * @param options
 */
declare function defineCodeBlockHighlight({ parser, nodeTypes }: CodeBlockHighlightOptions): Extension;
/**
 * Adds input rules for `codeBlock` nodes.
 */
declare function defineCodeBlockInputRule(): PlainExtension;
/**
 * Adds enter rules for `codeBlock` nodes.
 */
declare function defineCodeBlockEnterRule(): PlainExtension;
/**
 * Defines the keymap for code blocks.
 */
declare function defineCodeBlockKeymap(): PlainExtension;
/**
 * Defines a plugin that adds a decoration to hide the code block preview when the cursor is inside a code block. Use {@link isCodeBlockPreviewHiddenDecoration} to check whether a given decoration hides the code block preview.
 */
declare function defineCodeBlockPreviewPlugin(): PlainExtension;
/**
 * Returns whether the given decoration hides the code block preview (i.e.
 * the cursor is inside the code block it decorates).
 */
declare function isCodeBlockPreviewHiddenDecoration(decoration: Decoration): boolean;
interface ShikiHighlighterOptions extends BundledHighlighterOptions<BundledLanguage, BundledTheme> {}
/**
 * The options to configure the Shiki highlighter.
 */
interface CodeBlockShikiOptions extends Omit<ShikiHighlighterOptions, 'themes' | 'langs' | 'engine'> {
  /**
   * ProseMirror node types to highlight.
   *
   * @default ['codeBlock', 'mathBlock']
   */
  nodeTypes?: string[];
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
  engine?: ShikiHighlighterOptions['engine'];
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
 */
declare function defineCodeBlockShiki({ nodeTypes, themes, langs, ...rest }?: CodeBlockShikiOptions): Extension;
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
 */
declare function defineCodeBlockSpec(): CodeBlockSpecExtension;
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
 */
declare function defineCodeBlock(): CodeBlockExtension;
export { type CodeBlockAttrs, type CodeBlockCommandsExtension, type CodeBlockExtension, type CodeBlockHighlightOptions, type CodeBlockShikiOptions, type CodeBlockSpecExtension, type HighlightParser, type ShikiBundledLanguage, type ShikiBundledLanguageInfo, type ShikiBundledTheme, type ShikiBundledThemeInfo, defineCodeBlock, defineCodeBlockCommands, defineCodeBlockEnterRule, defineCodeBlockHighlight, defineCodeBlockInputRule, defineCodeBlockKeymap, defineCodeBlockPreviewPlugin, defineCodeBlockShiki, defineCodeBlockSpec, isCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo, shikiBundledThemesInfo };
//# sourceMappingURL=code-block.d.ts.map