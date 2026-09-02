import { Command } from "@prosekit/pm/state";
import { Extension, Union } from "@prosekit/core";
/**
 * Attributes for the `fontFamily` mark.
 */
interface FontFamilyAttrs {
  family: string;
}
/**
 * @internal
 */
type FontFamilySpecExtension = Extension<{
  Marks: {
    fontFamily: FontFamilyAttrs;
  };
}>;
/**
 * @internal
 */
export declare function defineFontFamilySpec(): FontFamilySpecExtension;
/**
 * @internal
 */
export declare function addFontFamily(attrs: FontFamilyAttrs): Command;
/**
 * @internal
 */
export declare function removeFontFamily(): Command;
/**
 * @internal
 */
type FontFamilyCommandsExtension = Extension<{
  Commands: {
    addFontFamily: [attrs: FontFamilyAttrs];
    removeFontFamily: [];
  };
}>;
/**
 * @internal
 */
export declare function defineFontFamilyCommands(): FontFamilyCommandsExtension;
/**
 * @internal
 */
type FontFamilyExtension = Union<[FontFamilySpecExtension, FontFamilyCommandsExtension]>;
/**
 * Defines the `fontFamily` mark and some commands for it.
 */
export declare function defineFontFamily(): FontFamilyExtension;
export type { FontFamilyAttrs, FontFamilyCommandsExtension, FontFamilyExtension, FontFamilySpecExtension };
//# sourceMappingURL=font-family.d.ts.map