import { Plugin, PluginKey } from "@prosekit/pm/state";
import { defineCommands, defineKeymap, defineNodeSpec, definePlugin, getNodeType, union } from "@prosekit/core";
import { Decoration, DecorationSet } from "@prosekit/pm/view";
import { Fragment, Slice } from "@prosekit/pm/model";
import { getId, once } from "@ocavue/utils";
import { HTMLElement, customElements } from "server-dom-shim";
const insertPageBreakCommand = (state, dispatch) => {
	if (!dispatch) return true;
	const { schema, tr } = state;
	const node = getNodeType(schema, "pageBreak").createChecked();
	const pos = tr.selection.anchor;
	const slice = new Slice(Fragment.from(node), 0, 0);
	tr.replaceRange(pos, pos, slice).scrollIntoView();
	dispatch(tr);
	return true;
};
/**
* @internal
*/
function insertPageBreak() {
	return insertPageBreakCommand;
}
/**
* @internal
*/
function definePageBreakCommands() {
	return defineCommands({ insertPageBreak });
}
/**
* @internal
*/
function definePageBreakKeymap() {
	return defineKeymap({ "Mod-Enter": insertPageBreak() });
}
/**
* @internal
*/
function definePageBreakSpec() {
	return defineNodeSpec({
		name: "pageBreak",
		group: "block",
		selectable: true,
		parseDOM: [{ tag: "div.prosekit-page-break" }],
		toDOM() {
			return [
				"div",
				{ class: "prosekit-horizontal-rule prosekit-page-break" },
				["hr"]
			];
		},
		pageBreak: true
	});
}
function definePageBreak() {
	return union(definePageBreakSpec(), definePageBreakCommands(), definePageBreakKeymap());
}
/**
* @internal
*/
const PAGE_CHUNK_TAG_NAME = "pm-page-chunk";
/**
* @internal
*/
function registerPageChunkElement() {
	if (typeof window === "undefined" || customElements.get("pm-page-chunk")) return;
	customElements.define(PAGE_CHUNK_TAG_NAME, PageChunkElement);
}
var PageChunkElement = class extends HTMLElement {
	static {
		this.observedAttributes = [
			"data-group",
			"data-break",
			"data-h",
			"data-mt",
			"data-mb",
			"data-size"
		];
	}
	#group = "";
	#forceNextBreak = false;
	#pageHeight = 0;
	#pageMarginTop = 0;
	#pageMarginBottom = 0;
	#size = void 0;
	#updateRequested = false;
	#contentBoxHeight = 0;
	#isHead = false;
	#isTail = false;
	#paddingTop = 0;
	#paddingBottom = 0;
	#isHeadPending = false;
	#isTailPending = false;
	#paddingTopPending = 0;
	#paddingBottomPending = 0;
	connectedCallback() {
		this.#parseDataAttributes();
		if (this.#isLeader()) this.#isHeadPending = true;
		this.#render();
		this.#contentBoxHeight = this.clientHeight - this.#paddingTop - this.#paddingBottom;
		observeElement(this);
		this.#requestUpdate();
	}
	disconnectedCallback() {
		unobserveElement(this);
	}
	attributeChangedCallback(_, oldValue, newValue) {
		if (oldValue === newValue) return;
		this.#parseDataAttributes();
		this.#requestUpdate();
	}
	#parseDataAttributes() {
		this.#group = this.getAttribute("data-group") || "";
		this.#forceNextBreak = this.hasAttribute("data-break");
		this.#pageHeight = this.#parseFloatAttribute("data-h");
		this.#pageMarginTop = this.#parseFloatAttribute("data-mt");
		this.#pageMarginBottom = this.#parseFloatAttribute("data-mb");
		const sizeAttr = this.getAttribute("data-size");
		this.#size = sizeAttr ? Number.parseInt(sizeAttr, 10) : void 0;
	}
	#parseFloatAttribute(name) {
		const value = this.getAttribute(name);
		return value != null ? Number.parseFloat(value) : 0;
	}
	#isLeader() {
		return this.#size != null;
	}
	#render() {
		if (this.#paddingTop !== this.#paddingTopPending || this.#paddingBottom !== this.#paddingBottomPending) Object.assign(this.style, {
			paddingTop: `${this.#paddingTop = this.#paddingTopPending}px`,
			paddingBottom: `${this.#paddingBottom = this.#paddingBottomPending}px`
		});
		if (this.#isHead !== this.#isHeadPending) this.toggleAttribute("data-page-head", this.#isHead = this.#isHeadPending);
		if (this.#isTail !== this.#isTailPending) this.toggleAttribute("data-page-tail", this.#isTail = this.#isTailPending);
	}
	setHeight(height) {
		if (Math.abs(this.#contentBoxHeight - height) < .1) return;
		this.#contentBoxHeight = height;
		this.#requestUpdate();
	}
	/**
	* Schedules a batched page layout recalculation.
	*
	* Any chunk can call this method, but the actual layout work (#updateAll)
	* always runs on the leader chunk, because it needs to iterate over every
	* chunk in order to compute page breaks.
	*
	* Two nested microtasks are used to batch updates:
	*
	*   Microtask 1 – Delegation: non-leader chunks forward the request to the
	*   leader chunk, so multiple chunks changing in the same tick only trigger
	*   one layout pass.
	*
	*   Microtask 2 – Execution: the leader chunk defers #updateAll to a second
	*   microtask so that any other attribute / resize changes that were queued
	*   in the same tick (and forwarded during microtask 1) are already reflected
	*   before the layout is recalculated.
	*
	* The #updateRequested flag acts as a deduplication guard so that rapid
	* successive calls (e.g. multiple attributes changing at once) result in at
	* most one scheduled pass per chunk.
	*/
	#requestUpdate() {
		if (this.#updateRequested) return;
		this.#updateRequested = true;
		queueMicrotask(() => {
			if (!this.#isLeader()) {
				this.#updateRequested = false;
				const leader = findLeaderChunk(this, this.#group);
				if (!leader) return;
				leader.#requestUpdate();
				return;
			}
			queueMicrotask(() => {
				this.#updateRequested = false;
				this.#updateAll();
			});
		});
	}
	#updateAll() {
		if (!this.isConnected) return;
		const elements = findAllChunks(this, this.#group);
		const count = elements.length;
		if (count === 0) return;
		const pageHeight = this.#pageHeight;
		const pageMarginTop = this.#pageMarginTop;
		const maxContentHeight = pageHeight - pageMarginTop - this.#pageMarginBottom;
		let currentContentHeight = 0;
		let forceNextBreak = false;
		for (let i = 0; i < count; i++) {
			const element = elements[i];
			const h = element.#contentBoxHeight;
			const isHead = forceNextBreak || i === 0 || currentContentHeight + h > maxContentHeight;
			forceNextBreak = element.#forceNextBreak;
			if (isHead && i > 0) {
				const prev = elements[i - 1];
				prev.#paddingBottomPending = Math.max(0, pageHeight - pageMarginTop - currentContentHeight);
				prev.#isTailPending = true;
				currentContentHeight = h;
			} else currentContentHeight += h;
			element.#paddingTopPending = isHead ? pageMarginTop : 0;
			element.#paddingBottomPending = 0;
			element.#isTailPending = false;
			element.#isHeadPending = isHead;
		}
		const last = elements[count - 1];
		last.#paddingBottomPending = Math.max(0, pageHeight - pageMarginTop - currentContentHeight);
		last.#isTailPending = true;
		for (const element of elements) element.#render();
	}
};
function handleResize(entries) {
	for (const entry of entries) {
		const contentBoxHeight = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
		entry.target.setHeight(contentBoxHeight);
	}
}
const getResizeObserver = /* @__PURE__ */ once(() => {
	return new ResizeObserver(handleResize);
});
function observeElement(element) {
	getResizeObserver().observe(element);
}
function unobserveElement(element) {
	getResizeObserver().unobserve(element);
}
function findLeaderChunk(element, group) {
	return element.closest(".ProseMirror")?.querySelector(`${PAGE_CHUNK_TAG_NAME}[data-group="${CSS.escape(group)}"][data-size]`);
}
function findAllChunks(element, group) {
	const elements = element.closest(".ProseMirror")?.querySelectorAll(`${PAGE_CHUNK_TAG_NAME}[data-group="${CSS.escape(group)}"]`);
	return Array.from(elements || []);
}
function definePageRendering(options = {}) {
	return definePlugin(createPageRenderingPlugin(options));
}
function createPageRenderingPlugin(options) {
	const { pageWidth = 794, pageHeight = 1123, marginTop = 70, marginRight = 70, marginBottom = 70, marginLeft = 70 } = options;
	const key = new PluginKey("prosekit-page-render");
	function createDecorationSet(doc, group) {
		const decorations = [];
		const totalCount = doc.childCount;
		doc.forEach((node, pos, index) => {
			const isPageBreak = node.type.spec.pageBreak;
			decorations.push(Decoration.node(pos, pos + node.nodeSize, {
				"nodeName": PAGE_CHUNK_TAG_NAME,
				"data-group": group,
				"data-break": isPageBreak ? "true" : void 0,
				"data-h": String(pageHeight),
				"data-mt": String(marginTop),
				"data-mb": String(marginBottom),
				"data-size": index === 0 ? String(totalCount) : void 0
			}));
		});
		return DecorationSet.create(doc, decorations);
	}
	return new Plugin({
		key,
		view: () => {
			registerPageChunkElement();
			return {};
		},
		state: {
			init: (_config, state) => {
				const group = `page-group-${getId()}`;
				return [group, createDecorationSet(state.doc, group)];
			},
			apply: (tr, value, oldState, newState) => {
				if (!tr.docChanged) return value;
				const [group, decoration] = value;
				let needRecreate = oldState.doc.childCount !== newState.doc.childCount;
				if (!needRecreate) {
					const count = oldState.doc.childCount;
					for (let i = 0; i < count; i++) {
						const oldNode = oldState.doc.child(i);
						const newNode = newState.doc.child(i);
						if (oldNode.type !== newNode.type) {
							needRecreate = true;
							break;
						}
					}
				}
				if (!needRecreate) {
					const mapped = decoration.map(tr.mapping, tr.doc, { onRemove: () => {
						needRecreate = true;
					} });
					if (!needRecreate) return [group, mapped];
				}
				return [group, createDecorationSet(newState.doc, group)];
			}
		},
		props: {
			decorations: (state) => {
				return key.getState(state)?.[1];
			},
			attributes: { style: [
				`--page-margin-right:${marginRight}px;`,
				`--page-margin-left:${marginLeft}px;`,
				`--page-width:${pageWidth}px;`,
				`--page-height:${pageHeight}px;`
			].join("") }
		}
	});
}
export { definePageBreak, definePageBreakCommands, definePageBreakKeymap, definePageBreakSpec, definePageRendering, insertPageBreak };

//# sourceMappingURL=page.js.map