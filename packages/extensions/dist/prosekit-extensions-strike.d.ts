import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/strike/index.d.ts
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
/**
 * @public
 */
declare function defineStrike(): StrikeExtension;
//#endregion
export { StrikeCommandsExtension, StrikeExtension, StrikeSpecExtension, defineStrike, defineStrikeCommands, defineStrikeInputRule, defineStrikeKeymap, defineStrikeSpec };
//# sourceMappingURL=prosekit-extensions-strike.d.ts.map