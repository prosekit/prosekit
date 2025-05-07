import { Extension, Union } from "@prosekit/core";

//#region src/image/image-spec.d.ts
/**
* @public
*/
/**
* @public
*/
interface ImageAttrs {
  src?: string | null;
  width?: number | null;
  height?: number | null;
}
/**
* @internal
*/
type ImageSpecExtension = Extension<{
  Nodes: {
    image: ImageAttrs;
  };
}>;
/**
* @internal
*/
declare function defineImageSpec(): ImageSpecExtension; //#endregion
//#region src/image/image-commands.d.ts
/**
* @internal
*/
type ImageCommandsExtension = Extension<{
  Commands: {
    insertImage: [attrs?: ImageAttrs];
  };
}>;
/**
* @internal
*/
declare function defineImageCommands(): ImageCommandsExtension;

//#endregion
//#region src/image/image.d.ts
/**
* @internal
*/
type ImageExtension = Union<[ImageSpecExtension, ImageCommandsExtension]>;
/**
* @public
*/
declare function defineImage(): ImageExtension;

//#endregion
export { ImageAttrs, ImageCommandsExtension, ImageExtension, ImageSpecExtension, defineImage, defineImageCommands, defineImageSpec };