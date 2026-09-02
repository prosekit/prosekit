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
export declare function defineSuperscriptCommands(): SuperscriptCommandsExtension;
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
export declare function defineSuperscriptSpec(): SuperscriptSpecExtension;
/**
 * @internal
 */
type SuperscriptExtension = Union<[SuperscriptSpecExtension, SuperscriptCommandsExtension]>;
export declare function defineSuperscript(): SuperscriptExtension;
export type { SuperscriptCommandsExtension, SuperscriptExtension, SuperscriptSpecExtension };
//# sourceMappingURL=superscript.d.ts.map