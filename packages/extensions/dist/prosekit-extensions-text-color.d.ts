import { Extension, Union } from "@prosekit/core";
import { Command } from "@prosekit/pm/state";

//#region src/text-color/text-color-spec.d.ts
/**
 * Attributes for the `textColor` mark.
 *
 * @public
 */
interface TextColorAttrs {
  color: string;
}
/**
 * @internal
 */
type TextColorSpecExtension = Extension<{
  Marks: {
    textColor: TextColorAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineTextColorSpec(): TextColorSpecExtension;
//#endregion
//#region src/text-color/text-color-commands.d.ts
/**
 * @internal
 */
declare function addTextColor(attrs: TextColorAttrs): Command;
/**
 * @internal
 */
declare function removeTextColor(): Command;
/**
 * @internal
 */
type TextColorCommandsExtension = Extension<{
  Commands: {
    addTextColor: [attrs: TextColorAttrs];
    removeTextColor: [];
  };
}>;
/**
 * @internal
 */
declare function defineTextColorCommands(): TextColorCommandsExtension;
//#endregion
//#region src/text-color/text-color.d.ts
/**
 * @internal
 */
type TextColorExtension = Union<[TextColorSpecExtension, TextColorCommandsExtension]>;
/**
 * Defines the `textColor` mark and some commands for it.
 *
 * @public
 */
declare function defineTextColor(): TextColorExtension;
//#endregion
export { type TextColorAttrs, type TextColorCommandsExtension, type TextColorExtension, type TextColorSpecExtension, addTextColor, defineTextColor, defineTextColorCommands, defineTextColorSpec, removeTextColor };
//# sourceMappingURL=prosekit-extensions-text-color.d.ts.map