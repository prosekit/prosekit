import { Editor, Extension } from "@prosekit/core";
/**
 * Queues an extension to be added to the editor in the next task. Returns a
 * dispose function that can be used to remove the extension in the next task.
 *
 * @internal
 */
export declare function queueExtension(editor: Editor, extension: Extension): VoidFunction;
//# sourceMappingURL=index.d.ts.map