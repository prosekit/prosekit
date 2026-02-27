import { createHighlighter } from "shiki/bundle/full";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

//#region src/code-block/shiki-highlighter-chunk.ts
let highlighterPromise;
let highlighter;
const loadedLangs = /* @__PURE__ */ new Set();
const loadedThemes = /* @__PURE__ */ new Set();
function ensureHighlighter({ ...options }) {
	if (!highlighterPromise) {
		if (!options.engine) options.engine = createJavaScriptRegexEngine({ forgiving: true });
		highlighterPromise = createHighlighter(options).then((createdHighlighter) => {
			highlighter = createdHighlighter;
		});
	}
	return highlighterPromise;
}
async function loadLanguages(langs) {
	for (const lang of langs) {
		if (!highlighter) break;
		await highlighter.loadLanguage(lang);
		loadedLangs.add(lang);
	}
}
async function loadThemes(themes) {
	for (const theme of themes) {
		if (!highlighter) break;
		await highlighter.loadTheme(theme);
		loadedThemes.add(theme);
	}
}
function createOrGetHighlighter(options) {
	if (!highlighter) return { promise: ensureHighlighter(options) };
	const langs = options.langs.filter((lang) => !loadedLangs.has(lang));
	if (langs.length > 0) return { promise: loadLanguages(langs) };
	const themes = options.themes.filter((theme) => !loadedThemes.has(theme));
	if (themes.length > 0) return { promise: loadThemes(themes) };
	return { highlighter };
}

//#endregion
export { createOrGetHighlighter };
//# sourceMappingURL=shiki-highlighter-chunk-DZtAQyWR.js.map