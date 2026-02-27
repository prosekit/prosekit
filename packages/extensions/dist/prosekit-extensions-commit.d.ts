import { Transaction } from "@prosekit/pm/state";
import { NodeJSON, PlainExtension, StepJSON } from "@prosekit/core";
import { ProseMirrorNode } from "@prosekit/pm/model";

//#region src/commit/index.d.ts
/**
 * A JSON representation of a commit.
 */
interface Commit {
  /**
   * The current doc node in the JSON format
   */
  doc: NodeJSON;
  /**
   * The parent node in the JSON format
   */
  parent: NodeJSON;
  /**
   * An array of steps in the JSON format that transform the parent node to the
   * current doc node.
   */
  steps: StepJSON[];
}
/**
 * Define an extension to display the changes from the given commit in the editor.
 */
declare function defineCommitViewer(commit: Commit): PlainExtension;
declare class CommitRecorder {
  private parent;
  private doc;
  private steps;
  /**
   * Return a commit object including all changes since the last commit. `null`
   * will be returned if there is no change.
   */
  commit(): Commit | null;
  /**
   * @internal
   */
  init(doc: ProseMirrorNode): void;
  /**
   * @internal
   */
  apply(tr: Transaction): void;
}
/**
 * Define an extension that can record the changes in the editor.
 */
declare function defineCommitRecorder(commitRecorder: CommitRecorder): PlainExtension;
//#endregion
export { type Commit, CommitRecorder, defineCommitRecorder, defineCommitViewer };
//# sourceMappingURL=prosekit-extensions-commit.d.ts.map