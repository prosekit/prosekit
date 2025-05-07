import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/doc/index.d.ts
/**
* @internal
*/
/**
* @internal
*/
type DocExtension = Extension<{
  Nodes: {
    doc: Attrs;
  };
}>;
/**
* @public
*/
declare function defineDoc(): DocExtension;

//#endregion
export { DocExtension, defineDoc };