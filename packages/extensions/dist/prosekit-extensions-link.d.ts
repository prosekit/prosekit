import { Extension, PlainExtension, Union } from "@prosekit/core";

//#region src/link/link-paste-rule.d.ts
/**
 * @internal
 */
declare function defineLinkPasteRule(): PlainExtension;
//#endregion
//#region src/link/link-types.d.ts
/**
 * @public
 */
interface LinkAttrs {
  href: string;
  target?: string | null;
  rel?: string | null;
}
//#endregion
//#region src/link/index.d.ts
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
/**
 * @public
 */
declare function defineLink(): LinkExtension;
//#endregion
export { type LinkAttrs, LinkCommandsExtension, LinkExtension, LinkSpecExtension, defineLink, defineLinkCommands, defineLinkEnterRule, defineLinkInputRule, defineLinkMarkRule, defineLinkPasteRule, defineLinkSpec };
//# sourceMappingURL=prosekit-extensions-link.d.ts.map