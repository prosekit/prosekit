import { Command } from "@prosekit/pm/state";
import { Extension, Union } from "@prosekit/core";
/**
 * Attributes for the `textColor` mark.
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
/**
 * @internal
 */
type TextColorExtension = Union<[TextColorSpecExtension, TextColorCommandsExtension]>;
/**
 * Defines the `textColor` mark and some commands for it.
 */
declare function defineTextColor(): TextColorExtension;
export { type TextColorAttrs, type TextColorCommandsExtension, type TextColorExtension, type TextColorSpecExtension, addTextColor, defineTextColor, defineTextColorCommands, defineTextColorSpec, removeTextColor };
//# sourceMappingURL=text-color.d.ts.map