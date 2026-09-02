import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
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
/**
 * @internal
 */
declare function defineItalicInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineItalicKeymap(): PlainExtension;
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
/**
 * @internal
 */
type ItalicExtension = Union<[ItalicSpecExtension, ItalicCommandsExtension]>;
declare function defineItalic(): ItalicExtension;
export { type ItalicCommandsExtension, type ItalicExtension, type ItalicSpecExtension, defineItalic, defineItalicCommands, defineItalicInputRule, defineItalicKeymap, defineItalicSpec };
//# sourceMappingURL=italic.d.ts.map