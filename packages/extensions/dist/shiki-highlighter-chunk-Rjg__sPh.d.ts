import { BundledHighlighterOptions, BundledLanguage, BundledTheme, Highlighter, SpecialLanguage } from "shiki";

//#region src/code-block/shiki-highlighter-chunk.d.ts
interface ShikiHighlighterOptions extends BundledHighlighterOptions<BundledLanguage, BundledTheme> {}
interface HighlighterOptions extends Omit<ShikiHighlighterOptions, 'langs' | 'themes'> {
  themes: BundledTheme[];
  langs: (BundledLanguage | SpecialLanguage)[];
}
type HighlighterResult = {
  highlighter: Highlighter;
  promise?: undefined;
} | {
  highlighter?: undefined;
  promise: Promise<void>;
};
declare function createOrGetHighlighter(options: HighlighterOptions): HighlighterResult;
//#endregion
export { createOrGetHighlighter as i, HighlighterResult as n, ShikiHighlighterOptions as r, HighlighterOptions as t };
//# sourceMappingURL=shiki-highlighter-chunk-Rjg__sPh.d.ts.map