import { Extension, PlainExtension, Union } from "@prosekit/core";
/**
 * @internal
 */
export declare function defineLinkPasteRule(): PlainExtension;
interface LinkAttrs {
  href: string;
  target?: string | null;
  rel?: string | null;
}
/**
 * @internal
 */
export type LinkSpecExtension = Extension<{
  Marks: {
    link: LinkAttrs;
  };
}>;
/**
 * @internal
 */
export declare function defineLinkSpec(): LinkSpecExtension;
/**
 * @internal
 */
export type LinkCommandsExtension = Extension<{
  Commands: {
    addLink: [attrs: LinkAttrs];
    removeLink: [];
    toggleLink: [attrs: LinkAttrs];
    expandLink: [];
  };
}>;
export declare function defineLinkCommands(): LinkCommandsExtension;
/**
 * Apply link marks after pressing Space.
 *
 * @internal
 */
export declare function defineLinkInputRule(): PlainExtension;
/**
 * Apply link marks after typing Enter.
 *
 * @internal
 */
export declare function defineLinkEnterRule(): PlainExtension;
/**
 * Apply and remove link marks to the text during typing.
 *
 * @internal
 */
export declare function defineLinkMarkRule(): PlainExtension;
/**
 * @internal
 */
export type LinkExtension = Union<[LinkSpecExtension, LinkCommandsExtension]>;
export declare function defineLink(): LinkExtension;
export type { LinkAttrs };
//# sourceMappingURL=link.d.ts.map