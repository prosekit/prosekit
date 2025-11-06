import { AllSelection, EditorState, NodeSelection, Selection, TextSelection } from "@prosekit/pm/state";
import { DOMParser, DOMSerializer, Fragment, Mark, ProseMirrorNode, Schema, Slice } from "@prosekit/pm/model";
import { EditorView } from "@prosekit/pm/view";
import { isElementLike } from "@ocavue/utils";
import OrderedMap from "orderedmap";
import mapValues from "just-map-values";

//#region src/error.ts
/**
* Base class for all ProseKit errors.
*
* @internal
*/
var ProseKitError = class extends Error {};
/**
* @internal
*/
var EditorNotFoundError = class extends ProseKitError {
	constructor() {
		super("Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.");
	}
};
/**
* @internal
*/
var DOMDocumentNotFoundError = class extends ProseKitError {
	constructor() {
		super("Unable to find browser Document. When not in the browser environment, you need to pass a DOM Document.");
	}
};

//#endregion
//#region src/utils/get-mark-type.ts
/**
* @internal
*/
function getMarkType(schema, type) {
	if (typeof type === "string") {
		const markType = schema.marks[type];
		if (!markType) throw new ProseKitError(`Cannot find mark type "${type}"`);
		return markType;
	}
	return type;
}

//#endregion
//#region src/utils/assert.ts
/**
* @internal
*/
function assert(condition, message = "Assertion failed") {
	if (!condition) throw new ProseKitError(message);
}

//#endregion
//#region src/utils/get-node-type.ts
/**
* @internal
*/
function getNodeType(schema, type) {
	if (typeof type === "string") {
		const nodeType = schema.nodes[type];
		if (!nodeType) throw new ProseKitError(`Cannot find ProseMirror node type "${type}"`);
		return nodeType;
	}
	return type;
}

//#endregion
//#region src/utils/attrs-match.ts
function attrsMatch(nodeOrMark, attrs) {
	const currentAttrs = nodeOrMark.attrs;
	for (const [key, value] of Object.entries(attrs)) if (currentAttrs[key] !== value) return false;
	return true;
}

//#endregion
//#region src/utils/is-node-active.ts
function isNodeActive(state, type, attrs) {
	const $pos = state.selection.$from;
	const nodeType = getNodeType(state.schema, type);
	for (let depth = $pos.depth; depth >= 0; depth--) {
		const node = $pos.node(depth);
		if (node.type === nodeType && (!attrs || attrsMatch(node, attrs))) return true;
	}
	return false;
}

//#endregion
//#region src/types/priority.ts
/**
* ProseKit extension priority.
*
* @public
*/
let Priority = /* @__PURE__ */ function(Priority$1) {
	Priority$1[Priority$1["lowest"] = 0] = "lowest";
	Priority$1[Priority$1["low"] = 1] = "low";
	Priority$1[Priority$1["default"] = 2] = "default";
	Priority$1[Priority$1["high"] = 3] = "high";
	Priority$1[Priority$1["highest"] = 4] = "highest";
	return Priority$1;
}({});

//#endregion
//#region src/facets/facet.ts
let facetCount = 0;
/**
* @internal
*/
var Facet = class {
	/**
	* @internal
	*/
	constructor(parent, singleton, _reducer, _reduce) {
		this._reducer = _reducer;
		this._reduce = _reduce;
		this.index = facetCount++;
		assert((_reduce || _reducer) && !(_reduce && _reducer));
		this.parent = parent;
		this.singleton = singleton;
		this.path = parent ? [...parent.path, this.index] : [];
	}
	get reducer() {
		return this._reducer ?? this._reduce?.();
	}
};
/**
* @internal
*/
function defineFacet(options) {
	return new Facet(options.parent, options.singleton ?? false, options.reducer, options.reduce);
}

//#endregion
//#region src/facets/root.ts
function rootReducer(inputs) {
	let schema;
	let commands;
	let stateFunc;
	let view;
	for (const input of inputs) {
		schema = input.schema || schema;
		commands = input.commands || commands;
		stateFunc = input.state || stateFunc;
		view = input.view || view;
	}
	const state = schema && (stateFunc?.({ schema }) ?? { schema });
	return {
		schema,
		state,
		commands,
		view
	};
}
const rootFacet = new Facet(null, true, rootReducer);

//#endregion
//#region src/facets/schema.ts
const schemaFacet = defineFacet({
	reducer: (specs) => {
		assert(specs.length <= 1);
		const spec = specs[0];
		return { schema: spec ? new Schema(spec) : null };
	},
	parent: rootFacet,
	singleton: true
});

//#endregion
//#region src/facets/base-extension.ts
/**
* @internal
*/
var BaseExtension = class {
	constructor() {
		this.trees = [
			null,
			null,
			null,
			null,
			null
		];
	}
	/**
	* @internal
	*/
	getTree(priority) {
		const pri = priority ?? this.priority ?? Priority.default;
		return this.trees[pri] ||= this.createTree(pri);
	}
	/**
	* @internal
	*/
	findFacetOutput(facet) {
		let node = this.getTree();
		for (const index of facet.path) node = node?.children.get(index);
		return node?.getOutput() ?? null;
	}
	get schema() {
		return this.findFacetOutput(schemaFacet)?.find(Boolean)?.schema ?? null;
	}
};

//#endregion
//#region src/utils/array.ts
function uniqPush(prev, next) {
	const result = [...prev];
	for (const item of next) if (!result.includes(item)) result.push(item);
	return result;
}
/**
* @internal
*/
function arraySubtract(a, b) {
	return a.filter((x) => !b.includes(x));
}
function toReversed(arr) {
	return arr.toReversed?.() ?? [...arr].reverse();
}

//#endregion
//#region src/utils/type-assertion.ts
/**
* Checks if the given object is a {@link ProseMirrorNode} instance.
*/
function isProseMirrorNode(value) {
	return value instanceof ProseMirrorNode;
}
/**
* Checks if the given object is a {@link Mark} instance.
*
* @public
*/
function isMark(value) {
	return value instanceof Mark;
}
/**
* Checks if the given object is a {@link Fragment} instance.
*
* @public
*/
function isFragment(value) {
	return value instanceof Fragment;
}
/**
* Checks if the given object is a {@link Slice} instance.
*
* @public
*/
function isSlice(value) {
	return value instanceof Slice;
}
/**
* Checks if the given object is a {@link Selection} instance.
*
* @public
*/
function isSelection(value) {
	return value instanceof Selection;
}
/**
* Checks if the given object is a {@link TextSelection} instance.
*
* @public
*/
function isTextSelection(value) {
	return value instanceof TextSelection;
}
/**
* Checks if the given object is a {@link NodeSelection} instance.
*
* @public
*/
function isNodeSelection(value) {
	return value instanceof NodeSelection;
}
/**
* Checks if the given object is a {@link AllSelection} instance.
*
* @public
*/
function isAllSelection(value) {
	return value instanceof AllSelection;
}
/**
* @internal
*/
function isNotNullish(value) {
	return value != null;
}

//#endregion
//#region src/facets/facet-node.ts
function zip5(a, b, mapper) {
	return [
		mapper(a[0], b[0]),
		mapper(a[1], b[1]),
		mapper(a[2], b[2]),
		mapper(a[3], b[3]),
		mapper(a[4], b[4])
	];
}
function unionInput(a, b) {
	if (!a && !b) return null;
	return uniqPush(a ?? [], b ?? []);
}
function subtractInput(a, b) {
	if (!a) return null;
	if (!b) return [...a];
	return arraySubtract(a, b);
}
function unionChildren(a, b) {
	const merged = new Map(a);
	for (const [key, valueB] of b.entries()) {
		const valueA = a.get(key);
		merged.set(key, valueA ? unionFacetNode(valueA, valueB) : valueB);
	}
	return merged;
}
function subtractChildren(a, b) {
	const merged = new Map(a);
	for (const [key, valueB] of b.entries()) {
		const valueA = a.get(key);
		if (valueA) merged.set(key, subtractFacetNode(valueA, valueB));
	}
	return merged;
}
/**
* Takes two facet nodes and returns a new facet node containing inputs and
* children from both nodes.
*
* The reducers of the first facet node will be reused.
*
* @internal
*/
function unionFacetNode(a, b) {
	assert(a.facet === b.facet);
	return new FacetNode(a.facet, zip5(a.inputs, b.inputs, unionInput), unionChildren(a.children, b.children), a.reducers);
}
/**
* Takes two facet nodes and returns a new facet node containing inputs and
* children from the first node but not the second.
*
* The reducers of the first facet node will be reused.
*
* @internal
*/
function subtractFacetNode(a, b) {
	assert(a.facet === b.facet);
	return new FacetNode(a.facet, zip5(a.inputs, b.inputs, subtractInput), subtractChildren(a.children, b.children), a.reducers);
}
var FacetNode = class {
	constructor(facet, inputs = [
		null,
		null,
		null,
		null,
		null
	], children = /* @__PURE__ */ new Map(), reducers = [
		null,
		null,
		null,
		null,
		null
	]) {
		this.facet = facet;
		this.inputs = inputs;
		this.children = children;
		this.reducers = reducers;
		this.output = null;
	}
	calcOutput() {
		const inputs = [
			null,
			null,
			null,
			null,
			null
		];
		const output = [
			null,
			null,
			null,
			null,
			null
		];
		for (let pri = 0; pri < 5; pri++) {
			const input = this.inputs[pri];
			if (input) inputs[pri] = [...input];
		}
		for (const child of this.children.values()) {
			const childOutput = child.getOutput();
			for (let pri = 0; pri < 5; pri++) if (childOutput[pri]) (inputs[pri] ||= []).push(childOutput[pri]);
		}
		if (this.facet.singleton) {
			const reducer = this.reducers[Priority.default] ||= this.facet.reducer;
			const input = inputs.filter(isNotNullish).flat();
			output[Priority.default] = reducer(input);
		} else for (let pri = 0; pri < 5; pri++) {
			const input = inputs[pri];
			if (input) output[pri] = (this.reducers[pri] ||= this.facet.reducer)(input);
		}
		return output;
	}
	getOutput() {
		if (!this.output) this.output = this.calcOutput();
		return this.output;
	}
	getSingletonOutput() {
		assert(this.facet.singleton);
		return this.getOutput()[Priority.default];
	}
	getRootOutput() {
		assert(this.isRoot());
		const output = this.getSingletonOutput();
		assert(output);
		return output;
	}
	isRoot() {
		return !this.facet.parent;
	}
};

//#endregion
//#region src/facets/facet-extension.ts
/**
* @internal
*/
var FacetExtensionImpl = class extends BaseExtension {
	/**
	* @internal
	*/
	constructor(facet, payloads) {
		super();
		this.facet = facet;
		this.payloads = payloads;
	}
	/**
	* @internal
	*/
	createTree(priority) {
		const pri = this.priority ?? priority;
		const inputs = [
			null,
			null,
			null,
			null,
			null
		];
		inputs[pri] = [...this.payloads];
		let node = new FacetNode(this.facet, inputs);
		while (node.facet.parent) {
			const children = new Map([[node.facet.index, node]]);
			node = new FacetNode(node.facet.parent, void 0, children);
		}
		return node;
	}
};
/**
* @internal
*/
function defineFacetPayload(facet, payloads) {
	return new FacetExtensionImpl(facet, payloads);
}

//#endregion
//#region src/facets/state.ts
const stateFacet = defineFacet({
	reduce: () => {
		let callbacks = [];
		const state = (ctx) => {
			const configs = callbacks.map((cb) => cb(ctx));
			const config = {
				schema: ctx.schema,
				storedMarks: [],
				plugins: []
			};
			for (const c of configs) {
				config.schema = config.schema ?? c.schema;
				config.doc = config.doc ?? c.doc;
				config.selection = config.selection ?? c.selection;
				config.storedMarks = [...config.storedMarks, ...c.storedMarks ?? []];
				config.plugins = uniqPush(config.plugins ?? [], c.plugins ?? []);
			}
			assert(config.doc || config.schema, "Can't create state without a schema nor a document");
			if (config.doc) config.schema = void 0;
			return config;
		};
		return function reducer(inputs) {
			callbacks = inputs;
			return { state };
		};
	},
	singleton: true,
	parent: rootFacet
});

//#endregion
//#region src/utils/get-dom-api.ts
function findGlobalBrowserDocument() {
	if (typeof document !== "undefined") return document;
	if (typeof globalThis !== "undefined" && globalThis.document) return globalThis.document;
}
function findGlobalBrowserWindow() {
	if (typeof window !== "undefined") return window;
	if (typeof globalThis !== "undefined" && globalThis.window) return globalThis.window;
}
function findBrowserDocument(options) {
	return options?.document ?? findGlobalBrowserDocument() ?? findGlobalBrowserWindow()?.document;
}
function findBrowserWindow(options) {
	return options?.document?.defaultView ?? findGlobalBrowserWindow() ?? findBrowserDocument(options)?.defaultView ?? void 0;
}
function getBrowserDocument(options) {
	const doc = findBrowserDocument(options);
	if (doc) return doc;
	throw new DOMDocumentNotFoundError();
}
function getBrowserWindow(options) {
	const win = findBrowserWindow(options);
	if (win) return win;
	throw new DOMDocumentNotFoundError();
}

//#endregion
//#region src/utils/parse.ts
/**
* Return a JSON object representing this state.
*
* @public
*
* @example
*
* ```ts
* const state = editor.state
* const json = jsonFromState(state)
* ```
*/
function jsonFromState(state) {
	return state.toJSON();
}
/**
* Parse a JSON object to a ProseMirror state.
*
* @public
*
* @example
*
* ```ts
* const json = { state: { type: 'doc', content: [{ type: 'paragraph' }], selection: { type: 'text', from: 1, to: 1 } } }
* const state = stateFromJSON(json, { schema: editor.schema })
* ```
*/
function stateFromJSON(json, options) {
	return EditorState.fromJSON({ schema: options.schema }, json);
}
/**
* Return a JSON object representing this node.
*
* @public
*
* @example
*
* ```ts
* const node = editor.state.doc
* const json = jsonFromNode(node)
* ```
*/
function jsonFromNode(node) {
	return node.toJSON();
}
/**
* Parse a JSON object to a ProseMirror node.
*
* @public
*
* @example
*
* ```ts
* const json = { type: 'doc', content: [{ type: 'paragraph' }] }
* const node = nodeFromJSON(json, { schema: editor.schema })
* ```
*/
function nodeFromJSON(json, options) {
	return options.schema.nodeFromJSON(json);
}
/**
* Parse a HTML element to a ProseMirror node.
*
* @public
*
* @example
*
* ```ts
* const element = document.getElementById('content')
* const node = nodeFromElement(element, { schema: editor.schema })
* ```
*/
function nodeFromElement(element, options) {
	const { DOMParser: CustomDOMParser, schema,...parseOptions } = options;
	return (CustomDOMParser || DOMParser).fromSchema(schema).parse(element, parseOptions);
}
/**
* Serialize a ProseMirror node to a HTML element.
*
* @public
*
* @example
*
* ```ts
* const node = editor.state.doc
* const element = elementFromNode(node)
* ```
*/
function elementFromNode(node, options) {
	const Serializer = options?.DOMSerializer || DOMSerializer;
	const document$1 = getBrowserDocument(options);
	const schema = node.type.schema;
	const serializer = Serializer.fromSchema(schema);
	if (schema.topNodeType !== node.type) return serializer.serializeNode(node, { document: document$1 });
	else return serializer.serializeFragment(node.content, { document: document$1 }, document$1.createElement("div"));
}
/**
* Parse a HTML string to a HTML element.
*
* @internal
*/
function elementFromHTML(html, options) {
	return new (getBrowserWindow(options)).DOMParser().parseFromString(`<body><div>${html}</div></body>`, "text/html").body.firstElementChild;
}
/**
* @internal
*/
function htmlFromElement(element) {
	return element.outerHTML;
}
/**
* Parse a HTML string to a ProseMirror node.
*
* @public
*
* @example
*
* ```ts
* const html = '<p>Hello, world!</p>'
* const node = nodeFromHTML(html, { schema: editor.schema })
* ```
*/
function nodeFromHTML(html, options) {
	return nodeFromElement(elementFromHTML(html, options), options);
}
/**
* Serialize a ProseMirror node to a HTML string
*
* @public
*
* @example
*
* ```ts
* const node = document.getElementById('content')
* const html = htmlFromNode(node)
* ```
*/
function htmlFromNode(node, options) {
	return elementFromNode(node, options).outerHTML;
}
/**
* Serialize a HTML element to a ProseMirror document JSON object.
*
* @public
*
* @example
*
* ```ts
* const element = document.getElementById('content')
* const json = jsonFromElement(element, { schema: editor.schema })
* ```
*/
function jsonFromElement(element, options) {
	return jsonFromNode(nodeFromElement(element, options));
}
/**
* Parse a ProseMirror document JSON object to a HTML element.
*
* @public
*
* @example
*
* ```ts
* const json = { type: 'doc', content: [{ type: 'paragraph' }] }
* const element = elementFromJSON(json, { schema: editor.schema })
* ```
*/
function elementFromJSON(json, options) {
	return elementFromNode(nodeFromJSON(json, options), options);
}
/**
* Parse a HTML string to a ProseMirror document JSON object.
*
* @public
*
* @example
*
* ```ts
* const html = '<p>Hello, world!</p>'
* const json = jsonFromHTML(html, { schema: editor.schema })
* ```
*/
function jsonFromHTML(html, options) {
	return jsonFromElement(elementFromHTML(html, options), options);
}
/**
* Parse a ProseMirror document JSON object to a HTML string.
*
* @public
*
* @example
*
* ```ts
* const json = { type: 'doc', content: [{ type: 'paragraph' }] }
* const html = htmlFromJSON(json, { schema: editor.schema })
* ```
*/
function htmlFromJSON(json, options) {
	return htmlFromElement(elementFromJSON(json, options));
}

//#endregion
//#region src/utils/editor-content.ts
function getEditorContentJSON(schema, content) {
	if (typeof content === "string") return jsonFromHTML(content, { schema });
	else if (isElementLike(content)) return jsonFromElement(content, { schema });
	else return content;
}
function getEditorContentNode(schema, content) {
	if (isProseMirrorNode(content)) return content;
	return schema.nodeFromJSON(getEditorContentJSON(schema, content));
}
function getEditorContentDoc(schema, content) {
	const doc = getEditorContentNode(schema, content);
	assert(doc.type.schema === schema, "Document schema does not match editor schema");
	assert(doc.type === schema.topNodeType, `Document type does not match editor top node type. Expected ${schema.topNodeType.name}, got ${doc.type.name}`);
	return doc;
}
function getEditorSelection(doc, selection) {
	if (isSelection(selection)) {
		assert(selection.$head.doc === doc, "Selection and doc do not match");
		return selection;
	}
	if (selection === "start") return Selection.atStart(doc);
	if (selection === "end") return Selection.atEnd(doc);
	return Selection.fromJSON(doc, selection);
}

//#endregion
//#region src/extensions/default-state.ts
/**
* Define a default state for the editor.
*
* @param options
*
* @public
*/
function defineDefaultState({ defaultSelection, defaultContent, defaultDoc, defaultHTML }) {
	const defaultDocContent = defaultContent || defaultDoc || defaultHTML;
	return defineFacetPayload(stateFacet, [({ schema }) => {
		const config = {};
		if (defaultDocContent) {
			const json = getEditorContentJSON(schema, defaultDocContent);
			config.doc = schema.nodeFromJSON(json);
			if (defaultSelection) config.selection = Selection.fromJSON(config.doc, defaultSelection);
		}
		return config;
	}]);
}

//#endregion
//#region src/utils/deep-equals.ts
function deepEquals(a, b) {
	if (a === b) return true;
	if (!a || !b) return false;
	if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => deepEquals(x, b[i]));
	if (a instanceof OrderedMap && b instanceof OrderedMap) return a.size === b.size && deepEquals(a.toObject(), b.toObject());
	if (typeof a === "object" && typeof b === "object") {
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);
		return aKeys.length === bKeys.length && aKeys.every((key) => deepEquals(a[key], b[key]));
	}
	return false;
}

//#endregion
//#region src/utils/is-subset.ts
/**
* Check if `subset` is a subset of `superset`.
*
* @internal
*/
function isSubset(subset, superset) {
	return Object.keys(subset).every((key) => subset[key] === superset[key]);
}

//#endregion
//#region src/utils/includes-mark.ts
function includesMark(marks, markType, attrs) {
	attrs = attrs || {};
	return marks.some((mark) => {
		return mark.type === markType && isSubset(attrs, mark.attrs);
	});
}

//#endregion
//#region src/utils/is-mark-absent.ts
/**
* Returns true if the given mark is missing in some part of the range.
* Returns false if the entire range has the given mark.
* Returns true if the mark is not allowed in the range.
*
* @internal
*/
function isMarkAbsent(node, from, to, markType, attrs) {
	let missing = false;
	let available = false;
	node.nodesBetween(from, to, (node$1, pos, parent) => {
		if (missing) return false;
		if (parent?.type.allowsMarkType(markType) && !node$1.marks.some((m) => m.type !== markType && m.type.excludes(markType))) {
			available = true;
			if (!includesMark(node$1.marks, markType, attrs)) missing = true;
		}
	});
	return available ? missing : true;
}

//#endregion
//#region src/utils/is-mark-active.ts
/**
* @internal
*/
function isMarkActive(state, type, attrs) {
	const { from, $from, to, empty } = state.selection;
	const markType = getMarkType(state.schema, type);
	if (empty) return includesMark(state.storedMarks || $from.marks(), markType, attrs);
	else return !isMarkAbsent(state.doc, from, to, markType, attrs);
}

//#endregion
//#region src/editor/action.ts
/**
* @internal
*/
function createNodeActions(schema, getState, createNode = defaultCreateNode) {
	return mapValues(schema.nodes, (type) => createNodeAction(type, getState, createNode));
}
function createNodeAction(type, getState, createNode) {
	const action = (...args) => buildNode(type, args, createNode);
	action.isActive = (attrs) => {
		const state = getState();
		return state ? isNodeActive(state, type, attrs) : false;
	};
	return action;
}
/**
* @internal
*/
function createMarkActions(schema, getState, applyMark = defaultApplyMark) {
	return mapValues(schema.marks, (type) => createMarkAction(type, getState, applyMark));
}
function createMarkAction(type, getState, applyMark) {
	const action = (...args) => buildMark(type, args, applyMark);
	action.isActive = (attrs) => {
		const state = getState();
		return state ? isMarkActive(state, type, attrs) : false;
	};
	return action;
}
function buildMark(type, args, applyMark) {
	const [attrs, children] = normalizeArgs(args);
	return applyMark(type.create(attrs), flattenChildren(type.schema, children));
}
const defaultApplyMark = (mark, children) => {
	return children.map((node) => node.mark(mark.addToSet(node.marks)));
};
function buildNode(type, args, createNode) {
	const [attrs, children] = normalizeArgs(args);
	return createNode(type, attrs, flattenChildren(type.schema, children));
}
const defaultCreateNode = (type, attrs, children) => {
	const node = type.createAndFill(attrs, children);
	assert(node, `Failed to create node ${type.name}`);
	return node;
};
function flattenChildren(schema, children) {
	const nodes = [];
	for (const child of children) if (typeof child === "string") {
		if (child) nodes.push(schema.text(child, null));
	} else if (Array.isArray(child)) nodes.push(...flattenChildren(schema, child));
	else if (isProseMirrorNode(child)) nodes.push(child);
	else throw new ProseKitError(`Invalid node child: ${typeof child}`);
	return nodes;
}
function normalizeArgs(args) {
	const [attrs, ...children] = args;
	if (isNodeChild(attrs)) {
		children.unshift(attrs);
		return [null, children];
	} else if (typeof attrs === "object") return [attrs, children];
	else return [null, children];
}
function isNodeChild(value) {
	if (!value) return false;
	return typeof value === "string" || Array.isArray(value) || isProseMirrorNode(value);
}

//#endregion
//#region src/facets/union-extension.ts
var UnionExtensionImpl = class extends BaseExtension {
	/**
	* @internal
	*/
	constructor(extension = []) {
		super();
		this.extension = extension;
	}
	/**
	* @internal
	*/
	createTree(priority) {
		const pri = this.priority ?? priority;
		const extensions = [...this.extension];
		extensions.sort((a, b) => (a.priority ?? pri) - (b.priority ?? pri));
		const children = extensions.map((ext) => ext.getTree(pri));
		assert(children.length > 0);
		let node = children[0];
		for (let i = 1; i < children.length; i++) node = unionFacetNode(node, children[i]);
		return node;
	}
};

//#endregion
//#region src/editor/union.ts
function union(...exts) {
	const extensions = exts.flat();
	assert(extensions.length > 0, "At least one extension is required");
	return new UnionExtensionImpl(extensions);
}

//#endregion
//#region src/editor/editor.ts
/**
* @internal
*/
function setupEditorExtension(options) {
	if (options.defaultContent || options.defaultDoc || options.defaultHTML) return union(options.extension, defineDefaultState(options));
	return options.extension;
}
/**
* @public
*/
function createEditor(options) {
	return new Editor(new EditorInstance(setupEditorExtension(options)));
}
/**
* An internal class to make TypeScript generic type easier to use.
*
* @internal
*/
var EditorInstance = class {
	constructor(extension) {
		this.view = null;
		this.commands = {};
		this.afterMounted = [];
		this.getState = () => {
			return this.view?.state || this.directEditorProps.state;
		};
		this.dispatch = (tr) => {
			if (this.view) this.view.dispatch(tr);
			else this.directEditorProps.state = this.directEditorProps.state.apply(tr);
		};
		this.getDocJSON = () => {
			return jsonFromNode(this.getState().doc);
		};
		this.getDocHTML = (options) => {
			const serializer = this.getProp("clipboardSerializer");
			const DOMSerializer$1 = serializer ? { fromSchema: () => serializer } : void 0;
			return htmlFromNode(this.getDoc(), {
				...options,
				DOMSerializer: DOMSerializer$1
			});
		};
		this.tree = extension.getTree();
		const payload = this.tree.getRootOutput();
		const schema = payload.schema;
		const stateConfig = payload.state;
		assert(schema && stateConfig, "Schema must be defined");
		const state = EditorState.create(stateConfig);
		if (payload.commands) for (const [name, commandCreator] of Object.entries(payload.commands)) this.defineCommand(name, commandCreator);
		this.nodes = createNodeActions(state.schema, this.getState);
		this.marks = createMarkActions(state.schema, this.getState);
		this.schema = state.schema;
		this.directEditorProps = {
			state,
			...payload.view
		};
	}
	getDoc() {
		return this.getState().doc;
	}
	getProp(propName) {
		return this.view?.someProp(propName) ?? this.directEditorProps[propName];
	}
	updateState(state) {
		if (this.view) this.view.updateState(state);
		else this.directEditorProps.state = state;
	}
	setContent(content, selection) {
		const doc = getEditorContentDoc(this.schema, content);
		doc.check();
		const sel = getEditorSelection(doc, selection || "start");
		const oldState = this.getState();
		if (doc.eq(oldState.doc) && (!selection || sel.eq(oldState.selection))) return;
		const newState = EditorState.create({
			doc,
			selection: sel,
			plugins: oldState.plugins
		});
		this.updateState(newState);
	}
	updateExtension(extension, add) {
		const view = this.view;
		if (!view || view.isDestroyed) return;
		const tree = extension.getTree();
		const payload = tree.getRootOutput();
		if (payload?.schema) throw new ProseKitError("Schema cannot be changed");
		if (payload?.view) throw new ProseKitError("View cannot be changed");
		const oldPayload = this.tree.getRootOutput();
		const oldPlugins = [...view.state?.plugins ?? []];
		this.tree = add ? unionFacetNode(this.tree, tree) : subtractFacetNode(this.tree, tree);
		const newPayload = this.tree.getRootOutput();
		const newPlugins = [...newPayload?.state?.plugins ?? []];
		if (!deepEquals(oldPlugins, newPlugins)) {
			const state = view.state.reconfigure({ plugins: newPlugins });
			view.updateState(state);
		}
		if (newPayload?.commands && !deepEquals(oldPayload?.commands, newPayload?.commands)) {
			const commands = newPayload.commands;
			const names = Object.keys(commands);
			for (const name of names) this.defineCommand(name, commands[name]);
		}
	}
	use(extension) {
		if (!this.mounted) {
			let canceled = false;
			let lazyRemove = null;
			const lazyCreate = () => {
				if (!canceled) lazyRemove = this.use(extension);
			};
			this.afterMounted.push(lazyCreate);
			return () => {
				canceled = true;
				lazyRemove?.();
			};
		}
		this.updateExtension(extension, true);
		return () => this.updateExtension(extension, false);
	}
	mount(place) {
		if (this.view) throw new ProseKitError("Editor is already mounted");
		this.view = new EditorView({ mount: place }, this.directEditorProps);
		this.afterMounted.forEach((callback) => callback());
	}
	unmount() {
		if (!this.view) return;
		this.directEditorProps.state = this.view.state;
		this.view.destroy();
		this.view = null;
	}
	get mounted() {
		return !!this.view && !this.view.isDestroyed;
	}
	get assertView() {
		if (!this.view) throw new ProseKitError("Editor is not mounted");
		return this.view;
	}
	definePlugins(plugins) {
		const view = this.assertView;
		const state = view.state;
		const newPlugins = [...plugins, ...state.plugins];
		const newState = state.reconfigure({ plugins: newPlugins });
		view.setProps({ state: newState });
	}
	removePlugins(plugins) {
		const view = this.view;
		if (!view) return;
		const state = view.state;
		const newPlugins = state.plugins.filter((p) => !plugins.includes(p));
		const newState = state.reconfigure({ plugins: newPlugins });
		view.setProps({ state: newState });
	}
	exec(command) {
		return command(this.getState(), this.dispatch, this.view ?? void 0);
	}
	canExec(command) {
		return command(this.getState(), void 0, this.view ?? void 0);
	}
	defineCommand(name, commandCreator) {
		const action = (...args) => {
			const command = commandCreator(...args);
			return this.exec(command);
		};
		const canExec = (...args) => {
			const command = commandCreator(...args);
			return this.canExec(command);
		};
		action.canApply = canExec;
		action.canExec = canExec;
		this.commands[name] = action;
	}
	removeCommand(name) {
		delete this.commands[name];
	}
};
/**
* @public
*/
var Editor = class {
	/**
	* @internal
	*/
	constructor(instance) {
		this.mount = (place) => {
			if (place) this.instance.mount(place);
			else this.instance.unmount();
		};
		this.unmount = () => {
			this.instance.unmount();
		};
		this.focus = () => {
			this.instance.view?.focus();
		};
		this.blur = () => {
			this.instance.view?.dom.blur();
		};
		this.use = (extension) => {
			return this.instance.use(extension);
		};
		this.updateState = (state) => {
			this.instance.updateState(state);
		};
		this.setContent = (content, selection) => {
			return this.instance.setContent(content, selection);
		};
		this.getDocJSON = () => {
			return this.instance.getDocJSON();
		};
		this.getDocHTML = (options) => {
			return this.instance.getDocHTML(options);
		};
		this.exec = (command) => {
			return this.instance.exec(command);
		};
		this.canExec = (command) => {
			return this.instance.canExec(command);
		};
		if (!(instance instanceof EditorInstance)) throw new TypeError("Invalid EditorInstance");
		this.instance = instance;
	}
	/**
	* Whether the editor is mounted.
	*/
	get mounted() {
		return this.instance.mounted;
	}
	/**
	* The editor view.
	*/
	get view() {
		return this.instance.assertView;
	}
	/**
	* The editor schema.
	*/
	get schema() {
		return this.instance.schema;
	}
	/**
	* The editor's current state.
	*/
	get state() {
		return this.instance.getState();
	}
	/**
	* Whether the editor is focused.
	*/
	get focused() {
		return this.instance.view?.hasFocus() ?? false;
	}
	/**
	* All {@link CommandAction}s defined by the editor.
	*/
	get commands() {
		return this.instance.commands;
	}
	/**
	* All {@link NodeAction}s defined by the editor.
	*/
	get nodes() {
		return this.instance.nodes;
	}
	/**
	* All {@link MarkAction}s defined by the editor.
	*/
	get marks() {
		return this.instance.marks;
	}
};

//#endregion
export { isSelection as A, assert as B, defineFacetPayload as C, isNodeSelection as D, isMark as E, rootFacet as F, EditorNotFoundError as H, defineFacet as I, Priority as L, isTextSelection as M, toReversed as N, isNotNullish as O, schemaFacet as P, isNodeActive as R, stateFacet as S, isFragment as T, ProseKitError as U, getMarkType as V, jsonFromState as _, union as a, nodeFromJSON as b, isMarkActive as c, elementFromJSON as d, elementFromNode as f, jsonFromNode as g, jsonFromHTML as h, setupEditorExtension as i, isSlice as j, isProseMirrorNode as k, isMarkAbsent as l, htmlFromNode as m, EditorInstance as n, createMarkActions as o, htmlFromJSON as p, createEditor as r, createNodeActions as s, Editor as t, defineDefaultState as u, nodeFromElement as v, isAllSelection as w, stateFromJSON as x, nodeFromHTML as y, getNodeType as z };
//# sourceMappingURL=editor-eGj3wHej.js.map