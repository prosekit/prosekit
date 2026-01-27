import { Extension, Union } from "@prosekit/core";
import { Command } from "@prosekit/pm/state";

//#region src/background-color/background-color-spec.d.ts
/**
 * Attributes for the `backgroundColor` mark.
 *
 * @public
 */
interface BackgroundColorAttrs {
  color: string;
}
/**
 * @internal
 */
type BackgroundColorSpecExtension = Extension<{
  Marks: {
    backgroundColor: BackgroundColorAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineBackgroundColorSpec(): BackgroundColorSpecExtension;
//#endregion
//#region src/background-color/background-color-commands.d.ts
/**
 * @internal
 */
declare function addBackgroundColor(attrs: BackgroundColorAttrs): Command;
/**
 * @internal
 */
declare function removeBackgroundColor(): Command;
/**
 * @internal
 */
type BackgroundColorCommandsExtension = Extension<{
  Commands: {
    addBackgroundColor: [attrs: BackgroundColorAttrs];
    removeBackgroundColor: [];
  };
}>;
/**
 * @internal
 */
declare function defineBackgroundColorCommands(): BackgroundColorCommandsExtension;
//#endregion
//#region src/background-color/background-color.d.ts
/**
 * @internal
 */
type BackgroundColorExtension = Union<[BackgroundColorSpecExtension, BackgroundColorCommandsExtension]>;
/**
 * Defines the `backgroundColor` mark and some commands for it.
 *
 * @public
 */
declare function defineBackgroundColor(): BackgroundColorExtension;
//#endregion
export { type BackgroundColorAttrs, type BackgroundColorCommandsExtension, type BackgroundColorExtension, type BackgroundColorSpecExtension, addBackgroundColor, defineBackgroundColor, defineBackgroundColorCommands, defineBackgroundColorSpec, removeBackgroundColor };
//# sourceMappingURL=prosekit-extensions-background-color.d.ts.map