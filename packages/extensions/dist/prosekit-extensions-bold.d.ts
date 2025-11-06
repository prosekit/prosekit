import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/bold/bold-commands.d.ts
/**
 * @internal
 */
type BoldCommandsExtension = Extension<{
  Commands: {
    toggleBold: [];
  };
}>;
/**
 * @internal
 */
declare function defineBoldCommands(): BoldCommandsExtension;
//#endregion
//#region src/bold/bold-spec.d.ts
/**
 * @internal
 */
type BoldSpecExtension = Extension<{
  Marks: {
    bold: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineBoldSpec(): BoldSpecExtension;
//#endregion
//#region src/bold/bold.d.ts
/**
 * @internal
 */
type BoldExtension = Union<[BoldSpecExtension, BoldCommandsExtension]>;
/**
 * @public
 */
declare function defineBold(): BoldExtension;
//#endregion
//#region src/bold/bold-input-rule.d.ts
/**
 * @internal
 */
declare function defineBoldInputRule(): PlainExtension;
//#endregion
//#region src/bold/bold-keymap.d.ts
/**
 * @internal
 */
declare function defineBoldKeymap(): PlainExtension;
//#endregion
export { type BoldCommandsExtension, type BoldExtension, type BoldSpecExtension, defineBold, defineBoldCommands, defineBoldInputRule, defineBoldKeymap, defineBoldSpec };
//# sourceMappingURL=prosekit-extensions-bold.d.ts.map