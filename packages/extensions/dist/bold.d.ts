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
export declare function defineBoldCommands(): BoldCommandsExtension;
/**
 * @internal
 */
export declare function defineBoldInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineBoldKeymap(): PlainExtension;
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
export declare function defineBoldSpec(): BoldSpecExtension;
/**
 * @internal
 */
type BoldExtension = Union<[BoldSpecExtension, BoldCommandsExtension]>;
export declare function defineBold(): BoldExtension;
export type { BoldCommandsExtension, BoldExtension, BoldSpecExtension };
//# sourceMappingURL=bold.d.ts.map