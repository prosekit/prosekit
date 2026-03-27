export { defineImage, type ImageExtension } from './image'
export { defineImageCommands, type ImageCommandsExtension } from './image-commands'
export { insertImage } from './image-commands/insert-image'
export {
  replaceImageURL,
  uploadImage,
  type ImageUploadErrorHandler,
  type ImageUploadErrorHandlerOptions,
  type UploadImageOptions,
} from './image-commands/upload-image'
export { defineImageSpec, type ImageAttrs, type ImageSpecExtension } from './image-spec'
export {
  defineImageUploadHandler,
  type ImageCanDropPredicate,
  type ImageCanPastePredicate,
  type ImageUploadHandlerOptions,
} from './image-upload-handler'
