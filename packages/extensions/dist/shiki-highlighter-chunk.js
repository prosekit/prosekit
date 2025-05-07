import { createHighlighter } from "shiki/bundle/full";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

//#region src/code-block/shiki-highlighter-chunk.ts
let highlighter;
const loadedLangs = new Set();
const loadedThemes = new Set();
async function createAndCacheHighlighter({ ...options }) {
	if (!highlighter) {
		if (!options.engine) {
			const engine = createJavaScriptRegexEngine({ forgiving: true });
			options.engine = engine;
		}
		highlighter = await createHighlighter(options);
	}
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
	if (!highlighter) return { promise: createAndCacheHighlighter(options) };
	const langs = options.langs.filter((lang) => !loadedLangs.has(lang));
	if (langs.length > 0) return { promise: loadLanguages(langs) };
	const themes = options.themes.filter((theme) => !loadedThemes.has(theme));
	if (themes.length > 0) return { promise: loadThemes(themes) };
	return { highlighter };
}

//#endregion
export { createOrGetHighlighter };