import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/italic/italic-commands.d.ts
/**
* @internal
*/
/**
* @internal
*/
type ItalicCommandsExtension = Extension<{
  Commands: {
    toggleItalic: [];
  };
}>;
/**
* @internal
*/
declare function defineItalicCommands(): ItalicCommandsExtension;
//#endregion
//#region src/italic/italic-spec.d.ts
/**
* @internal
*/
type ItalicSpecExtension = Extension<{
  Marks: {
    italic: Attrs;
  };
}>;
/**
* @internal
*/
declare function defineItalicSpec(): ItalicSpecExtension;

//#endregion
//#region src/italic/italic.d.ts
/**
* @internal
*/
type ItalicExtension = Union<[ItalicSpecExtension, ItalicCommandsExtension]>;
/**
* @public
*/
declare function defineItalic(): ItalicExtension;

//#endregion
//#region src/italic/italic-input-rule.d.ts
/**
* @internal
*/
declare function defineItalicInputRule(): PlainExtension;

//#endregion
//#region src/italic/italic-keymap.d.ts
/**
* @internal
*/
declare function defineItalicKeymap(): PlainExtension;

//#endregion
export { ItalicCommandsExtension, ItalicExtension, ItalicSpecExtension, defineItalic, defineItalicCommands, defineItalicInputRule, defineItalicKeymap, defineItalicSpec };