import { Extension, Union } from "@prosekit/core";
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
declare function defineMention(): MentionExtension;
export { MentionAttrs, MentionCommandsExtension, MentionExtension, MentionSpecExtension, defineMention, defineMentionCommands, defineMentionSpec };
//# sourceMappingURL=mention.d.ts.map