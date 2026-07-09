import { A as isAllSelection, B as isSubset, D as isMarkActive, E as createNodeBuildersRaw, F as isSelection, H as EditorNotFoundError, I as isSlice, L as isTextSelection, M as isMark, N as isNodeSelection, O as isMarkAbsent, P as isProseMirrorNode, R as getNodeType, S as defineFacet, U as ProseKitError, V as getMarkType, _ as stateFromJSON, a as union, b as schemaFacet, c as elementFromNode, d as jsonFromHTML, f as jsonFromNode, g as nodeFromJSON, h as nodeFromHTML, j as isFragment, k as isNodeActive, l as htmlFromJSON, m as nodeFromElement, o as defineDefaultState, p as jsonFromState, r as createEditor, s as elementFromJSON, t as Editor, u as htmlFromNode, v as stateFacet, w as createMarkBuildersRaw, x as rootFacet, y as defineFacetPayload, z as assert } from "./editor.js";
import { Plugin, PluginKey, ProseMirrorPlugin, TextSelection } from "@prosekit/pm/state";
import { DOMSerializer, Fragment, Slice } from "@prosekit/pm/model";
import { ReplaceAroundStep, dropPoint, findWrapping } from "@prosekit/pm/transform";
import { baseKeymap, chainCommands, createParagraphNear, deleteSelection, joinTextblockBackward, lift, liftEmptyBlock, newlineInCode, selectAll as selectAll$1, selectNodeBackward, setBlockType as setBlockType$1, toggleMark as toggleMark$1 } from "@prosekit/pm/commands";
import { isElementLike, isHTMLElement, isNodeLike, isNotNullish, mapGroupBy, supportsRegexLookbehind } from "@ocavue/utils";
import { history, redo, undo } from "@prosekit/pm/history";
import { keydownHandler } from "@prosekit/pm/keymap";
import { splitSplittableBlock } from "prosemirror-splittable";
import OrderedMap from "orderedmap";
/**
* Returns a command that adds the given mark with the given attributes.
*/
function addMark(options) {
	return (state, dispatch) => {
		const mark = getMarkType(state.schema, options.type).create(options.attrs);
		const from = options.from ?? state.selection.from;
		const to = options.to ?? state.selection.to;
		if (from > to) return false;
		dispatch?.(state.tr.addMark(from, to, mark));
		return true;
	};
}
/**
* Finds the contiguous range of a mark of the given `type` (optionally matching
* `attrs`) that touches the resolved position `$pos`, or `undefined` if no such
* mark is present.
*
* A position exactly at either edge of a run counts as touching it, so a caret
* placed immediately before or after the mark still finds it. The run is
* delimited by mark identity: a neighbouring child whose mark differs in
* attributes starts a new run. When a matching mark sits on both sides of the
* position, the run to the right is returned.
*/
function getMarkRange($pos, type, attrs) {
	const parent = $pos.parent;
	const markType = getMarkType(parent.type.schema, type);
	const matches = attrs ? (mark) => mark.type === markType && isSubset(attrs, mark.attrs) : (mark) => mark.type === markType;
	const after = parent.childAfter($pos.parentOffset);
	const before = parent.childBefore($pos.parentOffset);
	let index;
	let childOffset;
	let mark;
	if (after.node && (mark = after.node.marks.find(matches))) {
		index = after.index;
		childOffset = after.offset;
	} else if (before.node && (mark = before.node.marks.find(matches))) {
		index = before.index;
		childOffset = before.offset;
	} else return;
	let from = $pos.start() + childOffset;
	let to = from + parent.child(index).nodeSize;
	for (let i = index - 1; i >= 0 && mark.isInSet(parent.child(i).marks); i--) from -= parent.child(i).nodeSize;
	for (let i = index + 1; i < parent.childCount && mark.isInSet(parent.child(i).marks); i++) to += parent.child(i).nodeSize;
	return {
		from,
		to,
		mark
	};
}
/**
* Expands the selection to include the entire mark at the current position.
*/
function expandMark(options) {
	return (state, dispatch) => {
		const { $from, $to, empty, from: selectionFrom, to: selectionTo } = state.selection;
		const fromRange = getMarkRange($from, options.type);
		const toRange = empty ? fromRange : getMarkRange($to, options.type);
		const from = fromRange?.from ?? selectionFrom;
		const to = toRange?.to ?? selectionTo;
		if (from === selectionFrom && to === selectionTo) return false;
		if (dispatch) dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)));
		return true;
	};
}
/**
* @internal
*/
function defaultBlockAt(match) {
	for (let i = 0; i < match.edgeCount; i++) {
		const { type } = match.edge(i);
		if (type.isTextblock && !type.hasRequiredAttrs()) return type;
	}
	return null;
}
/**
* Returns a command that inserts a default block after current selection or at
* the given position.
*/
function insertDefaultBlock(options) {
	return (state, dispatch) => {
		const $pos = options?.pos == null ? state.selection.$to : state.doc.resolve(options.pos);
		const depth = $pos.parent.isTextblock ? $pos.depth - 1 : $pos.depth;
		const parent = $pos.node(depth);
		const index = $pos.indexAfter(depth);
		const type = defaultBlockAt(parent.contentMatchAt(index));
		if (!type) return false;
		if (dispatch) {
			const pos = $pos.posAtIndex(index, depth);
			const node = type.createAndFill();
			if (!node) return false;
			const tr = state.tr.insert(pos, node);
			const selection = TextSelection.findFrom(tr.doc.resolve(pos), 1);
			if (!selection) return false;
			tr.setSelection(selection);
			dispatch(tr.scrollIntoView());
		}
		return true;
	};
}
function setSelectionAround(tr, pos) {
	const docSize = tr.doc.content.size;
	const $pos = tr.doc.resolve(pos > docSize ? docSize : pos < 0 ? 0 : pos);
	const selection = TextSelection.between($pos, $pos);
	tr.setSelection(selection);
}
/**
* Returns a command that inserts the given node at the current selection or at
* the given position.
*/
function insertNode(options) {
	return (state, dispatch) => {
		const node = options.node ? options.node : options.type ? getNodeType(state.schema, options.type).createAndFill(options.attrs) : null;
		assert(node, "You must provide either a node or a type");
		const insertPos = dropPoint(state.doc, options.pos ?? state.selection.anchor, new Slice(Fragment.from([node]), 0, 0));
		if (insertPos == null) return false;
		if (dispatch) {
			const tr = state.tr.insert(insertPos, node);
			setSelectionAround(tr, insertPos + node.nodeSize);
			dispatch(tr);
		}
		return true;
	};
}
/**
* Returns a command that removes the given mark.
*/
function removeMark(options) {
	return (state, dispatch) => {
		const markType = getMarkType(state.schema, options.type);
		const mark = options.attrs ? markType.create(options.attrs) : markType;
		const from = options.from ?? state.selection.from;
		const to = options.to ?? state.selection.to;
		if (from > to) return false;
		dispatch?.(state.tr.removeMark(from, to, mark));
		return true;
	};
}
/**
* Find the closest parent node that satisfies the predicate.
*/
function findParentNode(predicate, $pos) {
	for (let depth = $pos.depth; depth >= 0; depth -= 1) {
		const node = $pos.node(depth);
		if (predicate(node)) return {
			node,
			pos: depth === 0 ? 0 : $pos.before(depth),
			start: $pos.start(depth),
			depth
		};
	}
}
/**
* @internal
*/
function getNodeTypes(schema, types) {
	if (Array.isArray(types)) return types.map((type) => getNodeType(schema, type));
	return [getNodeType(schema, types)];
}
/**
* Finds the closest parent node that matches the given node type.
*/
function findParentNodeOfType(type, $pos) {
	const nodeTypes = getNodeTypes($pos.doc.type.schema, type);
	return findParentNode((node) => nodeTypes.includes(node.type), $pos);
}
/**
* Returns a command to remove the nearest ancestor node of a specific type from the current position.
*/
function removeNode(options) {
	return (state, dispatch) => {
		const $pos = typeof options.pos === "number" ? state.doc.resolve(options.pos) : state.selection.$anchor;
		const found = findParentNodeOfType(options.type, $pos);
		if (!found) return false;
		const { pos, node } = found;
		dispatch?.(state.tr.delete(pos, pos + node.nodeSize));
		return true;
	};
}
/**
* Returns a command that selects the whole document.
*/
function selectAll() {
	return selectAll$1;
}
function getTextblockEndpoint(selection, side) {
	const $pos = side < 0 ? selection.$from : selection.$to;
	let depth = $pos.depth;
	while ($pos.node(depth).isInline) {
		if (!depth) return;
		depth--;
	}
	if (!$pos.node(depth).isTextblock) return;
	return side < 0 ? $pos.start(depth) : $pos.end(depth);
}
/**
* @internal
*/
const selectBlockCommand = (state, dispatch) => {
	const { selection } = state;
	if (!isTextSelection(selection)) return false;
	const expectedFrom = getTextblockEndpoint(selection, -1);
	const expectedTo = getTextblockEndpoint(selection, 1);
	if (expectedFrom == null || expectedTo == null) return false;
	if (selection.from <= expectedFrom && selection.to >= expectedTo) return false;
	if (dispatch) {
		const newSelection = TextSelection.create(state.doc, expectedFrom, expectedTo);
		dispatch(state.tr.setSelection(newSelection));
	}
	return true;
};
/**
* Returns a command to expand the text selection to cover the current block
* node. If the text selection spans multiple blocks, it will select all
* blocks in the selection.
*/
function selectBlock() {
	return selectBlockCommand;
}
function getCustomSelection(state, from, to) {
	const pos = from ?? to;
	if (pos != null) {
		const $from = state.doc.resolve(from ?? pos);
		const $to = state.doc.resolve(to ?? pos);
		return TextSelection.between($from, $to);
	}
	return state.selection;
}
/**
* Returns a command that tries to set the selected textblocks to the given node
* type with the given attributes.
*/
function setBlockType(options) {
	return (state, dispatch) => {
		const nodeType = getNodeType(state.schema, options.type);
		const selection = getCustomSelection(state, options.from, options.to);
		const attrs = options.attrs;
		let applicable = false;
		for (let i = 0; i < selection.ranges.length && !applicable; i++) {
			const { $from: { pos: from }, $to: { pos: to } } = selection.ranges[i];
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (applicable) return false;
				if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) return;
				if (node.type == nodeType) applicable = true;
				else {
					const $pos = state.doc.resolve(pos), index = $pos.index();
					applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
				}
			});
		}
		if (!applicable) return false;
		if (dispatch) {
			const tr = state.tr;
			for (const range of selection.ranges) {
				const { $from: { pos: from }, $to: { pos: to } } = range;
				tr.setBlockType(from, to, nodeType, attrs);
			}
			dispatch(tr.scrollIntoView());
		}
		return true;
	};
}
/**
* Returns a command that sets the attributes of all matching nodes between the
* `from` and `to` positions.
*
* @param options
*/
function setNodeAttrsBetween(options) {
	return (state, dispatch) => {
		const from = options.from ?? state.selection.from;
		const to = options.to ?? state.selection.to;
		if (from > to) return false;
		const nodeTypes = getNodeTypes(state.schema, options.type);
		const positions = [];
		let found = false;
		state.doc.nodesBetween(from, to, (node, pos) => {
			if (nodeTypes.includes(node.type)) {
				positions.push(pos);
				found = true;
			}
			if (!dispatch && found) return false;
		});
		if (!found) return false;
		if (dispatch) {
			const { tr } = state;
			for (const [key, value] of Object.entries(options.attrs)) for (const pos of positions) tr.setNodeAttribute(pos, key, value);
			dispatch(tr);
		}
		return true;
	};
}
/**
* Returns a command that sets the attributes of the current node.
*
* @param options
*/
function setNodeAttrs({ type, attrs, pos }) {
	return (state, dispatch) => {
		let updatePos;
		if (pos == null) {
			const found = findParentNodeOfType(type, state.selection.$anchor);
			if (!found) return false;
			updatePos = found.pos;
		} else {
			const found = state.doc.nodeAt(pos);
			if (!found) return false;
			if (!getNodeTypes(state.schema, type).includes(found.type)) return false;
			updatePos = pos;
		}
		if (dispatch) {
			const { tr } = state;
			for (const [key, value] of Object.entries(attrs)) tr.setNodeAttribute(updatePos, key, value);
			dispatch(tr);
		}
		return true;
	};
}
/**
* Returns a command that toggles the given mark with the given attributes.
*
* @param options
*/
function toggleMark({ type, attrs, removeWhenPresent = false, enterInlineAtoms = true }) {
	return (state, dispatch, view) => {
		return toggleMark$1(getMarkType(state.schema, type), attrs, {
			removeWhenPresent,
			enterInlineAtoms
		})(state, dispatch, view);
	};
}
/**
* Returns a command that sets the selected textblocks to the given node type
* with the given attributes.
*
* @param options
*/
function toggleNode({ type, attrs }) {
	return (state, dispatch, view) => {
		if (isNodeActive(state, type, attrs)) {
			const defaultType = state.schema.topNodeType.contentMatch.defaultType;
			if (!defaultType) return false;
			return setBlockType$1(defaultType)(state, dispatch, view);
		} else return setBlockType$1(getNodeType(state.schema, type), attrs)(state, dispatch, view);
	};
}
/**
* Returns a command that wraps the selected textblock with the given node type.
*
* @param options
*/
function wrap(options) {
	return (state, dispatch) => {
		const { $from, $to } = state.selection;
		const range = $from.blockRange($to);
		if (!range) return false;
		const wrapping = findWrapping(range, getNodeType(state.schema, options.type), options.attrs);
		if (!wrapping) return false;
		dispatch?.(state.tr.wrap(range, wrapping));
		return true;
	};
}
/**
* Toggle between wrapping an inactive node with the provided node type, and
* lifting it up into its parent.
*
* @param options
*/
function toggleWrap(options) {
	const { type, attrs } = options;
	return (state, dispatch) => {
		if (isNodeActive(state, type, attrs)) return lift(state, dispatch);
		return wrap({
			type,
			attrs
		})(state, dispatch);
	};
}
/**
* Returns a command that set the type of all textblocks between the given range
* to the default type (usually `paragraph`).
*/
function unsetBlockType(options) {
	return (state, dispatch) => {
		const from = options?.from ?? state.selection.from;
		const to = options?.to ?? state.selection.to;
		if (from > to) return false;
		const tr = state.tr;
		if (unsetTextBlockType(tr, from, to)) {
			dispatch?.(tr);
			return true;
		}
		return false;
	};
}
function unsetTextBlockType(tr, from, to) {
	const mapFrom = tr.steps.length;
	tr.doc.nodesBetween(from, to, (node, pos, parent, index) => {
		if (!parent || !node.isTextblock) return true;
		const defaultType = parent.contentMatchAt(index).defaultType;
		if (defaultType && defaultType.isTextblock && node.type !== defaultType && defaultType.validContent(node.content)) {
			const mapping = tr.mapping.slice(mapFrom);
			const start = mapping.map(pos, 1);
			const end = mapping.map(pos + node.nodeSize, 1);
			const step = new ReplaceAroundStep(start, end, start + 1, end - 1, new Slice(Fragment.from(defaultType.create()), 0, 0), 1, true);
			tr.step(step);
		}
		return false;
	});
	return tr.steps.length > mapFrom;
}
/**
* Returns a command that removes all marks.
*/
function unsetMark(options) {
	return (state, dispatch) => {
		const from = options?.from ?? state.selection.from;
		const to = options?.to ?? state.selection.to;
		if (from > to) return false;
		dispatch?.(state.tr.removeMark(from, to));
		return true;
	};
}
/**
* Creates a set of typed node builders from a {@link Schema}.
*
* Each returned builder creates a ProseMirror node for one node type in the
* schema. A builder accepts an optional attributes object followed by any
* number of children, where a child is a node, a string, or a nested array of
* children.
*
* You can use these builders without creating an editor, for example in tests
* or when rendering on the server.
*
* Pass your extension type as the type argument to type the builders to your
* schema's node names and attributes.
*
* @param schema - The schema to create node builders for.
*
* @example
*
* ```ts
* import { createNodeBuilders } from 'prosekit/core'
* import { defineBasicExtension } from 'prosekit/basic'
*
* const extension = defineBasicExtension()
* const schema = extension.schema!
*
* const n = createNodeBuilders<typeof extension>(schema)
*
* const paragraph = n.paragraph('Hello world')
* const heading = n.heading({ level: 1 }, 'Title')
* const doc = n.doc(heading, paragraph)
* ```
*/
function createNodeBuilders(schema) {
	return createNodeBuildersRaw(schema);
}
/**
* Creates a set of typed mark builders from a {@link Schema}.
*
* Each returned builder applies one mark type from the schema to its children
* and returns the resulting array of ProseMirror nodes. A builder accepts an
* optional attributes object followed by any number of children, where a child
* is a node, a string, or a nested array of children.
*
* You can use these builders without creating an editor, for example in tests
* or when rendering on the server.
*
* Pass your extension type as the type argument to type the builders to your
* schema's mark names and attributes.
*
* @param schema - The schema to create mark builders for.
*
* @example
*
* ```ts
* import { createNodeBuilders, createMarkBuilders } from 'prosekit/core'
* import { defineBasicExtension } from 'prosekit/basic'
*
* const extension = defineBasicExtension()
* const schema = extension.schema!
*
* const n = createNodeBuilders<typeof extension>(schema)
* const m = createMarkBuilders<typeof extension>(schema)
*
* const paragraph = n.paragraph('Hello ', m.bold('world', m.italic('!')))
* ```
*/
function createMarkBuilders(schema) {
	return createMarkBuildersRaw(schema);
}
/**
* Return an new extension with the given priority.
*
* @example
* ```ts
* import { Priority, withPriority } from 'prosekit/core'
*
* const extension = withPriority(defineMyExtension(), Priority.high)
* ```
*/
function withPriority(extension, priority) {
	const result = union(extension);
	result.priority = priority;
	return result;
}
/**
* Adds a ProseMirror plugin to the editor.
*
* @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
* function that returns one or multiple plugins.
*/
function definePlugin(plugin) {
	return definePluginPayload(plugin);
}
function definePluginPayload(payload) {
	return defineFacetPayload(pluginFacet, [payload]);
}
/**
* @internal
*/
const pluginFacet = defineFacet({
	reducer: (payloads) => {
		return ({ schema }) => {
			const plugins = [];
			for (const payload of payloads) if (payload instanceof Plugin) plugins.push(payload);
			else if (Array.isArray(payload) && payload.every((p) => p instanceof Plugin)) plugins.push(...payload);
			else if (typeof payload === "function") plugins.push(...[payload({ schema })].flat());
			else throw new ProseKitError("Invalid plugin");
			return { plugins: [...plugins].reverse() };
		};
	},
	parent: stateFacet
});
function mergeWrappers(wrappers) {
	return (fn) => wrappers.filter(isNotNullish).reduce((fn, wrapper) => wrapper(fn), fn);
}
function wrapFunction(fn, wrapper) {
	return wrapper ? wrapper(fn) : fn;
}
var CustomDOMSerializer = class extends DOMSerializer {
	constructor(nodes, marks, serializeFragmentWrapper, serializeNodeWrapper) {
		super(nodes, marks);
		this.serializeFragmentWrapper = serializeFragmentWrapper;
		this.serializeNodeWrapper = serializeNodeWrapper;
	}
	serializeFragment(...args) {
		const fn = (...args) => super.serializeFragment(...args);
		return wrapFunction(fn, this.serializeFragmentWrapper)(...args);
	}
	serializeNode(...args) {
		const fn = (...args) => super.serializeNode(...args);
		return wrapFunction(fn, this.serializeNodeWrapper)(...args);
	}
};
const nodesFromSchema = /* @__PURE__ */ DOMSerializer.nodesFromSchema.bind(DOMSerializer);
const marksFromSchema = /* @__PURE__ */ DOMSerializer.marksFromSchema.bind(DOMSerializer);
function createCustomDOMSerializer(schema, options) {
	return new CustomDOMSerializer(wrapFunction(nodesFromSchema, options.nodesFromSchemaWrapper)(schema), wrapFunction(marksFromSchema, options.marksFromSchemaWrapper)(schema), options.serializeFragmentWrapper, options.serializeNodeWrapper);
}
const clipboardSerializerFacet = defineFacet({
	reducer: (inputs) => {
		const options = {
			serializeFragmentWrapper: mergeWrappers(inputs.map((input) => input.serializeFragmentWrapper)),
			serializeNodeWrapper: mergeWrappers(inputs.map((input) => input.serializeNodeWrapper)),
			nodesFromSchemaWrapper: mergeWrappers(inputs.map((input) => input.nodesFromSchemaWrapper)),
			marksFromSchemaWrapper: mergeWrappers(inputs.map((input) => input.marksFromSchemaWrapper))
		};
		return ({ schema }) => {
			const clipboardSerializer = createCustomDOMSerializer(schema, options);
			return [new ProseMirrorPlugin({
				key: new PluginKey("prosekit-clipboard-serializer"),
				props: { clipboardSerializer }
			})];
		};
	},
	singleton: true,
	parent: pluginFacet
});
/**
* @internal
*/
function defineClipboardSerializer(options) {
	return defineFacetPayload(clipboardSerializerFacet, [options]);
}
/**
* Returns a command that inserts the given text.
*/
function insertText({ text, from, to }) {
	return (state, dispatch) => {
		if (text) dispatch?.(state.tr.insertText(text, from, to));
		return true;
	};
}
const commandFacet = defineFacet({
	reducer: (inputs) => {
		switch (inputs.length) {
			case 0: return { commands: {} };
			case 1: return { commands: inputs[0] };
			default: return { commands: Object.assign({}, ...inputs) };
		}
	},
	parent: rootFacet,
	singleton: true
});
function defineCommands(commands) {
	return defineFacetPayload(commandFacet, [commands]);
}
/**
* Add some base commands
*/
function defineBaseCommands() {
	return defineCommands({
		insertText,
		insertNode,
		removeNode,
		wrap,
		toggleWrap,
		setBlockType,
		setNodeAttrs,
		setNodeAttrsBetween,
		insertDefaultBlock,
		selectAll,
		selectBlock,
		addMark,
		removeMark,
		unsetBlockType,
		unsetMark
	});
}
/**
* Registers a event handler that is called when the editor view is mounted.
*/
function defineMountHandler(handler) {
	return definePluginViewFacetPayload(["mount", handler]);
}
/**
* Registers a event handler that is called when the editor state is updated.
*/
function defineUpdateHandler(handler) {
	return definePluginViewFacetPayload(["update", handler]);
}
/**
* Registers a event handler that is called when the editor view is unmounted.
*/
function defineUnmountHandler(handler) {
	return definePluginViewFacetPayload(["unmount", handler]);
}
function definePluginViewFacetPayload(input) {
	return defineFacetPayload(pluginViewFacet, [input]);
}
const pluginViewFacet = defineFacet({
	reduce: () => {
		let mountHandlers = [];
		let updateHandlers = [];
		let unmountHandlers = [];
		const plugin = new ProseMirrorPlugin({
			key: pluginKey,
			view: (view) => {
				for (const fn of mountHandlers) fn(view);
				return {
					update: (view, prevState) => {
						for (const fn of updateHandlers) fn(view, prevState);
					},
					destroy: () => {
						for (const fn of unmountHandlers) fn();
					}
				};
			}
		});
		const register = (input) => {
			mountHandlers = [];
			updateHandlers = [];
			unmountHandlers = [];
			for (const args of input) switch (args[0]) {
				case "mount":
					mountHandlers.push(args[1]);
					break;
				case "update":
					updateHandlers.push(args[1]);
					break;
				case "unmount":
					unmountHandlers.push(args[1]);
					break;
			}
		};
		return function reducer(input) {
			register(input);
			return plugin;
		};
	},
	parent: pluginFacet,
	singleton: true
});
const pluginKey = new PluginKey("prosekit-plugin-view-handler");
/**
* Registers a event handler that is called when the editor document is changed.
*/
function defineDocChangeHandler(handler) {
	return defineUpdateHandler((view, prevState) => {
		if (!view.state.doc.eq(prevState.doc)) handler(view, prevState);
	});
}
function groupEntries(entries) {
	const result = {};
	for (const [key, value] of entries) (result[key] ||= []).push(value);
	return result;
}
function combineEventHandlers() {
	let handlers = [];
	function setHandlers(eventHandlers) {
		handlers = eventHandlers;
	}
	function combinedEventHandler(...args) {
		for (let i = handlers.length - 1; i >= 0; i--) if (handlers[i](...args)) return true;
		return false;
	}
	return [setHandlers, combinedEventHandler];
}
/**
* @internal
*/
function defineDomEventFacetPayload(...payloads) {
	return defineFacetPayload(domEventFacet, payloads);
}
/**
* Register a new event handler for the given event type.
*/
function defineDOMEventHandler(event, handler) {
	return defineDomEventFacetPayload([event, handler]);
}
/**
* @internal
*/
const domEventFacet = defineFacet({
	reduce: () => {
		const setHandlersMap = /* @__PURE__ */ new Map();
		const combinedHandlers = {};
		let plugin;
		const update = (payloads) => {
			let hasNewEvent = false;
			for (const [event] of payloads) if (!setHandlersMap.has(event)) {
				hasNewEvent = true;
				const [setHandlers, combinedHandler] = combineEventHandlers();
				setHandlersMap.set(event, setHandlers);
				combinedHandlers[event] = combinedHandler;
			}
			const map = groupEntries(payloads);
			for (const [event, setHandlers] of setHandlersMap) setHandlers(map[event] ?? []);
			if (hasNewEvent) plugin = new ProseMirrorPlugin({
				key: new PluginKey("prosekit-dom-event-handler"),
				props: { handleDOMEvents: combinedHandlers }
			});
		};
		return function reducer(inputs) {
			update(inputs);
			return plugin ?? [];
		};
	},
	parent: pluginFacet,
	singleton: true
});
function defineEventFacetPayload(payload) {
	return defineFacetPayload(editorEventFacet, [payload]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown}
*/
function defineKeyDownHandler(handler) {
	return defineEventFacetPayload(["keyDown", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress}
*/
function defineKeyPressHandler(handler) {
	return defineEventFacetPayload(["keyPress", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput}
*/
function defineTextInputHandler(handler) {
	return defineEventFacetPayload(["textInput", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn}
*/
function defineClickOnHandler(handler) {
	return defineEventFacetPayload(["clickOn", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClick}
*/
function defineClickHandler(handler) {
	return defineEventFacetPayload(["click", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn}
*/
function defineDoubleClickOnHandler(handler) {
	return defineEventFacetPayload(["doubleClickOn", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick}
*/
function defineDoubleClickHandler(handler) {
	return defineEventFacetPayload(["doubleClick", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn}
*/
function defineTripleClickOnHandler(handler) {
	return defineEventFacetPayload(["tripleClickOn", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick}
*/
function defineTripleClickHandler(handler) {
	return defineEventFacetPayload(["tripleClick", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste}
*/
function definePasteHandler(handler) {
	return defineEventFacetPayload(["paste", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop}
*/
function defineDropHandler(handler) {
	return defineEventFacetPayload(["drop", handler]);
}
/**
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection}
*/
function defineScrollToSelectionHandler(handler) {
	return defineEventFacetPayload(["scrollToSelection", handler]);
}
/**
* @internal
*/
const editorEventFacet = defineFacet({
	reduce: () => {
		const [update, plugin] = setupEditorEventPlugin();
		return (entries) => {
			update(entries);
			return plugin;
		};
	},
	parent: pluginFacet,
	singleton: true
});
function setupEditorEventPlugin() {
	const [setKeyDownHandlers, handleKeyDown] = combineEventHandlers();
	const [setKeyPressHandlers, handleKeyPress] = combineEventHandlers();
	const [setTextInputHandlers, handleTextInput] = combineEventHandlers();
	const [setClickOnHandlers, handleClickOn] = combineEventHandlers();
	const [setClickHandlers, handleClick] = combineEventHandlers();
	const [setDoubleClickOnHandlers, handleDoubleClickOn] = combineEventHandlers();
	const [setDoubleClickHandlers, handleDoubleClick] = combineEventHandlers();
	const [setTripleClickOnHandlers, handleTripleClickOn] = combineEventHandlers();
	const [setTripleClickHandlers, handleTripleClick] = combineEventHandlers();
	const [setPasteHandlers, handlePaste] = combineEventHandlers();
	const [setDropHandlers, handleDrop] = combineEventHandlers();
	const [setScrollToSelectionHandlers, handleScrollToSelection] = combineEventHandlers();
	const update = (entries) => {
		const map = groupEntries(entries);
		setKeyDownHandlers(map.keyDown ?? []);
		setKeyPressHandlers(map.keyPress ?? []);
		setTextInputHandlers(map.textInput ?? []);
		setClickOnHandlers(map.clickOn ?? []);
		setClickHandlers(map.click ?? []);
		setDoubleClickOnHandlers(map.doubleClickOn ?? []);
		setDoubleClickHandlers(map.doubleClick ?? []);
		setTripleClickOnHandlers(map.tripleClickOn ?? []);
		setTripleClickHandlers(map.tripleClick ?? []);
		setPasteHandlers(map.paste ?? []);
		setDropHandlers(map.drop ?? []);
		setScrollToSelectionHandlers(map.scrollToSelection ?? []);
	};
	return [update, new ProseMirrorPlugin({
		key: new PluginKey("prosekit-editor-event"),
		props: {
			handleKeyDown,
			handleKeyPress,
			handleTextInput,
			handleClickOn,
			handleClick,
			handleDoubleClickOn,
			handleDoubleClick,
			handleTripleClickOn,
			handleTripleClick,
			handlePaste,
			handleDrop,
			handleScrollToSelection
		}
	})];
}
/**
* Registers a event handler that is called when the editor gains or loses focus.
*/
function defineFocusChangeHandler(handler) {
	const handleFocus = () => handler(true);
	const handleBlur = () => handler(false);
	return defineDomEventFacetPayload(["focus", handleFocus], ["blur", handleBlur]);
}
/**
* https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
*
* @internal
*/
const isApple = typeof navigator !== "undefined" ? /Mac|iP(?:hone|[ao]d)/.test(navigator.platform) : false;
/**
* Adds a set of keybindings to the editor. Please read the
* [documentation](https://prosemirror.net/docs/ref/#keymap) for more details.
*/
function defineKeymap(keymap) {
	return defineFacetPayload(keymapFacet, [keymap]);
}
/**
* @internal
*/
const keymapFacet = defineFacet({
	reduce: () => {
		let subHandlers = [];
		const rootHandler = (view, event) => {
			for (const handler of subHandlers) if (handler(view, event)) return true;
			return false;
		};
		const plugin = new Plugin({
			key: keymapPluginKey,
			props: { handleKeyDown: rootHandler }
		});
		return (keymaps) => {
			subHandlers = keymaps.map(keydownHandler).reverse();
			return plugin;
		};
	},
	parent: pluginFacet,
	singleton: true
});
const keymapPluginKey = new PluginKey("prosekit-keymap");
const keymap = {
	"Mod-z": undo,
	"Mod-Z": redo
};
if (!isApple) keymap["Mod-y"] = redo;
const commands = {
	undo: () => undo,
	redo: () => redo
};
/**
* Add undo/redo history to the editor.
*
* @param options
*/
function defineHistory({ depth = 200, newGroupDelay = 250 } = {}) {
	return union(definePlugin(history({
		depth,
		newGroupDelay
	})), defineKeymap(keymap), defineCommands(commands));
}
const customEnter = chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitSplittableBlock);
const customBackspace = chainCommands(deleteSelection, joinTextblockBackward, selectNodeBackward);
/**
* Defines some basic key bindings.
*
* @param options
*/
function defineBaseKeymap({ priority = 1, preferBlockSelection = true } = {}) {
	return withPriority(defineKeymap({
		...baseKeymap,
		"Mod-a": preferBlockSelection ? chainCommands(selectBlockCommand, selectAll$1) : selectAll$1,
		"Enter": customEnter,
		"Backspace": customBackspace
	}), priority);
}
/**
* Splits text into chunks based on regex matches, preserving both matched and unmatched segments.
* Returns an array of tuples where each tuple contains a text segment and either the match data
* (for matched segments) or undefined (for unmatched segments).
*/
function splitTextByRegex(text, regex) {
	regex.lastIndex = 0;
	const chunks = [];
	let lastIndex = 0;
	let match;
	let matched = false;
	while (match = regex.exec(text)) {
		const start = match.index;
		const end = regex.lastIndex;
		if (start > lastIndex) chunks.push([text.slice(lastIndex, start), void 0]);
		chunks.push([text.slice(start, end), match]);
		matched = true;
		if (lastIndex === end) return;
		lastIndex = end;
	}
	if (matched && lastIndex < text.length) chunks.push([text.slice(lastIndex), void 0]);
	regex.lastIndex = 0;
	return matched ? chunks : void 0;
}
/**
* @internal
*/
const pasteRuleFacet = defineFacet({
	reduce: () => {
		let handlers = [];
		const transformPasted = (slice, view, plain) => {
			for (const handler of handlers) slice = handler({
				slice,
				view,
				plain
			});
			return slice;
		};
		const plugin = new ProseMirrorPlugin({
			key: new PluginKey("prosekit-paste-rule"),
			props: { transformPasted }
		});
		return (inputs) => {
			handlers = [...inputs].reverse();
			return plugin;
		};
	},
	singleton: true,
	parent: pluginFacet
});
/**
* @internal
*/
function definePasteRulePlugin(payload) {
	return defineFacetPayload(pasteRuleFacet, [payload]);
}
/**
* Defines a paste rule. This rule allows you to modify pasted or dragged
* content before it is inserted into the document.
*
* @param options
*/
function definePasteRule({ handler }) {
	return definePasteRulePlugin(handler);
}
/**
* Defines a paste rule that applies marks based on regex patterns.
*/
function defineMarkPasteRule(options) {
	return definePasteRule({ handler: ({ slice, view, plain }) => {
		if (plain) return slice;
		return replaceMarkInSlice({
			markType: getMarkType(view.state.schema, options.type),
			regex: options.regex,
			getAttrs: options.getAttrs,
			shouldSkip: options.shouldSkip
		}, slice);
	} });
}
function replaceMarkInSlice(options, slice) {
	const newFragment = replaceMarkInFragment(options, slice.content);
	if (!newFragment) return slice;
	return new Slice(newFragment, slice.openStart, slice.openEnd);
}
function replaceMarkInFragment(options, fragment) {
	let changed = false;
	const children = [];
	for (const child of fragment.content) {
		const newChild = replaceMarkInNode(options, child);
		if (newChild) changed = true;
		children.push(newChild || child);
	}
	if (changed) return Fragment.from(children);
}
function replaceMarkInNode(options, node) {
	if (node.type.spec.code) return;
	if (node.type.isInline) return;
	if (node.type.isTextblock) return replaceMarkInTextblockNode(options, node);
	const newChildren = replaceMarkInFragment(options, node.content);
	if (!newChildren) return;
	return node.copy(newChildren);
}
function replaceMarkInTextblockNode(options, node) {
	const newChildren = [];
	let changed = false;
	for (const inlineNode of node.content.content) {
		const newInlineNodes = replaceMarkInInlineNode(options, inlineNode);
		if (newInlineNodes) {
			changed = true;
			newChildren.push(...newInlineNodes);
		} else newChildren.push(inlineNode);
	}
	if (changed) return node.copy(Fragment.from(newChildren));
}
function replaceMarkInInlineNode(options, node) {
	const text = node.text;
	if (!text) return;
	const { markType, shouldSkip } = options;
	if (shouldSkip) {
		if (shouldSkip(node)) return;
	} else {
		if (node.marks.some((mark) => mark.type === markType)) return;
		if (node.marks.some((mark) => mark.type.spec.code)) return;
	}
	const chunks = splitTextByRegex(text, options.regex);
	if (!chunks) return;
	const schema = node.type.schema;
	const nodes = [];
	for (const [text, match] of chunks) {
		if (!text) continue;
		if (match) {
			const attrs = options.getAttrs?.(match) ?? null;
			if (attrs !== false) {
				const mark = markType.create(attrs);
				nodes.push(schema.text(text, [...node.marks, mark]));
			} else nodes.push(schema.text(text, node.marks));
		} else nodes.push(schema.text(text, node.marks));
	}
	return nodes;
}
const schemaSpecFacet = defineFacet({
	reducer: (specs) => {
		let nodes = OrderedMap.from({});
		let marks = OrderedMap.from({});
		let topNode;
		for (const spec of specs) {
			nodes = nodes.append(spec.nodes);
			marks = marks.append(spec.marks ?? {});
			topNode = topNode ?? spec.topNode;
		}
		return {
			nodes,
			marks,
			topNode
		};
	},
	parent: schemaFacet,
	singleton: true
});
function removeUndefinedValues(obj) {
	const result = {};
	for (const [key, value] of Object.entries(obj)) if (value !== void 0) result[key] = value;
	return result;
}
function mergeObjects(...objects) {
	const filteredObjects = objects.filter(isNotNullish).map(removeUndefinedValues);
	return Object.assign({}, ...filteredObjects);
}
function mergeSpecs(a, b) {
	const attrs = {};
	const attrNames = /* @__PURE__ */ new Set([...Object.keys(a.attrs ?? {}), ...Object.keys(b.attrs ?? {})]);
	for (const name of attrNames) {
		const attrSpecA = a.attrs?.[name];
		const attrSpecB = b.attrs?.[name];
		const attrSpecMerged = mergeObjects(attrSpecA, attrSpecB);
		if (attrSpecMerged) attrs[name] = attrSpecMerged;
	}
	return mergeObjects(a, b, {
		attrs,
		parseDOM: [...a.parseDOM ?? [], ...b.parseDOM ?? []]
	});
}
function wrapOutputSpecAttrs(toDOM, options) {
	return (node, ...args) => {
		return insertOutputSpecAttrs(toDOM(node, ...args), options.map((option) => option.toDOM?.(node.attrs[option.attr])).filter(isNotNullish));
	};
}
function wrapTagParseRuleAttrs(rule, options) {
	const existingGetAttrs = rule.getAttrs;
	const existingAttrs = rule.attrs;
	return {
		...rule,
		getAttrs: (dom) => {
			const baseAttrs = existingGetAttrs?.(dom) ?? existingAttrs ?? {};
			if (baseAttrs === false || !dom || !isElementLike(dom)) return baseAttrs ?? null;
			const insertedAttrs = {};
			for (const option of options) if (option.parseDOM) insertedAttrs[option.attr] = option.parseDOM(dom);
			return {
				...baseAttrs,
				...insertedAttrs
			};
		}
	};
}
function wrapParseRuleAttrs(rule, attrs) {
	if (rule.tag) return wrapTagParseRuleAttrs(rule, attrs);
	return rule;
}
function insertOutputSpecAttrs(dom, attrs) {
	if (!dom) return dom;
	if (Array.isArray(dom)) {
		const rest = dom.slice(1);
		let oldAttrs;
		if (rest.length > 0 && (rest[0] == null || typeof rest[0] === "object")) oldAttrs = rest.shift();
		else oldAttrs = {};
		const newAttrs = setObjectAttributes(oldAttrs, attrs);
		return [
			dom[0],
			newAttrs,
			...rest
		];
	}
	if (isNodeLike(dom) && isHTMLElement(dom)) return setElementAttributes(dom, attrs);
	if (typeof dom === "object" && "dom" in dom) {
		const element = dom.dom;
		if (isNodeLike(element) && isHTMLElement(element)) return {
			...dom,
			dom: setElementAttributes(element, attrs)
		};
	}
	return dom;
}
function setObjectAttributes(obj, attrs) {
	obj = { ...obj };
	for (const [key, value] of attrs) {
		const oldValue = obj[key];
		const newValue = key === "style" ? joinStyles(value, typeof oldValue === "string" ? oldValue : "") : value;
		obj[key] = newValue;
	}
	return obj;
}
function setElementAttributes(element, attrs) {
	element = element.cloneNode(true);
	for (const [key, value] of attrs) {
		const oldValue = element.getAttribute(key);
		const newValue = key === "style" ? joinStyles(value, typeof oldValue === "string" ? oldValue : "") : value;
		element.setAttribute(key, newValue);
	}
	return element;
}
function joinStyles(...styles) {
	return styles.map((style) => style.trim().replace(/;$/, "")).filter(Boolean).join("; ");
}
/**
* Defines a mark type into the editor schema.
*
* @example
*
* ```ts
* const extension = defineMarkSpec({
*   name: 'bold',
*   parseDOM: [
*     { tag: 'strong' },
*     { tag: 'b' },
*   ],
*   toDOM() {
*     return ['strong', 0]
*   },
* })
* ```
*/
function defineMarkSpec(options) {
	return defineFacetPayload(markSpecFacet, [[options, void 0]]);
}
function defineMarkAttr(options) {
	return defineFacetPayload(markSpecFacet, [[void 0, options]]);
}
const markSpecFacet = defineFacet({
	reducer: (payloads) => {
		let specs = OrderedMap.from({});
		const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish);
		const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish);
		for (const { name, ...spec } of specPayloads) {
			const prevSpec = specs.get(name);
			if (prevSpec) specs = specs.update(name, mergeSpecs(prevSpec, spec));
			else specs = specs.addToStart(name, spec);
		}
		const groupedAttrs = mapGroupBy(attrPayloads, (payload) => payload.type);
		for (const [type, attrs] of groupedAttrs) {
			if (!attrs) continue;
			const oldSpec = specs.get(type);
			assert(oldSpec, `Mark type ${type} must be defined`);
			const newSpec = {
				...oldSpec,
				attrs: { ...oldSpec.attrs }
			};
			for (const attr of attrs) newSpec.attrs[attr.attr] = {
				default: attr.default,
				validate: attr.validate
			};
			if (oldSpec.toDOM) newSpec.toDOM = wrapOutputSpecAttrs(oldSpec.toDOM, attrs);
			if (oldSpec.parseDOM) newSpec.parseDOM = oldSpec.parseDOM.map((rule) => wrapParseRuleAttrs(rule, attrs));
			specs = specs.update(type, newSpec);
		}
		return {
			marks: specs,
			nodes: {}
		};
	},
	parent: schemaSpecFacet,
	singleton: true
});
/**
* @internal
*/
function defineMarkViewFactory(options) {
	return defineFacetPayload(markViewFactoryFacet, [[options, null]]);
}
/**
* @internal
*/
function defineMarkViewComponent(options) {
	return defineFacetPayload(markViewFactoryFacet, [[null, options]]);
}
const isServer$1 = typeof window === "undefined";
const markViewFactoryFacet = defineFacet({
	reducer: (inputs) => {
		if (isServer$1) return [];
		const markViews = {};
		const factories = inputs.map((x) => x[0]).filter(isNotNullish);
		const options = inputs.map((x) => x[1]).filter(isNotNullish);
		for (const { group, name, args } of options) {
			const factory = factories.find((factory) => factory.group === group);
			if (!factory) continue;
			markViews[name] = factory.factory(args);
		}
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-mark-view-effect"),
			props: { markViews }
		})];
	},
	parent: pluginFacet
});
function defineMarkView(options) {
	return defineFacetPayload(markViewFacet, [options]);
}
const markViewFacet = defineFacet({
	reducer: (inputs) => {
		const markViews = {};
		const seen = /* @__PURE__ */ new Set();
		for (const input of inputs) {
			const { name, constructor } = input;
			if (!seen.has(name)) {
				seen.add(name);
				markViews[name] = constructor;
			}
		}
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-mark-view"),
			props: { markViews }
		})];
	},
	parent: pluginFacet
});
/**
* Defines a node type into the editor schema.
*
* @example
*
* ```ts
* const extension = defineNodeSpec({
*   name: 'fancyParagraph',
*   content: 'inline*',
*   group: 'block',
*   parseDOM: [{ tag: 'p.fancy' }],
*   toDOM() {
*     return ['p', { 'class': 'fancy' }, 0]
*   },
* })
* ```
*/
function defineNodeSpec(options) {
	return defineFacetPayload(nodeSpecFacet, [[options, void 0]]);
}
/**
* Defines an attribute for a node type.
*/
function defineNodeAttr(options) {
	return defineFacetPayload(nodeSpecFacet, [[void 0, options]]);
}
const nodeSpecFacet = defineFacet({
	reducer: (payloads) => {
		let specs = OrderedMap.from({});
		let topNodeName;
		const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish);
		const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish);
		for (const { name, topNode, ...spec } of specPayloads) {
			if (topNode) topNodeName = name;
			const prevSpec = specs.get(name);
			if (prevSpec) specs = specs.update(name, mergeSpecs(prevSpec, spec));
			else specs = specs.addToStart(name, spec);
		}
		const groupedAttrs = mapGroupBy(attrPayloads, (payload) => payload.type);
		for (const [type, attrs] of groupedAttrs) {
			if (!attrs) continue;
			const oldSpec = specs.get(type);
			assert(oldSpec, `Node type ${type} must be defined`);
			const newSpec = {
				...oldSpec,
				attrs: { ...oldSpec.attrs }
			};
			for (const attr of attrs) newSpec.attrs[attr.attr] = {
				default: attr.default,
				validate: attr.validate,
				splittable: attr.splittable
			};
			if (oldSpec.toDOM) newSpec.toDOM = wrapOutputSpecAttrs(oldSpec.toDOM, attrs);
			if (oldSpec.parseDOM) newSpec.parseDOM = oldSpec.parseDOM.map((rule) => wrapTagParseRuleAttrs(rule, attrs));
			specs = specs.update(type, newSpec);
		}
		return {
			nodes: specs,
			topNode: topNodeName
		};
	},
	parent: schemaSpecFacet,
	singleton: true
});
/**
* @internal
*/
function defineNodeViewFactory(options) {
	return defineFacetPayload(nodeViewFactoryFacet, [[options, null]]);
}
/**
* @internal
*/
function defineNodeViewComponent(options) {
	return defineFacetPayload(nodeViewFactoryFacet, [[null, options]]);
}
const isServer = typeof window === "undefined";
const nodeViewFactoryFacet = defineFacet({
	reducer: (inputs) => {
		if (isServer) return [];
		const nodeViews = {};
		const factories = inputs.map((x) => x[0]).filter(isNotNullish);
		const options = inputs.map((x) => x[1]).filter(isNotNullish);
		for (const { group, name, args } of options) {
			const factory = factories.find((factory) => factory.group === group);
			if (!factory) continue;
			nodeViews[name] = factory.factory(args);
		}
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-node-view-effect"),
			props: { nodeViews }
		})];
	},
	parent: pluginFacet
});
function defineNodeView(options) {
	return defineFacetPayload(nodeViewFacet, [options]);
}
const nodeViewFacet = defineFacet({
	reducer: (inputs) => {
		const nodeViews = {};
		const seen = /* @__PURE__ */ new Set();
		for (const input of inputs) {
			const { name, constructor } = input;
			if (!seen.has(name)) {
				seen.add(name);
				nodeViews[name] = constructor;
			}
		}
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-node-view"),
			props: { nodeViews }
		})];
	},
	parent: pluginFacet
});
/**
* ProseKit extension priority.
*
* There are five priority levels available:
*
* - `Priority.lowest`
* - `Priority.low`
* - `Priority.default`
* - `Priority.high`
* - `Priority.highest`
*
* @example
*
* ```ts
* import { withPriority, Priority } from 'prosekit/core'
* import { myExtension } from './my-extension.js'
*
* const myExtensionWithHighPriority = withPriority(myExtension, Priority.high)
* ```
*/
const Priority = {
	lowest: 0,
	low: 1,
	default: 2,
	high: 3,
	highest: 4
};
/**
* Checks if the browser supports [regex lookbehind assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion).
*/
const canUseRegexLookbehind = supportsRegexLookbehind;
/**
* A tiny utility for constructing `className` strings conditionally.
*
* It accepts a variable number of arguments, which can be a string, boolean,
* null, or undefined. The function concatenates the string arguments and
* ignores the falsy values (false, null, undefined).
*/
function clsx(...args) {
	return args.filter((x) => typeof x === "string").join(" ");
}
/**
* @internal
*/
function containsInlineNode(doc, from, to) {
	let found = false;
	doc.nodesBetween(from, to, (node) => {
		if (found) return false;
		if (node.isInline) found = true;
	});
	return found;
}
/**
* Finds the first node that satisfies the predicate from the given document.
*
* @internal
*/
function findNode(doc, predicate) {
	let found;
	doc.descendants((node, pos, parent, index) => {
		if (found) return false;
		if (predicate(node)) {
			found = {
				node,
				pos,
				parent,
				index
			};
			return false;
		}
	});
	return found;
}
/**
* Finds all nodes that satisfy the predicate from the given document.
*
* @internal
*/
function findNodes(doc, predicate) {
	const results = [];
	doc.descendants((node, pos, parent, index) => {
		if (predicate(node)) results.push({
			node,
			pos,
			parent,
			index
		});
	});
	return results;
}
/**
* Whether the selection is an empty text selection at the start of a block.
*
* @internal
*/
function isAtBlockStart(state, view) {
	const { $cursor } = state.selection;
	if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) return null;
	return $cursor;
}
/**
* @internal
*/
function isCodeBlockType(type) {
	return !!(type.spec.code && type.isBlock);
}
/**
* Check if the selection is in a code block.
*
* @internal
*/
function isInCodeBlock(selection) {
	return isCodeBlockType(selection.$from.parent.type) || isCodeBlockType(selection.$to.parent.type);
}
/**
* @internal
*/
function maybeRun(value, ...args) {
	return typeof value === "function" ? value(...args) : value;
}
/**
* @internal
*/
const OBJECT_REPLACEMENT_CHARACTER = "￼";
/**
* @internal
*/
function withSkipCodeBlock(command) {
	return (state, dispatch, view) => {
		if (isInCodeBlock(state.selection)) return false;
		return command(state, dispatch, view);
	};
}
export { Editor, EditorNotFoundError, OBJECT_REPLACEMENT_CHARACTER, Priority, ProseKitError, addMark, assert, canUseRegexLookbehind, clsx, containsInlineNode, createEditor, createMarkBuilders, createNodeBuilders, defaultBlockAt, defineBaseCommands, defineBaseKeymap, defineClickHandler, defineClickOnHandler, defineClipboardSerializer, defineCommands, defineDOMEventHandler, defineDefaultState, defineDocChangeHandler, defineDoubleClickHandler, defineDoubleClickOnHandler, defineDropHandler, defineFacet, defineFacetPayload, defineFocusChangeHandler, defineHistory, defineKeyDownHandler, defineKeyPressHandler, defineKeymap, defineMarkAttr, defineMarkPasteRule, defineMarkSpec, defineMarkView, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeAttr, defineNodeSpec, defineNodeView, defineNodeViewComponent, defineNodeViewFactory, definePasteHandler, definePasteRule, definePlugin, defineScrollToSelectionHandler, defineTextInputHandler, defineTripleClickHandler, defineTripleClickOnHandler, defineUnmountHandler, defineUpdateHandler, editorEventFacet, elementFromJSON, elementFromNode, expandMark, findNode, findNodes, findParentNode, findParentNodeOfType, getMarkRange, getMarkType, getNodeType, htmlFromJSON, htmlFromNode, insertDefaultBlock, insertNode, isAllSelection, isApple, isAtBlockStart, isFragment, isInCodeBlock, isMark, isMarkAbsent, isMarkActive, isNodeSelection, isProseMirrorNode, isSelection, isSlice, isTextSelection, jsonFromHTML, jsonFromNode, jsonFromState, keymapFacet, maybeRun, nodeFromElement, nodeFromHTML, nodeFromJSON, pluginFacet, removeMark, removeNode, selectAll, selectBlock, setBlockType, setNodeAttrs, setNodeAttrsBetween, setSelectionAround, stateFromJSON, toggleMark, toggleNode, toggleWrap, union, unsetBlockType, unsetMark, withPriority, withSkipCodeBlock, wrap };

//# sourceMappingURL=index.js.map