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
export declare function defineTextColorSpec(): TextColorSpecExtension;
/**
 * @internal
 */
export declare function addTextColor(attrs: TextColorAttrs): Command;
/**
 * @internal
 */
export declare function removeTextColor(): Command;
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
export declare function defineTextColorCommands(): TextColorCommandsExtension;
/**
 * @internal
 */
type TextColorExtension = Union<[TextColorSpecExtension, TextColorCommandsExtension]>;
/**
 * Defines the `textColor` mark and some commands for it.
 */
export declare function defineTextColor(): TextColorExtension;
export type { TextColorAttrs, TextColorCommandsExtension, TextColorExtension, TextColorSpecExtension };
//# sourceMappingURL=text-color.d.ts.map