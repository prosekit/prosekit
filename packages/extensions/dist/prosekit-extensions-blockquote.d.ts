import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/blockquote/blockquote-commands.d.ts
type BlockquoteCommandsExtension = Extension<{
  Commands: {
    setBlockquote: [];
    insertBlockquote: [];
    toggleBlockquote: [];
  };
}>;
/**
 * @internal
 */
declare function defineBlockquoteCommands(): BlockquoteCommandsExtension;
//#endregion
//#region src/blockquote/blockquote-input-rule.d.ts
/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
declare function defineBlockquoteInputRule(): PlainExtension;
//#endregion
//#region src/blockquote/blockquote-keymap.d.ts
/**
 * @internal
 */
declare function defineBlockquoteKeymap(): PlainExtension;
//#endregion
//#region src/blockquote/blockquote-spec.d.ts
type BlockquoteSpecExtension = Extension<{
  Nodes: {
    blockquote: Attrs;
  };
}>;
declare function defineBlockquoteSpec(): BlockquoteSpecExtension;
//#endregion
//#region src/blockquote/blockquote.d.ts
/**
 * @internal
 */
type BlockquoteExtension = Union<[BlockquoteSpecExtension, BlockquoteCommandsExtension]>;
/**
 * @public
 */
declare function defineBlockquote(): BlockquoteExtension;
//#endregion
export { type BlockquoteCommandsExtension, type BlockquoteExtension, type BlockquoteSpecExtension, defineBlockquote, defineBlockquoteCommands, defineBlockquoteInputRule, defineBlockquoteKeymap, defineBlockquoteSpec };
//# sourceMappingURL=prosekit-extensions-blockquote.d.ts.map