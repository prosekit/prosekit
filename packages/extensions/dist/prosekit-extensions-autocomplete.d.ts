import { Extension } from "@prosekit/core";
import { EditorState } from "@prosekit/pm/state";

//#region src/autocomplete/autocomplete-rule.d.ts
type MatchHandler = (options: {
  state: EditorState;
  match: RegExpExecArray;
  from: number;
  to: number;
  ignoreMatch: () => void;
  deleteMatch: () => void;
}) => void;
declare class AutocompleteRule {
  readonly regex: RegExp;
  readonly onMatch: MatchHandler;
  readonly onLeave?: VoidFunction;
  readonly canMatch: (options: {
    state: EditorState;
  }) => boolean;
  constructor(options: {
    regex: RegExp;
    onEnter: MatchHandler;
    onLeave?: VoidFunction;
    canMatch?: (options: {
      state: EditorState;
    }) => boolean;
  });
} //#endregion
//#region src/autocomplete/autocomplete.d.ts
declare function defineAutocomplete(rule: AutocompleteRule): Extension;

//#endregion
export { AutocompleteRule, MatchHandler, defineAutocomplete };