import { Extension } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/text/index.d.ts
/**
* @internal
*/
/**
* @internal
*/
type TextExtension = Extension<{
  Nodes: {
    text: Attrs;
  };
}>;
/**
* @public
*/
declare function defineText(): TextExtension;

//#endregion
export { TextExtension, defineText };