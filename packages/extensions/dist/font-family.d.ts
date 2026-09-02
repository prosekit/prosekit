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
declare function defineFontFamilySpec(): FontFamilySpecExtension;
/**
 * @internal
 */
declare function addFontFamily(attrs: FontFamilyAttrs): Command;
/**
 * @internal
 */
declare function removeFontFamily(): Command;
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
declare function defineFontFamilyCommands(): FontFamilyCommandsExtension;
/**
 * @internal
 */
type FontFamilyExtension = Union<[FontFamilySpecExtension, FontFamilyCommandsExtension]>;
/**
 * Defines the `fontFamily` mark and some commands for it.
 */
declare function defineFontFamily(): FontFamilyExtension;
export { type FontFamilyAttrs, type FontFamilyCommandsExtension, type FontFamilyExtension, type FontFamilySpecExtension, addFontFamily, defineFontFamily, defineFontFamilyCommands, defineFontFamilySpec, removeFontFamily };
//# sourceMappingURL=font-family.d.ts.map