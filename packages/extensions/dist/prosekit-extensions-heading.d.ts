import { Extension, PlainExtension, Union } from "@prosekit/core";

//#region src/heading/heading-types.d.ts
interface HeadingAttrs {
  level: number;
}
//#endregion
//#region src/heading/heading-commands.d.ts
/**
 * @internal
 */
type HeadingCommandsExtension = Extension<{
  Commands: {
    setHeading: [attrs?: HeadingAttrs | undefined];
    insertHeading: [attrs?: HeadingAttrs | undefined];
    toggleHeading: [attrs?: HeadingAttrs | undefined];
  };
}>;
/**
 * @internal
 */
declare function defineHeadingCommands(): HeadingCommandsExtension;
//#endregion
//#region src/heading/heading-spec.d.ts
/**
 * @internal
 */
type HeadingSpecExtension = Extension<{
  Nodes: {
    heading: HeadingAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineHeadingSpec(): HeadingSpecExtension;
//#endregion
//#region src/heading/heading.d.ts
/**
 * @internal
 */
type HeadingExtension = Union<[HeadingSpecExtension, HeadingCommandsExtension]>;
/**
 * @public
 */
declare function defineHeading(): HeadingExtension;
//#endregion
//#region src/heading/heading-input-rule.d.ts
/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 *
 * @internal
 */
declare function defineHeadingInputRule(): PlainExtension;
//#endregion
//#region src/heading/heading-keymap.d.ts
/**
 * @internal
 */
declare function defineHeadingKeymap(): PlainExtension;
//#endregion
export { type HeadingAttrs, type HeadingCommandsExtension, type HeadingExtension, type HeadingSpecExtension, defineHeading, defineHeadingCommands, defineHeadingInputRule, defineHeadingKeymap, defineHeadingSpec };
//# sourceMappingURL=prosekit-extensions-heading.d.ts.map