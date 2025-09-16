import { Extension, PlainExtension } from "@prosekit/core";

//#region src/search/index.d.ts

/**
 * Options for {@link defineSearchQuery}
 *
 * @public
 */
interface SearchQueryOptions {
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
 *
 * @public
 */
declare function defineSearchQuery(options: SearchQueryOptions): PlainExtension;
/**
 * @internal
 */
type SearchCommandsExtension = Extension<{
  Commands: {
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
 *
 * @public
 */
declare function defineSearchCommands(): SearchCommandsExtension;
//#endregion
export { SearchCommandsExtension, SearchQueryOptions, defineSearchCommands, defineSearchQuery };
//# sourceMappingURL=prosekit-extensions-search.d.ts.map