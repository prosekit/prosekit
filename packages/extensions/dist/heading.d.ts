import { Extension, PlainExtension, Union } from "@prosekit/core";
interface HeadingAttrs {
  level: number;
}
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
/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 *
 * @internal
 */
declare function defineHeadingInputRule(): PlainExtension;
/**
 * @internal
 */
declare function defineHeadingKeymap(): PlainExtension;
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
/**
 * @internal
 */
type HeadingExtension = Union<[HeadingSpecExtension, HeadingCommandsExtension]>;
declare function defineHeading(): HeadingExtension;
export { type HeadingAttrs, type HeadingCommandsExtension, type HeadingExtension, type HeadingSpecExtension, defineHeading, defineHeadingCommands, defineHeadingInputRule, defineHeadingKeymap, defineHeadingSpec };
//# sourceMappingURL=heading.d.ts.map