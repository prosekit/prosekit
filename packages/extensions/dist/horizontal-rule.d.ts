import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
type HorizontalRuleCommandsExtension = Extension<{
  Commands: {
    insertHorizontalRule: [];
  };
}>;
/**
 * Returns a command that inserts a horizontal rule at the current selection.
 */
export declare function insertHorizontalRule(): Command;
export declare function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension;
export declare function defineHorizontalRuleInputRule(): PlainExtension;
type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
    horizontalRule: Attrs;
  };
}>;
export declare function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension;
type HorizontalRuleExtension = Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>;
export declare function defineHorizontalRule(): HorizontalRuleExtension;
export type { HorizontalRuleCommandsExtension, HorizontalRuleExtension, HorizontalRuleSpecExtension };
//# sourceMappingURL=horizontal-rule.d.ts.map