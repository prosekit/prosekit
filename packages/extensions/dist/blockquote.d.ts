import { i as WrappingInputRuleOptions } from "./index.js";
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
export declare function defineBlockquoteCommands(): BlockquoteCommandsExtension;
/**
 * The input rule options behind {@link defineBlockquoteInputRule}.
 *
 * @internal
 */
export declare const blockquoteInputRule: WrappingInputRuleOptions;
/**
 * Wraps the text block in a blockquote when `>` is typed at the start of a new
 * line followed by a space.
 */
export declare function defineBlockquoteInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineBlockquoteKeymap(): PlainExtension;
type BlockquoteSpecExtension = Extension<{
  Nodes: {
    blockquote: Attrs;
  };
}>;
export declare function defineBlockquoteSpec(): BlockquoteSpecExtension;
/**
 * @internal
 */
type BlockquoteExtension = Union<[BlockquoteSpecExtension, BlockquoteCommandsExtension]>;
export declare function defineBlockquote(): BlockquoteExtension;
export type { BlockquoteCommandsExtension, BlockquoteExtension, BlockquoteSpecExtension };
//# sourceMappingURL=blockquote.d.ts.map