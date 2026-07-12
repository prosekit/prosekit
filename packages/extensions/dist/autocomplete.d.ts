import { EditorState, Transaction } from "@prosekit/pm/state";
import { Extension } from "@prosekit/core";
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
   * For a slash menu, you might use `/(?<!\S)\/(\S.*)?$/u`.
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
   * state. If not provided, it defaults to only allowing matches that are not
   * inside a code block or code mark.
   */
  canMatch?: CanMatchPredicate;
  /**
   * Whether the match should follow the text cursor when it moves without
   * editing. When enabled and a match is active, moving the cursor inside the
   * same text block (for example with arrow keys) re-runs the regex against
   * the text between the match start and the cursor: the query grows when the
   * cursor moves right over existing text and shrinks when it moves left. If
   * the text no longer matches, the match is closed, and typing can open it
   * again. Mouse clicks keep the default behavior.
   *
   * @default false
   */
  followCursor?: boolean;
}
/**
 * An autocomplete rule that can be used to create an autocomplete extension.
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
  /** @internal */
  readonly followCursor: boolean;
  constructor(options: AutocompleteRuleOptions);
}
/**
 * Defines an autocomplete extension that executes logic when the text before
 * the cursor matches the given regular expression.
 *
 * When a match is found, an inline decoration is applied to the matched text
 * with the class `prosekit-autocomplete-match` and a `data-autocomplete-match-text`
 * attribute containing the full matched string.
 */
declare function defineAutocomplete(rule: AutocompleteRule): Extension;
/**
 * Tags a transaction so that, when it is applied, autocomplete re-scans the text
 * before the cursor and opens the menu if a rule matches. Returns the same
 * transaction, so it can be chained.
 *
 * Autocomplete normally only opens while the user is typing. Use this to open a
 * slash, mention, or tag menu imperatively, for example after inserting the
 * trigger text in your own command, without dispatching a second transaction. It
 * is intended for an empty (cursor) selection.
 */
declare function triggerAutocomplete(tr: Transaction): Transaction;
export { AutocompleteRule, type AutocompleteRuleOptions, type CanMatchOptions, type CanMatchPredicate, type MatchHandler, type MatchHandlerOptions, defineAutocomplete, triggerAutocomplete };
//# sourceMappingURL=autocomplete.d.ts.map