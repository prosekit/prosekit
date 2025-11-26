import { VirtualFileSystem } from '@prosekit/vfs'

import { ROOT_DIR } from './root-dir'

export const vfs: VirtualFileSystem = new VirtualFileSystem(ROOT_DIR)
