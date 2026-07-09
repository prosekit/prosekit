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
declare function insertHorizontalRule(): Command;
declare function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension;
declare function defineHorizontalRuleInputRule(): PlainExtension;
type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
    horizontalRule: Attrs;
  };
}>;
declare function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension;
type HorizontalRuleExtension = Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>;
declare function defineHorizontalRule(): HorizontalRuleExtension;
export { type HorizontalRuleCommandsExtension, type HorizontalRuleExtension, type HorizontalRuleSpecExtension, defineHorizontalRule, defineHorizontalRuleCommands, defineHorizontalRuleInputRule, defineHorizontalRuleSpec, insertHorizontalRule };
//# sourceMappingURL=horizontal-rule.d.ts.map