import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/paragraph/paragraph-commands.d.ts
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
//#endregion
//#region src/paragraph/paragraph-keymap.d.ts
/**
 * @internal
 */
declare function defineParagraphKeymap(): PlainExtension;
//#endregion
//#region src/paragraph/paragraph-spec.d.ts
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
//#endregion
//#region src/paragraph/paragraph.d.ts
/**
 * @internal
 */
type ParagraphExtension = Union<[ParagraphSpecExtension, ParagraphCommandsExtension]>;
/**
 * @public
 *
 * Defines a paragraph node.
 *
 * The paragraph node spec has the highest priority, because it should be the
 * default block node for most cases.
 */
declare function defineParagraph(): ParagraphExtension;
//#endregion
export { type ParagraphCommandsExtension, type ParagraphExtension, type ParagraphSpecExtension, defineParagraph, defineParagraphCommands, defineParagraphKeymap, defineParagraphSpec };
//# sourceMappingURL=prosekit-extensions-paragraph.d.ts.map