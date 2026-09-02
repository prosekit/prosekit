import { Extension, PlainExtension, Union } from "@prosekit/core";
/**
 * @internal
 */
declare function defineLinkPasteRule(): PlainExtension;
interface LinkAttrs {
  href: string;
  target?: string | null;
  rel?: string | null;
}
/**
 * @internal
 */
type LinkSpecExtension = Extension<{
  Marks: {
    link: LinkAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineLinkSpec(): LinkSpecExtension;
/**
 * @internal
 */
type LinkCommandsExtension = Extension<{
  Commands: {
    addLink: [attrs: LinkAttrs];
    removeLink: [];
    toggleLink: [attrs: LinkAttrs];
    expandLink: [];
  };
}>;
declare function defineLinkCommands(): LinkCommandsExtension;
/**
 * Apply link marks after pressing Space.
 *
 * @internal
 */
declare function defineLinkInputRule(): PlainExtension;
/**
 * Apply link marks after typing Enter.
 *
 * @internal
 */
declare function defineLinkEnterRule(): PlainExtension;
/**
 * Apply and remove link marks to the text during typing.
 *
 * @internal
 */
declare function defineLinkMarkRule(): PlainExtension;
/**
 * @internal
 */
type LinkExtension = Union<[LinkSpecExtension, LinkCommandsExtension]>;
declare function defineLink(): LinkExtension;
export { type LinkAttrs, LinkCommandsExtension, LinkExtension, LinkSpecExtension, defineLink, defineLinkCommands, defineLinkEnterRule, defineLinkInputRule, defineLinkMarkRule, defineLinkPasteRule, defineLinkSpec };
//# sourceMappingURL=link.d.ts.map