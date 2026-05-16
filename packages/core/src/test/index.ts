/**
 * Some utilities for testing ProseKit.
 *
 * @module
 */

import type { ProseMirrorNode } from '@prosekit/pm/model';
import type { Selection } from '@prosekit/pm/state';
import { maybeGetSelection } from './test-editor.ts';

export { createTestEditor, type TestEditor } from './test-editor.ts'


/**
 * TODO: add some docs here
 */
export function extractSelection(doc: ProseMirrorNode): Selection | undefined {
  return maybeGetSelection(doc)
}
