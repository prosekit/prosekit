import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
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
/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
declare function defineBlockquoteInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineBlockquoteKeymap(): PlainExtension;
type BlockquoteSpecExtension = Extension<{
  Nodes: {
    blockquote: Attrs;
  };
}>;
declare function defineBlockquoteSpec(): BlockquoteSpecExtension;
/**
 * @internal
 */
type BlockquoteExtension = Union<[BlockquoteSpecExtension, BlockquoteCommandsExtension]>;
declare function defineBlockquote(): BlockquoteExtension;
export { type BlockquoteCommandsExtension, type BlockquoteExtension, type BlockquoteSpecExtension, defineBlockquote, defineBlockquoteCommands, defineBlockquoteInputRule, defineBlockquoteKeymap, defineBlockquoteSpec };
//# sourceMappingURL=blockquote.d.ts.map