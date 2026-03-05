import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/code/code-commands.d.ts
/**
 * @internal
 */
type CodeCommandsExtension = Extension<{
  Commands: {
    toggleCode: [];
  };
}>;
/**
 * @internal
 */
declare function defineCodeCommands(): CodeCommandsExtension;
//#endregion
//#region src/code/code-input-rule.d.ts
/**
 * @internal
 */
declare function defineCodeInputRule(): PlainExtension;
//#endregion
//#region src/code/code-keymap.d.ts
/**
 * @internal
 */
declare function defineCodeKeymap(): PlainExtension;
//#endregion
//#region src/code/code-spec.d.ts
/**
 * @internal
 */
type CodeSpecExtension = Extension<{
  Marks: {
    code: Attrs;
  };
}>;
/**
 * @internal
 */
declare function defineCodeSpec(): CodeSpecExtension;
//#endregion
//#region src/code/code.d.ts
/**
 * @internal
 */
type CodeExtension = Union<[CodeSpecExtension, CodeCommandsExtension]>;
/**
 * @public
 */
declare function defineCode(): CodeExtension;
//#endregion
export { type CodeCommandsExtension, type CodeExtension, type CodeSpecExtension, defineCode, defineCodeCommands, defineCodeInputRule, defineCodeKeymap, defineCodeSpec };
//# sourceMappingURL=prosekit-extensions-code.d.ts.map