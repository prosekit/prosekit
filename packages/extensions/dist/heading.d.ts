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
export declare function defineHeadingCommands(): HeadingCommandsExtension;
/**
 * Converts the text block to a heading when `#` is typed at the start of a new
 * line followed by a space.
 *
 * @internal
 */
export declare function defineHeadingInputRule(): PlainExtension;
/**
 * @internal
 */
export declare function defineHeadingKeymap(): PlainExtension;
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
export declare function defineHeadingSpec(): HeadingSpecExtension;
/**
 * @internal
 */
type HeadingExtension = Union<[HeadingSpecExtension, HeadingCommandsExtension]>;
export declare function defineHeading(): HeadingExtension;
export type { HeadingAttrs, HeadingCommandsExtension, HeadingExtension, HeadingSpecExtension };
//# sourceMappingURL=heading.d.ts.map