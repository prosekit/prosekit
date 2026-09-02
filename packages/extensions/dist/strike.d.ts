import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
export type StrikeSpecExtension = Extension<{
  Marks: {
    strike: Attrs;
  };
}>;
/**
 * @internal
 */
export declare function defineStrikeSpec(): StrikeSpecExtension;
/**
 * @internal
 */
export type StrikeCommandsExtension = Extension<{
  Commands: {
    toggleStrike: [];
  };
}>;
/**
 * @internal
 */
export declare function defineStrikeCommands(): StrikeCommandsExtension;
/**
 * @internal
 */
export declare function defineStrikeKeymap(): PlainExtension;
/**
 * @internal
 */
export declare function defineStrikeInputRule(): PlainExtension;
/**
 * @internal
 */
export type StrikeExtension = Union<[StrikeSpecExtension, StrikeCommandsExtension]>;
export declare function defineStrike(): StrikeExtension;
//# sourceMappingURL=strike.d.ts.map