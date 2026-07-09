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
declare function defineParagraphCommands(): ParagraphCommandsExtension;
/**
 * @internal
 */
declare function defineParagraphKeymap(): PlainExtension;
/**
 * @internal
 */
type ParagraphSpecExtension = Extension<{
  Nodes: {
    paragraph: Attrs;
  };
}>;
/**
 * @internal
 *
 * Defines a paragraph node spec.
 */
declare function defineParagraphSpec(): ParagraphSpecExtension;
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
declare function defineParagraph(): ParagraphExtension;
export { type ParagraphCommandsExtension, type ParagraphExtension, type ParagraphSpecExtension, defineParagraph, defineParagraphCommands, defineParagraphKeymap, defineParagraphSpec };
//# sourceMappingURL=paragraph.d.ts.map