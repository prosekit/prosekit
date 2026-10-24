import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type ParagraphCommandsExtension = Extension<{
  Commands: {
    setParagraph: [];
  };
}>;
/**
 * @internal
 */
export declare function defineParagraphCommands(): ParagraphCommandsExtension;
/**
 * @internal
 */
export declare function defineParagraphKeymap(): PlainExtension;
/**
 * @internal
 */
type ParagraphSpecExtension = Extension<{
  Nodes: {
    paragraph: Attrs;
  };
}>;
/**
 * Defines a paragraph node spec.
 *
 * @internal
 */
export declare function defineParagraphSpec(): ParagraphSpecExtension;
/**
 * @internal
 */
type ParagraphExtension = Union<[ParagraphSpecExtension, ParagraphCommandsExtension]>;
/**
 * Defines a paragraph node.
 *
 * The paragraph node spec has the highest priority, because it should be the
 * default block node for most cases.
 */
export declare function defineParagraph(): ParagraphExtension;
export type { ParagraphCommandsExtension, ParagraphExtension, ParagraphSpecExtension };
//# sourceMappingURL=paragraph.d.ts.map