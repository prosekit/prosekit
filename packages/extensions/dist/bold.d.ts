import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type BoldCommandsExtension = Extension<{
  Commands: {
    toggleBold: [];
  };
}>;
/**
 * @internal
 */
declare function defineBoldCommands(): BoldCommandsExtension;
/**
 * @internal
 */
declare function defineBoldInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineBoldKeymap(): PlainExtension;
/**
 * @internal
 */
type BoldSpecExtension = Extension<{
  Marks: {
    bold: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineBoldSpec(): BoldSpecExtension;
/**
 * @internal
 */
type BoldExtension = Union<[BoldSpecExtension, BoldCommandsExtension]>;
declare function defineBold(): BoldExtension;
export { type BoldCommandsExtension, type BoldExtension, type BoldSpecExtension, defineBold, defineBoldCommands, defineBoldInputRule, defineBoldKeymap, defineBoldSpec };
//# sourceMappingURL=bold.d.ts.map