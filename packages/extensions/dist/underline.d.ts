import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
export type UnderlineSpecExtension = Extension<{
  Marks: {
    underline: Attrs;
  };
}>;
/**
 * @internal
 */
export declare function defineUnderlineSpec(): UnderlineSpecExtension;
/**
 * @internal
 */
export type UnderlineCommandsExtension = Extension<{
  Commands: {
    toggleUnderline: [];
  };
}>;
/**
 * @internal
 */
export declare function defineUnderlineCommands(): UnderlineCommandsExtension;
/**
 * @internal
 */
export declare function defineUnderlineKeymap(): PlainExtension;
/**
 * @internal
 */
export type UnderlineExtension = Union<[UnderlineSpecExtension, UnderlineCommandsExtension]>;
export declare function defineUnderline(): UnderlineExtension;
//# sourceMappingURL=underline.d.ts.map