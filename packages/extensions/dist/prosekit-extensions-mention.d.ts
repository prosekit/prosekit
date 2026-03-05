import { Extension, Union } from "@prosekit/core";

//#region src/mention/index.d.ts
interface MentionAttrs {
  id: string;
  value: string;
  kind: string;
}
/**
 * @internal
 */
type MentionSpecExtension = Extension<{
  Nodes: {
    mention: MentionAttrs;
  };
}>;
/**
 * @public
 */
declare function defineMentionSpec(): MentionSpecExtension;
/**
 * @internal
 */
type MentionCommandsExtension = Extension<{
  Commands: {
    insertMention: [attrs: MentionAttrs];
  };
}>;
declare function defineMentionCommands(): MentionCommandsExtension;
/**
 * @internal
 */
type MentionExtension = Union<[MentionSpecExtension, MentionCommandsExtension]>;
/**
 * @public
 */
declare function defineMention(): MentionExtension;
//#endregion
export { MentionAttrs, MentionCommandsExtension, MentionExtension, MentionSpecExtension, defineMention, defineMentionCommands, defineMentionSpec };
//# sourceMappingURL=prosekit-extensions-mention.d.ts.map