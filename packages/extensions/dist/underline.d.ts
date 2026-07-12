import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
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
declare function defineUnderline(): UnderlineExtension;
export { UnderlineCommandsExtension, UnderlineExtension, UnderlineSpecExtension, defineUnderline, defineUnderlineCommands, defineUnderlineKeymap, defineUnderlineSpec };
//# sourceMappingURL=underline.d.ts.map