import { EditorState } from "@prosekit/pm/state";
import { Extension, PlainExtension } from "@prosekit/core";
/**
 * Options for {@link defineSearchQuery}
 */
export interface SearchQueryOptions {
  /**
   * The search string (or regular expression).
   */
  search: string;
  /**
   * The replace text.
   */
  replace?: string;
  /**
   * Indicates whether the search is case-sensitive
   *
   * @default false
   */
  caseSensitive?: boolean;
  /**
   * By default, string search will replace `\n`, `\r`, and `\t` in the query
   * with newline, return, and tab characters. When this is set to true, that
   * behavior is disabled.
   *
   * @default false
   */
  literal?: boolean;
  /**
   * When true, the search string is interpreted as a regular expression.
   *
   * @default false
   */
  regexp?: boolean;
  /**
   * Enable whole-word matching.
   *
   * @default false
   */
  wholeWord?: boolean;
}
/**
 * Defines an extension that stores a current search query and replace string.
 * When called without options, it stores an empty query, which can be updated
 * later with the `setSearchQuery` command.
 */
export declare function defineSearchQuery(options?: SearchQueryOptions): PlainExtension;
/**
 * @internal
 */
export type SearchCommandsExtension = Extension<{
  Commands: {
    setSearchQuery: [options: SearchQueryOptions];
    findNext: [];
    findPrev: [];
    findNextNoWrap: [];
    findPrevNoWrap: [];
    replaceNext: [];
    replaceNextNoWrap: [];
    replaceCurrent: [];
    replaceAll: [];
  };
}>;
/**
 * Defines commands for search and replace.
 */
export declare function defineSearchCommands(): SearchCommandsExtension;
/**
 * The match count for the current search query, and the position of the match
 * that the selection sits on.
 */
export interface SearchStatus {
  /**
   * The total number of matches for the current search query.
   */
  total: number;
  /**
   * The one-based position of the match that the selection sits on, or 0 when
   * the selection is not on a match.
   */
  active: number;
}
/**
 * A function that receives the current search status.
 */
export type SearchStatusHandler = (status: SearchStatus) => void;
/**
 * Returns the current search status.
 */
export declare function getSearchStatus(state: EditorState): SearchStatus;
/**
 * Registers a handler that is called whenever the search status changes. It
 * can be used to render a match counter.
 */
export declare function defineSearchStatusHandler(handler: SearchStatusHandler): PlainExtension;
//# sourceMappingURL=search.d.ts.map