import { union, type Union } from '@prosekit/core'

import { defineImageCommands, type ImageCommandsExtension } from './image-commands'
import { defineImageSpec, type ImageSpecExtension } from './image-spec'

/**
 * @internal
 */
export type ImageExtension = Union<[ImageSpecExtension, ImageCommandsExtension]>

/**
 * @public
 */
export function defineImage(): ImageExtension {
  return union(defineImageSpec(), defineImageCommands())
}
