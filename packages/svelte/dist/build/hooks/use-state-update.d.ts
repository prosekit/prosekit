import type { EditorState } from '@prosekit/pm/state';
import { type UseExtensionOptions } from './use-extension';
/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
export declare function useStateUpdate(handler: (state: EditorState) => void, options?: UseExtensionOptions): void;
