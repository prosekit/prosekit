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
export declare function defineItalicCommands(): ItalicCommandsExtension;
/**
 * @internal
 */
export declare function defineItalicInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineItalicKeymap(): PlainExtension;
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
export declare function defineItalicSpec(): ItalicSpecExtension;
/**
 * @internal
 */
type ItalicExtension = Union<[ItalicSpecExtension, ItalicCommandsExtension]>;
export declare function defineItalic(): ItalicExtension;
export type { ItalicCommandsExtension, ItalicExtension, ItalicSpecExtension };
//# sourceMappingURL=italic.d.ts.map