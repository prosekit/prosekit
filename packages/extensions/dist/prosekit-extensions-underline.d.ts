import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/underline/index.d.ts

/**
 * @internal
 */
type UnderlineSpecExtension = Extension<{
  Marks: {
    underline: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineUnderlineSpec(): UnderlineSpecExtension;
/**
 * @internal
 */
type UnderlineCommandsExtension = Extension<{
  Commands: {
    toggleUnderline: [];
  };
}>;
/**
 * @internal
 */
declare function defineUnderlineCommands(): UnderlineCommandsExtension;
/**
 * @internal
 */
declare function defineUnderlineKeymap(): PlainExtension;
/**
 * @internal
 */
type UnderlineExtension = Union<[UnderlineSpecExtension, UnderlineCommandsExtension]>;
/**
 * @public
 */
declare function defineUnderline(): UnderlineExtension;
//#endregion
export { UnderlineCommandsExtension, UnderlineExtension, UnderlineSpecExtension, defineUnderline, defineUnderlineCommands, defineUnderlineKeymap, defineUnderlineSpec };
//# sourceMappingURL=prosekit-extensions-underline.d.ts.map