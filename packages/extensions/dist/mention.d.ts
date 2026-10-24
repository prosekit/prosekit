import { Extension, Union } from "@prosekit/core";
export interface MentionAttrs {
  id: string;
  value: string;
  kind: string;
}
/**
 * @internal
 */
export type MentionSpecExtension = Extension<{
  Nodes: {
    mention: MentionAttrs;
  };
}>;
export declare function defineMentionSpec(): MentionSpecExtension;
/**
 * @internal
 */
export type MentionCommandsExtension = Extension<{
  Commands: {
    insertMention: [attrs: MentionAttrs];
  };
}>;
export declare function defineMentionCommands(): MentionCommandsExtension;
/**
 * @internal
 */
export type MentionExtension = Union<[MentionSpecExtension, MentionCommandsExtension]>;
export declare function defineMention(): MentionExtension;
//# sourceMappingURL=mention.d.ts.map