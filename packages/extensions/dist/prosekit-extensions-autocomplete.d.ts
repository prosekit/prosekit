import { Extension } from "@prosekit/core";
import { EditorState } from "@prosekit/pm/state";

//#region src/autocomplete/autocomplete-rule.d.ts
/**
 * Options for the {@link MatchHandler} callback.
 */
interface MatchHandlerOptions {
  /**
   * The editor state.
   */
  state: EditorState;
  /**
   * The result of `RegExp.exec`.
   */
  match: RegExpExecArray;
  /**
   * The start position of the matched text.
   */
  from: number;
  /**
   * The end position of the matched text.
   */
  to: number;
  /**
   * Call this function to ignore the match. You probably want to call this
   * function when the user presses the `Escape` key.
   */
  ignoreMatch: () => void;
  /**
   * Call this function to delete the matched text. For example, in a slash
   * menu, you might want to delete the matched text first then do something
   * else when the user presses the `Enter` key.
   */
  deleteMatch: () => void;
}
/**
 * A callback that is called when the rule starts to match, and also on
 * subsequent updates while the rule continues to match.
 */
type MatchHandler = (options: MatchHandlerOptions) => void;
/**
 * Options for the {@link CanMatchPredicate} callback.
 */
interface CanMatchOptions {
  /**
   * The editor state.
   */
  state: EditorState;
}
/**
 * A predicate to determine if the rule can be applied in the current editor state.
 */
type CanMatchPredicate = (options: CanMatchOptions) => boolean;
/**
 * Options for creating an {@link AutocompleteRule}
 */
interface AutocompleteRuleOptions {
  /**
   * The regular expression to match against the text before the cursor. The
   * last match before the cursor is used.
   *
   * For a slash menu, you might use `/(?<!\S)\/(|\S.*)$/u`.
   * For a mention, you might use `/@\w*$/`
   */
  regex: RegExp;
  /**
   * A callback that is called when the rule starts to match, and also on
   * subsequent updates while the rule continues to match.
   */
  onEnter: MatchHandler;
  /**
   * A callback that is called when the rule stops matching.
   */
  onLeave?: VoidFunction;
  /**
   * A predicate to determine if the rule can be applied in the current editor
   * state. If not provided, it defaults to only allowing matches in empty
   * selections that are not inside a code block or code mark.
   */
  canMatch?: CanMatchPredicate;
}
/**
 * An autocomplete rule that can be used to create an autocomplete extension.
 *
 * @public
 */
declare class AutocompleteRule {
  /** @internal */
  readonly regex: RegExp;
  /** @internal */
  readonly onMatch: MatchHandler;
  /** @internal */
  readonly onLeave?: VoidFunction;
  /** @internal */
  readonly canMatch: (options: {
    state: EditorState;
  }) => boolean;
  constructor(options: AutocompleteRuleOptions);
}
//#endregion
//#region src/autocomplete/autocomplete.d.ts
declare function defineAutocomplete(rule: AutocompleteRule): Extension;
//#endregion
export { AutocompleteRule, type AutocompleteRuleOptions, type CanMatchOptions, type CanMatchPredicate, type MatchHandler, type MatchHandlerOptions, defineAutocomplete };
//# sourceMappingURL=prosekit-extensions-autocomplete.d.ts.map