import { Extension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
/**
 * @internal
 */
type SuperscriptCommandsExtension = Extension<{
  Commands: {
    toggleSuperscript: [];
  };
}>;
/**
 * @internal
 */
declare function defineSuperscriptCommands(): SuperscriptCommandsExtension;
/**
 * @internal
 */
type SuperscriptSpecExtension = Extension<{
  Marks: {
    superscript: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineSuperscriptSpec(): SuperscriptSpecExtension;
/**
 * @internal
 */
type SuperscriptExtension = Union<[SuperscriptSpecExtension, SuperscriptCommandsExtension]>;
declare function defineSuperscript(): SuperscriptExtension;
export { type SuperscriptCommandsExtension, type SuperscriptExtension, type SuperscriptSpecExtension, defineSuperscript, defineSuperscriptCommands, defineSuperscriptSpec };
//# sourceMappingURL=superscript.d.ts.map