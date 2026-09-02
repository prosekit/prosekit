import { Editor, Extension } from "@prosekit/core";
/**
 * Queues an extension to be added to the editor in the next task. Returns a
 * dispose function that can be used to remove the extension in the next task.
 *
 * @internal
 */
declare function queueExtension(editor: Editor, extension: Extension): VoidFunction;
export { queueExtension };
//# sourceMappingURL=index.d.ts.map