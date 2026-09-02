import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type StrikeSpecExtension = Extension<{
  Marks: {
    strike: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineStrikeSpec(): StrikeSpecExtension;
/**
 * @internal
 */
type StrikeCommandsExtension = Extension<{
  Commands: {
    toggleStrike: [];
  };
}>;
/**
 * @internal
 */
declare function defineStrikeCommands(): StrikeCommandsExtension;
/**
 * @internal
 */
declare function defineStrikeKeymap(): PlainExtension;
/**
 * @internal
 */
declare function defineStrikeInputRule(): PlainExtension;
/**
 * @internal
 */
type StrikeExtension = Union<[StrikeSpecExtension, StrikeCommandsExtension]>;
declare function defineStrike(): StrikeExtension;
export { StrikeCommandsExtension, StrikeExtension, StrikeSpecExtension, defineStrike, defineStrikeCommands, defineStrikeInputRule, defineStrikeKeymap, defineStrikeSpec };
//# sourceMappingURL=strike.d.ts.map