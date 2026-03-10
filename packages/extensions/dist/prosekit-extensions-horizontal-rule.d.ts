import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";

//#region src/horizontal-rule/horizontal-rule-commands.d.ts
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
//#endregion
//#region src/horizontal-rule/horizontal-rule-input-rule.d.ts
/**
 * @public
 */
declare function defineHorizontalRuleInputRule(): PlainExtension;
//#endregion
//#region src/horizontal-rule/horizontal-rule-spec.d.ts
type HorizontalRuleSpecExtension = Extension<{
  Nodes: {
    horizontalRule: Attrs;
  };
}>;
declare function defineHorizontalRuleSpec(): HorizontalRuleSpecExtension;
//#endregion
//#region src/horizontal-rule/horizontal-rule.d.ts
type HorizontalRuleExtension = Union<[HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]>;
/**
 * @public
 */
declare function defineHorizontalRule(): HorizontalRuleExtension;
//#endregion
export { type HorizontalRuleCommandsExtension, type HorizontalRuleExtension, type HorizontalRuleSpecExtension, defineHorizontalRule, defineHorizontalRuleCommands, defineHorizontalRuleInputRule, defineHorizontalRuleSpec, insertHorizontalRule };
//# sourceMappingURL=prosekit-extensions-horizontal-rule.d.ts.map