import { AllSelection, EditorState, NodeSelection, Selection, TextSelection } from "@prosekit/pm/state";
import { DOMParser, DOMSerializer, Fragment, Mark, ProseMirrorNode, Schema, Slice } from "@prosekit/pm/model";
import { isDeepEqual, isElementLike, isNotNullish, mapValues } from "@ocavue/utils";
import { EditorView } from "@prosekit/pm/view";
/**
* Base class for all ProseKit errors.
*
* @internal
*/
var ProseKitError = class extends Error {
	constructor(message, options) {
		if (typeof message === "string" && !message.startsWith("[")) message = `[prosekit] ${message}`;
		super(message, options);
	}
};
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
/**
* Check if `subset` is a subset of `superset`.
*
* @internal
*/
function isSubset(subset, superset) {
	return Object.keys(subset).every((key) => subset[key] === superset[key]);
}
/**
* @internal
*/
function assert(condition, message = "Assertion failed") {
	if (!condition) throw new ProseKitError(message);
}
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
/**
* Checks if the given object is a {@link ProseMirrorNode} instance.
*/
function isProseMirrorNode(value) {
	return value instanceof ProseMirrorNode;
}
/**
* Checks if the given object is a {@link Mark} instance.
*/
function isMark(value) {
	return value instanceof Mark;
}
/**
* Checks if the given object is a {@link Fragment} instance.
*/
function isFragment(value) {
	return value instanceof Fragment;
}
/**
* Checks if the given object is a {@link Slice} instance.
*/
function isSlice(value) {
	return value instanceof Slice;
}
/**
* Checks if the given object is a {@link Selection} instance.
*/
function isSelection(value) {
	return value instanceof Selection;
}
/**
* Checks if the given object is a {@link TextSelection} instance.
*/
function isTextSelection(value) {
	return value instanceof TextSelection;
}
/**
* Checks if the given object is a {@link NodeSelection} instance.
*/
function isNodeSelection(value) {
	return value instanceof NodeSelection;
}
/**
* Checks if the given object is a {@link AllSelection} instance.
*/
function isAllSelection(value) {
	return value instanceof AllSelection;
}
function attrsMatch(nodeOrMark, attrs) {
	const currentAttrs = nodeOrMark.attrs;
	for (const [key, value] of Object.entries(attrs)) if (currentAttrs[key] !== value) return false;
	return true;
}
/**
* @internal
*/
function isNodeActive(state, type, attrs) {
	const { selection, schema } = state;
	const $pos = selection.$from;
	const nodeType = getNodeType(schema, type);
	if (isNodeSelection(selection) && checkNode(selection.node, nodeType, attrs)) return true;
	for (let depth = $pos.depth; depth >= 0; depth--) if (checkNode($pos.node(depth), nodeType, attrs)) return true;
	return false;
}
function checkNode(node, nodeType, attrs) {
	return node.type === nodeType && (!attrs || attrsMatch(node, attrs));
}
function includesMark(marks, markType, attrs) {
	attrs = attrs || {};
	return marks.some((mark) => {
		return mark.type === markType && isSubset(attrs, mark.attrs);
	});
}
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
	node.nodesBetween(from, to, (node, pos, parent) => {
		if (missing) return false;
		if (parent?.type.allowsMarkType(markType) && !node.marks.some((m) => m.type !== markType && m.type.excludes(markType))) {
			available = true;
			if (!includesMark(node.marks, markType, attrs)) missing = true;
		}
	});
	return available ? missing : true;
}
/**
* @internal
*/
function isMarkActive(state, type, attrs) {
	const { from, $from, to, empty } = state.selection;
	const markType = getMarkType(state.schema, type);
	if (empty) return includesMark(state.storedMarks || $from.marks(), markType, attrs);
	else return !isMarkAbsent(state.doc, from, to, markType, attrs);
}
function createNodeBuildersRaw(schema, createNode = defaultCreateNode) {
	return mapValues(schema.nodes, (type) => createNodeBuilder(type, createNode));
}
function createNodeBuilder(type, createNode) {
	return function nodeBuilder(...args) {
		return buildNode(type, args, createNode);
	};
}
/**
* @internal
*/
function createNodeActionsRaw(schema, getState, createNode = defaultCreateNode) {
	return mapValues(schema.nodes, (type) => createNodeAction(type, getState, createNode));
}
function createNodeAction(type, getState, createNode) {
	function nodeAction(...args) {
		return buildNode(type, args, createNode);
	}
	nodeAction.isActive = (attrs) => {
		const state = getState();
		return state ? isNodeActive(state, type, attrs) : false;
	};
	return nodeAction;
}
function createMarkBuildersRaw(schema, applyMark = defaultApplyMark) {
	return mapValues(schema.marks, (type) => createMarkBuilder(type, applyMark));
}
function createMarkBuilder(type, applyMark) {
	function markBuilder(...args) {
		return buildMark(type, args, applyMark);
	}
	markBuilder.create = (attrs) => type.create(attrs);
	return markBuilder;
}
/**
* @internal
*/
function createMarkActionsRaw(schema, getState, applyMark = defaultApplyMark) {
	return mapValues(schema.marks, (type) => createMarkAction(type, getState, applyMark));
}
function createMarkAction(type, getState, applyMark) {
	function markAction(...args) {
		return buildMark(type, args, applyMark);
	}
	markAction.create = (attrs) => type.create(attrs);
	markAction.isActive = (attrs) => {
		const state = getState();
		return state ? isMarkActive(state, type, attrs) : false;
	};
	return markAction;
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
let facetCount = 0;
/**
* @internal
*/
var Facet = class {
	/**
	* @internal
	*/
	constructor(parent, singleton, reducer, reduce) {
		this.index = facetCount++;
		if (reduce && !reducer) this.reduce = reduce;
		else if (reducer && !reduce) this.reduce = () => reducer;
		else throw new ProseKitError("Incorrect reducer");
		this.parent = parent;
		this.singleton = singleton;
		this.path = parent ? [...parent.path, this.index] : [];
	}
	get reducer() {
		return this.reduce();
	}
};
/**
* @internal
*/
function defineFacet(options) {
	return new Facet(options.parent, options.singleton ?? false, options.reducer, options.reduce);
}
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
const schemaFacet = defineFacet({
	reducer: (specs) => {
		assert(specs.length <= 1);
		const spec = specs[0];
		return { schema: spec ? new Schema(spec) : null };
	},
	parent: rootFacet,
	singleton: true
});
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
		const pri = priority ?? this.priority ?? 2;
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
	for (const [key, valueB] of b) {
		const valueA = a.get(key);
		merged.set(key, valueA ? unionFacetNode(valueA, valueB) : valueB);
	}
	return merged;
}
function subtractChildren(a, b) {
	const merged = new Map(a);
	for (const [key, valueB] of b) {
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
		this.output = null;
		this.facet = facet;
		this.inputs = inputs;
		this.children = children;
		this.reducers = reducers;
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
		if (this.facet.singleton) output[2] = (this.reducers[2] ||= this.facet.reducer)(inputs.filter(isNotNullish).flat());
		else for (let pri = 0; pri < 5; pri++) {
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
		return this.getOutput()[2];
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
			const children = /* @__PURE__ */ new Map([[node.facet.index, node]]);
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
const stateFacet = defineFacet({
	reduce: () => {
		let callbacks = [];
		const state = (ctx) => {
			let doc;
			let selection;
			let schema = ctx.schema;
			const markSet = /* @__PURE__ */ new Set();
			const pluginSet = /* @__PURE__ */ new Set();
			const reversedCallbacks = [...callbacks].reverse();
			for (const callback of reversedCallbacks) {
				const config = callback(ctx);
				doc ||= config.doc;
				selection ||= config.selection;
				schema ||= config.schema;
				for (const mark of config.storedMarks ?? []) markSet.add(mark);
				for (const plugin of config.plugins ?? []) pluginSet.add(plugin);
			}
			if (doc && schema) schema = void 0;
			assert(doc || schema, "Can't create state without a schema nor a document");
			return {
				doc,
				selection,
				schema,
				storedMarks: Array.from(markSet),
				plugins: Array.from(pluginSet)
			};
		};
		return function reducer(inputs) {
			callbacks = inputs;
			return { state };
		};
	},
	singleton: true,
	parent: rootFacet
});
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
/**
* Return a JSON object representing this state.
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
* Parse a DOM node to a ProseMirror node.
*
* @example
*
* ```ts
* const element = document.getElementById('content')
* const node = nodeFromElement(element, { schema: editor.schema })
* ```
*/
function nodeFromElement(element, options) {
	const { DOMParser: CustomDOMParser, schema, ...parseOptions } = options;
	return (CustomDOMParser || DOMParser).fromSchema(schema).parse(element, parseOptions);
}
/**
* Serialize a ProseMirror node to an HTML element.
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
	const document = getBrowserDocument(options);
	const schema = node.type.schema;
	const serializer = Serializer.fromSchema(schema);
	if (schema.topNodeType !== node.type) return serializer.serializeNode(node, { document });
	else return serializer.serializeFragment(node.content, { document }, document.createElement("div"));
}
/**
* Parse an HTML string to an HTML element.
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
* Parse an HTML string to a ProseMirror node.
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
* Serialize a ProseMirror node to an HTML string
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
* Serialize an HTML element to a ProseMirror document JSON object.
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
* Parse a ProseMirror document JSON object to an HTML element.
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
* Parse an HTML string to a ProseMirror document JSON object.
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
* Parse a ProseMirror document JSON object to an HTML string.
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
/**
* Define a default state for the editor.
*
* @param options
*/
function defineDefaultState({ defaultSelection, defaultContent }) {
	return defineFacetPayload(stateFacet, [({ schema }) => {
		const config = {};
		if (defaultContent) {
			const json = getEditorContentJSON(schema, defaultContent);
			config.doc = schema.nodeFromJSON(json);
			if (defaultSelection) config.selection = Selection.fromJSON(config.doc, defaultSelection);
		}
		return config;
	}]);
}
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
function union(...exts) {
	const extensions = exts.flat();
	assert(extensions.length > 0, "At least one extension is required");
	return new UnionExtensionImpl(extensions);
}
/**
* @internal
*/
function setupEditorExtension(options) {
	if (options.defaultContent) return union(options.extension, defineDefaultState(options));
	return options.extension;
}
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
			const DOMSerializer = serializer ? { fromSchema: () => serializer } : void 0;
			return htmlFromNode(this.getDoc(), {
				...options,
				DOMSerializer
			});
		};
		this.tree = extension.getTree();
		const payload = this.tree.getRootOutput();
		const schema = payload.schema;
		const stateConfig = payload.state;
		assert(schema && stateConfig, "Schema must be defined");
		const state = EditorState.create(stateConfig);
		if (payload.commands) for (const [name, commandCreator] of Object.entries(payload.commands)) this.defineCommand(name, commandCreator);
		this.nodes = createNodeActionsRaw(state.schema, this.getState);
		this.marks = createMarkActionsRaw(state.schema, this.getState);
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
		if (!isDeepEqual(oldPlugins, newPlugins)) {
			const state = view.state.reconfigure({ plugins: newPlugins });
			view.updateState(state);
		}
		if (newPayload?.commands && !isDeepEqual(oldPayload?.commands, newPayload?.commands)) {
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
		if (this.view) {
			if (this.view.dom === place) return;
			throw new ProseKitError("Editor is already mounted");
		}
		this.view = new EditorView({ mount: place }, this.directEditorProps);
		for (const callback of this.afterMounted) callback();
		this.afterMounted.length = 0;
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
		action.canExec = canExec;
		this.commands[name] = action;
	}
	removeCommand(name) {
		delete this.commands[name];
	}
};
var Editor = class {
	/**
	* @internal
	*/
	constructor(instance) {
		this.mount = (place) => {
			if (place) {
				this.instance.mount(place);
				return this.unmount;
			} else this.instance.unmount();
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
export { isAllSelection as A, isSubset as B, createMarkActionsRaw as C, isMarkActive as D, createNodeBuildersRaw as E, isSelection as F, EditorNotFoundError as H, isSlice as I, isTextSelection as L, isMark as M, isNodeSelection as N, isMarkAbsent as O, isProseMirrorNode as P, getNodeType as R, defineFacet as S, createNodeActionsRaw as T, ProseKitError as U, getMarkType as V, stateFromJSON as _, union as a, schemaFacet as b, elementFromNode as c, jsonFromHTML as d, jsonFromNode as f, nodeFromJSON as g, nodeFromHTML as h, setupEditorExtension as i, isFragment as j, isNodeActive as k, htmlFromJSON as l, nodeFromElement as m, EditorInstance as n, defineDefaultState as o, jsonFromState as p, createEditor as r, elementFromJSON as s, Editor as t, htmlFromNode as u, stateFacet as v, createMarkBuildersRaw as w, rootFacet as x, defineFacetPayload as y, assert as z };

//# sourceMappingURL=editor.js.map