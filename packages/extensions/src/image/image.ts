import { union, type Union } from '@prosekit/core'

import { defineImageCommands, type ImageCommandsExtension } from './image-commands.ts'
import { defineImageSpec, type ImageSpecExtension } from './image-spec.ts'

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
