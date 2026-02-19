import { defineTextBlockInputRule } from "./prosekit-extensions-input-rule.js";
import { defineTextBlockEnterRule } from "./prosekit-extensions-enter-rule.js";
import { defaultBlockAt, defineCommands, defineKeymap, defineNodeSpec, definePlugin, insertNode, setBlockType, setNodeAttrs, toggleNode, union } from "@prosekit/core";
import { TextSelection } from "@prosekit/pm/state";
import { createHighlightPlugin } from "prosemirror-highlight";
import { createParser } from "prosemirror-highlight/shiki";
import { bundledLanguagesInfo as shikiBundledLanguagesInfo, bundledThemesInfo as shikiBundledThemesInfo } from "shiki";

//#region src/code-block/code-block-commands.ts
/**
* Adds commands for working with `codeBlock` nodes.
*
* @public
*/
function defineCodeBlockCommands() {
	return defineCommands({
		setCodeBlock: (attrs) => {
			return setBlockType({
				type: "codeBlock",
				attrs
			});
		},
		insertCodeBlock: (attrs) => {
			return insertNode({
				type: "codeBlock",
				attrs
			});
		},
		toggleCodeBlock: (attrs) => {
			return toggleNode({
				type: "codeBlock",
				attrs
			});
		},
		setCodeBlockAttrs: (attrs) => {
			return setNodeAttrs({
				type: "codeBlock",
				attrs
			});
		}
	});
}

//#endregion
//#region src/code-block/code-block-input-rule.ts
/**
* Adds input rules for `codeBlock` nodes.
*
* @public
*/
function defineCodeBlockInputRule() {
	return defineTextBlockInputRule({
		regex: /^```(\S*)\s$/,
		type: "codeBlock",
		attrs: getAttrs
	});
}
/**
* Adds enter rules for `codeBlock` nodes.
*
* @public
*/
function defineCodeBlockEnterRule() {
	return defineTextBlockEnterRule({
		regex: /^```(\S*)$/,
		type: "codeBlock",
		attrs: getAttrs
	});
}
function getAttrs(match) {
	return { language: match[1] || "" };
}

//#endregion
//#region src/code-block/code-block-keymap.ts
/**
* Defines the keymap for code blocks.
*/
function defineCodeBlockKeymap() {
	return defineKeymap({ Enter: existCodeBlock });
}
/**
* Exit a code block and insert a default block below if the cursor is at the
* end of the code block and the code block is ended with two new lines.
*/
const existCodeBlock = (state, dispatch) => {
	if (!state.selection.empty) return false;
	const { $head } = state.selection;
	const parent = $head.parent;
	if (parent.isTextblock && parent.type.spec.code && $head.parentOffset === parent.content.size && parent.textContent.endsWith("\n\n")) {
		const grandParent = $head.node(-1);
		const insertIndex = $head.indexAfter(-1);
		const type = defaultBlockAt(grandParent.contentMatchAt(insertIndex));
		if (!type || !grandParent.canReplaceWith(insertIndex, insertIndex, type)) return false;
		if (dispatch) {
			const { tr } = state;
			tr.delete($head.pos - 2, $head.pos);
			const pos = tr.selection.$head.after();
			const node = type.createAndFill();
			if (node) {
				tr.replaceWith(pos, pos, node);
				tr.setSelection(TextSelection.near(tr.doc.resolve(pos), 1));
				dispatch(tr.scrollIntoView());
			}
		}
		return true;
	}
	return false;
};

//#endregion
//#region src/code-block/code-block-spec.ts
/**
* Defines the `codeBlock` node spec.
*
* @public
*/
function defineCodeBlockSpec() {
	return defineNodeSpec({
		name: "codeBlock",
		content: "text*",
		group: "block",
		code: true,
		defining: true,
		marks: "",
		attrs: { language: {
			default: "",
			validate: "string"
		} },
		parseDOM: [{
			tag: "pre",
			preserveWhitespace: "full",
			getAttrs: (node) => {
				return { language: extractLanguageFromElement(node) || extractLanguageFromElement(node.querySelector("code")) };
			}
		}],
		toDOM(node) {
			const { language } = node.attrs;
			return [
				"pre",
				{ "data-language": language || void 0 },
				[
					"code",
					{ class: language ? `language-${language}` : void 0 },
					0
				]
			];
		}
	});
}
function extractLanguageFromElement(element) {
	if (!element) return "";
	const attr = element.getAttribute("data-language");
	if (attr) return attr;
	const match = element.className.match(/language-(\w+)/);
	if (match) return match[1];
	return "";
}

//#endregion
//#region src/code-block/code-block.ts
/**
* Adds `codeBlock` nodes to the editor. This includes the following extensions:
*
* - {@link defineCodeBlockSpec}
* - {@link defineCodeBlockInputRule}
* - {@link defineCodeBlockEnterRule}
* - {@link defineCodeBlockKeymap}
* - {@link defineCodeBlockCommands}.
*
* @public
*/
function defineCodeBlock() {
	return union(defineCodeBlockSpec(), defineCodeBlockInputRule(), defineCodeBlockEnterRule(), defineCodeBlockKeymap(), defineCodeBlockCommands());
}

//#endregion
//#region src/code-block/code-block-highlight.ts
/**
* Adds syntax highlighting to code blocks. This function requires a `Parser`
* instance from the `prosemirror-highlight` package. See the
* [documentation](https://github.com/ocavue/prosemirror-highlight) for more
* information.
*
* @param options
*
* @public
*/
function defineCodeBlockHighlight({ parser, nodeTypes = ["codeBlock", "mathBlock"] }) {
	return definePlugin(createHighlightPlugin({
		parser,
		nodeTypes
	}));
}

//#endregion
//#region src/code-block/shiki-highlighter.ts
let loaded;
async function load() {
	const { createOrGetHighlighter } = await import("./shiki-highlighter-chunk.js");
	loaded = createOrGetHighlighter;
}
function createOrGetHighlighter(options) {
	if (!loaded) return { promise: load() };
	return loaded(options);
}

//#endregion
//#region src/code-block/shiki-parser.ts
/**
* @internal
*/
function createLazyParser(highlighterOptions) {
	let parser;
	return function lazyParser(options) {
		const language = options.language || "";
		const { highlighter, promise } = createOrGetHighlighter({
			...highlighterOptions,
			langs: [language]
		});
		if (!highlighter) return promise;
		if (!parser) parser = createParser(highlighter, { theme: highlighterOptions.themes[0] });
		return parser(options);
	};
}

//#endregion
//#region src/code-block/code-block-shiki.ts
/**
* Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.
*
* It will set two CSS variables on the code block elements:
*
* - `--prosemirror-highlight`: sets text color
* - `--prosemirror-highlight-bg`: sets background color
*
* @param options - The options to configure the Shiki highlighter.
*
* @public
*/
function defineCodeBlockShiki({ nodeTypes, themes = ["one-dark-pro"], langs = ["text"], ...rest } = {}) {
	return defineCodeBlockHighlight({
		parser: createLazyParser({
			themes,
			langs,
			...rest
		}),
		nodeTypes
	});
}

//#endregion
export { defineCodeBlock, defineCodeBlockCommands, defineCodeBlockEnterRule, defineCodeBlockHighlight, defineCodeBlockInputRule, defineCodeBlockKeymap, defineCodeBlockShiki, defineCodeBlockSpec, shikiBundledLanguagesInfo, shikiBundledThemesInfo };
//# sourceMappingURL=prosekit-extensions-code-block.js.map