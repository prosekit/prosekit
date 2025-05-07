import { Editor, EditorNotFoundError, Priority, ProseKitError, assert, createEditor, defineDefaultState, defineFacet, defineFacetPayload, elementFromJSON, elementFromNode, getMarkType, getNodeType, htmlFromJSON, htmlFromNode, isAllSelection, isFragment, isMark, isMarkAbsent, isMarkActive, isNodeActive, isNodeSelection, isNotNullish, isProseMirrorNode, isSelection, isSlice, isTextSelection, jsonFromHTML, jsonFromNode, jsonFromState, nodeFromElement, nodeFromHTML, nodeFromJSON, rootFacet, schemaFacet, stateFacet, stateFromJSON, toReversed, union } from "./editor-BOiNwODb.js";
import { AllSelection, Plugin, PluginKey, ProseMirrorPlugin, TextSelection } from "@prosekit/pm/state";
import { ReplaceAroundStep, findWrapping, insertPoint } from "@prosekit/pm/transform";
import { baseKeymap, chainCommands, createParagraphNear, deleteSelection, joinTextblockBackward, lift, liftEmptyBlock, newlineInCode, selectNodeBackward, setBlockType as setBlockType$1, toggleMark as toggleMark$1 } from "@prosekit/pm/commands";
import { DOMSerializer, Fragment, ProseMirrorFragment, ProseMirrorNode, Slice } from "@prosekit/pm/model";
import { isElementLike } from "@ocavue/utils";
import OrderedMap from "orderedmap";
import mapValues from "just-map-values";
import clone from "just-clone";
import { history, redo, undo } from "@prosekit/pm/history";
import { keydownHandler } from "@prosekit/pm/keymap";
import { splitSplittableBlock } from "prosemirror-splittable";
import clsxLite from "clsx/lite";

//#region src/commands/add-mark.ts
/**
* Returns a command that adds the given mark with the given attributes.
*
* @public
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

//#endregion
//#region src/commands/expand-mark.ts
/**
* Expands the selection to include the entire mark at the current position.
*
* @public
*/
function expandMark(options) {
	return (state, dispatch) => {
		const markType = getMarkType(state.schema, options.type);
		const predicate = (mark) => mark.type === markType;
		const from = expandMarkBefore(state.selection.$from, predicate);
		const to = expandMarkAfter(state.selection.$to, predicate);
		if (from === state.selection.from && to === state.selection.to) return false;
		if (dispatch) dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)));
		return true;
	};
}
function expandMarkBefore($pos, predicate) {
	const { parent } = $pos;
	if (!$pos.marks().some(predicate)) return $pos.pos;
	const index = $pos.index();
	let boundaryIndex = index;
	for (let i = index; i >= 0; i--) {
		const node = parent.child(i);
		if (node.marks.some(predicate)) boundaryIndex = i;
		else break;
	}
	return $pos.posAtIndex(boundaryIndex);
}
function expandMarkAfter($pos, predicate) {
	const { parent } = $pos;
	if (!$pos.marks().some(predicate)) return $pos.pos;
	const index = Math.max(0, $pos.indexAfter() - 1);
	const childCount = parent.childCount;
	let boundaryIndex = index;
	for (let i = index; i < childCount; i++) {
		const node = parent.child(i);
		if (node.marks.some(predicate)) boundaryIndex = i;
		else break;
	}
	return $pos.posAtIndex(boundaryIndex) + parent.child(boundaryIndex).nodeSize;
}

//#endregion
//#region src/utils/default-block-at.ts
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

//#endregion
//#region src/commands/insert-default-block.ts
/**
* Returns a command that inserts a default block after current selection or at
* the given position.
*
* @public
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

//#endregion
//#region src/utils/set-selection-around.ts
function setSelectionAround(tr, pos) {
	const docSize = tr.doc.content.size;
	const $pos = tr.doc.resolve(pos > docSize ? docSize : pos < 0 ? 0 : pos);
	const selection = TextSelection.between($pos, $pos);
	tr.setSelection(selection);
}

//#endregion
//#region src/commands/insert-node.ts
/**
* Returns a command that inserts the given node at the current selection or at
* the given position.
*
* @public
*/
function insertNode(options) {
	return (state, dispatch) => {
		const node = options.node ? options.node : options.type ? getNodeType(state.schema, options.type).createAndFill(options.attrs) : null;
		assert(node, "You must provide either a node or a type");
		const insertPos = insertPoint(state.doc, options.pos ?? state.selection.anchor, node.type);
		if (insertPos == null) return false;
		if (dispatch) {
			const tr = state.tr.insert(insertPos, node);
			setSelectionAround(tr, insertPos + node.nodeSize);
			dispatch(tr);
		}
		return true;
	};
}

//#endregion
//#region src/commands/remove-mark.ts
/**
* Returns a command that removes the given mark.
*
* @public
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

//#endregion
//#region src/utils/find-parent-node.ts
/**
* Find the closest parent node that satisfies the predicate.
*
* @public
*/
function findParentNode(predicate, $pos) {
	for (let depth = $pos.depth; depth >= 0; depth -= 1) {
		const node = $pos.node(depth);
		if (predicate(node)) {
			const pos = depth === 0 ? 0 : $pos.before(depth);
			const start = $pos.start(depth);
			return {
				node,
				pos,
				start,
				depth
			};
		}
	}
}

//#endregion
//#region src/utils/find-parent-node-of-type.ts
/**
* Finds the closest parent node that matches the given node type.
*
* @public
*/
function findParentNodeOfType(type, $pos) {
	const nodeType = getNodeType($pos.doc.type.schema, type);
	return findParentNode((node) => node.type === nodeType, $pos);
}

//#endregion
//#region src/commands/remove-node.ts
/**
* Returns a command to remove the nearest ancestor node of a specific type from the current position.
*
* @public
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

//#endregion
//#region src/utils/get-custom-selection.ts
function getCustomSelection(state, from, to) {
	const pos = from ?? to;
	if (pos != null) {
		const $from = state.doc.resolve(from ?? pos);
		const $to = state.doc.resolve(to ?? pos);
		return TextSelection.between($from, $to);
	}
	return state.selection;
}

//#endregion
//#region src/commands/set-block-type.ts
/**
* Returns a command that tries to set the selected textblocks to the given node
* type with the given attributes.
*
* @public
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

//#endregion
//#region src/utils/get-node-types.ts
/**
* @internal
*/
function getNodeTypes(schema, types) {
	if (Array.isArray(types)) return types.map((type) => getNodeType(schema, type));
	return [getNodeType(schema, types)];
}

//#endregion
//#region src/commands/set-node-attrs.ts
/**
* Returns a command that set the attributes of the current node.
*
* @public
*/
function setNodeAttrs(options) {
	return (state, dispatch) => {
		const nodeTypes = getNodeTypes(state.schema, options.type);
		const from = options.pos ?? state.selection.from;
		const to = options.pos ?? state.selection.to;
		const positions = [];
		state.doc.nodesBetween(from, to, (node, pos) => {
			if (nodeTypes.includes(node.type)) positions.push(pos);
			if (!dispatch && positions.length > 0) return false;
		});
		if (positions.length === 0) return false;
		if (dispatch) {
			const { tr } = state;
			for (const pos of positions) for (const [key, value] of Object.entries(options.attrs)) tr.setNodeAttribute(pos, key, value);
			dispatch(tr);
		}
		return true;
	};
}

//#endregion
//#region src/commands/toggle-mark.ts
/**
* Returns a command that toggles the given mark with the given attributes.
*
* @param options
*
* @public
*/
function toggleMark({ type, attrs, removeWhenPresent = false, enterInlineAtoms = true }) {
	return (state, dispatch, view) => {
		return toggleMark$1(getMarkType(state.schema, type), attrs, {
			removeWhenPresent,
			enterInlineAtoms
		})(state, dispatch, view);
	};
}

//#endregion
//#region src/commands/toggle-node.ts
/**
* Returns a command that set the selected textblocks to the given node type
* with the given attributes.
*
* @param options
*
* @public
*/
function toggleNode({ type, attrs }) {
	return (state, dispatch, view) => {
		if (isNodeActive(state, type, attrs)) {
			const defaultType = state.schema.topNodeType.contentMatch.defaultType;
			if (!defaultType) return false;
			return setBlockType$1(defaultType)(state, dispatch, view);
		} else {
			const nodeType = getNodeType(state.schema, type);
			return setBlockType$1(nodeType, attrs)(state, dispatch, view);
		}
	};
}

//#endregion
//#region src/commands/wrap.ts
/**
* Returns a command that wraps the selected textblock with the given node type.
*
* @param options
*
* @public
*/
function wrap(options) {
	return (state, dispatch) => {
		const { $from, $to } = state.selection;
		const range = $from.blockRange($to);
		if (!range) return false;
		const nodeType = getNodeType(state.schema, options.nodeType || options.type);
		const wrapping = findWrapping(range, nodeType, options.attrs);
		if (!wrapping) return false;
		dispatch?.(state.tr.wrap(range, wrapping));
		return true;
	};
}

//#endregion
//#region src/commands/toggle-wrap.ts
/**
* Toggle between wrapping an inactive node with the provided node type, and
* lifting it up into it's parent.
*
* @param options
*
* @public
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

//#endregion
//#region src/commands/unset-block-type.ts
/**
* Returns a command that set the type of all textblocks between the given range
* to the default type (usually `paragraph`).
*
* @public
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

//#endregion
//#region src/commands/unset-mark.ts
/**
* Returns a command that removes all marks.
*
* @public
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

//#endregion
//#region src/editor/with-priority.ts
/**
* Return an new extension with the given priority.
*
* @example
* ```ts
* import { Priority, withPriority } from 'prosekit/core'
*
* const extension = withPriority(defineMyExtension(), Priority.high)
* ```
*
* @public
*/
function withPriority(extension, priority) {
	const result = union(extension);
	result.priority = priority;
	return result;
}

//#endregion
//#region src/extensions/plugin.ts
/**
* Adds a ProseMirror plugin to the editor.
*
* @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
* function that returns one or multiple plugins.
*
* @public
*/
function definePlugin(plugin) {
	if (plugin instanceof Plugin || Array.isArray(plugin) && plugin.every((p) => p instanceof Plugin)) return definePluginPayload(() => plugin);
	if (typeof plugin === "function") return definePluginPayload(plugin);
	throw new TypeError("Invalid plugin");
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
			plugins.reverse();
			return { plugins };
		};
	},
	parent: stateFacet
});

//#endregion
//#region src/extensions/clipboard-serializer.ts
function mergeWrappers(wrappers) {
	return (fn) => wrappers.filter(isNotNullish).reduce((fn$1, wrapper) => wrapper(fn$1), fn);
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
		const fn = (...args$1) => super.serializeFragment(...args$1);
		return wrapFunction(fn, this.serializeFragmentWrapper)(...args);
	}
	serializeNode(...args) {
		const fn = (...args$1) => super.serializeNode(...args$1);
		return wrapFunction(fn, this.serializeNodeWrapper)(...args);
	}
};
function createCustomDOMSerializer(schema, options) {
	const nodesFromSchema = (...args) => DOMSerializer.nodesFromSchema(...args);
	const marksFromSchema = (...args) => DOMSerializer.marksFromSchema(...args);
	const nodes = wrapFunction(nodesFromSchema, options.nodesFromSchemaWrapper)(schema);
	const marks = wrapFunction(marksFromSchema, options.marksFromSchemaWrapper)(schema);
	return new CustomDOMSerializer(nodes, marks, options.serializeFragmentWrapper, options.serializeNodeWrapper);
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

//#endregion
//#region src/commands/insert-text.ts
/**
* Returns a command that inserts the given text.
*
* @public
*/
function insertText({ text, from, to }) {
	return (state, dispatch) => {
		if (text) dispatch?.(state.tr.insertText(text, from, to));
		return true;
	};
}

//#endregion
//#region src/commands/select-all.ts
/**
* Returns a command that selects the whole document.
*
* @public
*/
function selectAll() {
	return (state, dispatch) => {
		dispatch?.(state.tr.setSelection(new AllSelection(state.doc)));
		return true;
	};
}

//#endregion
//#region src/facets/command.ts
const commandFacet = defineFacet({
	reducer: (inputs) => {
		const commands$1 = Object.assign({}, ...inputs);
		return { commands: commands$1 };
	},
	parent: rootFacet,
	singleton: true
});

//#endregion
//#region src/extensions/command.ts
function defineCommands(commands$1) {
	return defineFacetPayload(commandFacet, [commands$1]);
}
/**
* Add some base commands
*
* @public
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
		insertDefaultBlock,
		selectAll,
		addMark,
		removeMark,
		unsetBlockType,
		unsetMark
	});
}

//#endregion
//#region src/facets/schema-spec.ts
const schemaSpecFacet = defineFacet({
	reducer: (specs) => {
		let nodes = OrderedMap.from({});
		let marks = OrderedMap.from({});
		let topNode = void 0;
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

//#endregion
//#region src/utils/array-grouping.ts
function groupBy(items, keySelector) {
	const result = {};
	for (const item of items) {
		const key = keySelector(item);
		const values = result[key] ||= [];
		values.push(item);
	}
	return result;
}
function groupEntries(entries) {
	const result = {};
	for (const [key, value] of entries) {
		const values = result[key] ||= [];
		values.push(value);
	}
	return result;
}

//#endregion
//#region src/utils/remove-undefined-values.ts
function removeUndefinedValues(obj) {
	const result = {};
	for (const [key, value] of Object.entries(obj)) if (value !== void 0) result[key] = value;
	return result;
}

//#endregion
//#region src/utils/merge-objects.ts
function mergeObjects(...objects) {
	const filteredObjects = objects.filter(isNotNullish).map(removeUndefinedValues);
	return Object.assign({}, ...filteredObjects);
}

//#endregion
//#region src/utils/merge-specs.ts
function mergeSpecs(a, b) {
	const attrs = {};
	const attrNames = new Set([...Object.keys(a.attrs ?? {}), ...Object.keys(b.attrs ?? {})]);
	for (const name of attrNames) {
		const attrSpecA = a.attrs?.[name];
		const attrSpecB = b.attrs?.[name];
		const attrSpecMerged = mergeObjects(attrSpecA, attrSpecB);
		if (attrSpecMerged) attrs[name] = attrSpecMerged;
	}
	const parseDOM = [...a.parseDOM ?? [], ...b.parseDOM ?? []];
	return mergeObjects(a, b, {
		attrs,
		parseDOM
	});
}

//#endregion
//#region src/utils/output-spec.ts
function wrapOutputSpecAttrs(toDOM, options) {
	return (node, ...args) => {
		const dom = toDOM(node, ...args);
		const pairs = options.map((option) => option.toDOM?.(node.attrs[option.attr])).filter(isNotNullish);
		return insertOutputSpecAttrs(dom, pairs);
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
	if (isElementLike(dom)) return setElementAttributes(dom, attrs);
	if (typeof dom === "object" && "dom" in dom && isElementLike(dom.dom)) return {
		...dom,
		dom: setElementAttributes(dom.dom, attrs)
	};
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

//#endregion
//#region src/extensions/node-spec.ts
/**
* Defines a node type.
*
* @public
*/
function defineNodeSpec(options) {
	const payload = [options, void 0];
	return defineFacetPayload(nodeSpecFacet, [payload]);
}
/**
* Defines an attribute for a node type.
*
* @public
*/
function defineNodeAttr(options) {
	const payload = [void 0, options];
	return defineFacetPayload(nodeSpecFacet, [payload]);
}
const nodeSpecFacet = defineFacet({
	reducer: (payloads) => {
		let specs = OrderedMap.from({});
		let topNodeName = void 0;
		const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish);
		const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish);
		for (const { name, topNode,...spec } of specPayloads) {
			if (topNode) topNodeName = name;
			const prevSpec = specs.get(name);
			if (prevSpec) specs = specs.update(name, mergeSpecs(prevSpec, spec));
			else specs = specs.addToStart(name, spec);
		}
		const groupedAttrs = groupBy(attrPayloads, (payload) => payload.type);
		for (const [type, attrs] of Object.entries(groupedAttrs)) {
			if (!attrs) continue;
			const maybeSpec = specs.get(type);
			assert(maybeSpec, `Node type ${type} must be defined`);
			const spec = clone(maybeSpec);
			if (!spec.attrs) spec.attrs = {};
			for (const attr of attrs) spec.attrs[attr.attr] = {
				default: attr.default,
				validate: attr.validate,
				splittable: attr.splittable
			};
			if (spec.toDOM) spec.toDOM = wrapOutputSpecAttrs(spec.toDOM, attrs);
			if (spec.parseDOM) spec.parseDOM = spec.parseDOM.map((rule) => wrapTagParseRuleAttrs(rule, attrs));
			specs = specs.update(type, spec);
		}
		return {
			nodes: specs,
			topNode: topNodeName
		};
	},
	parent: schemaSpecFacet,
	singleton: true
});

//#endregion
//#region src/extensions/doc.ts
/**
* @public
*
* @deprecated Use the following import instead:
*
* ```ts
* import { defineDoc } from 'prosekit/extensions/doc'
* ```
*/
function defineDoc() {
	console.warn("[prosekit] The `defineDoc` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineDoc } from \"prosekit/extensions/doc\"`.");
	return defineNodeSpec({
		name: "doc",
		content: "block+",
		topNode: true
	});
}

//#endregion
//#region src/extensions/events/plugin-view.ts
/**
* Registers a event handler that is called when the editor view is mounted.
*
* @public
*/
function defineMountHandler(handler) {
	return definePluginViewFacetPayload(["mount", handler]);
}
/**
* Registers a event handler that is called when the editor state is updated.
*
* @public
*/
function defineUpdateHandler(handler) {
	return definePluginViewFacetPayload(["update", handler]);
}
/**
* Registers a event handler that is called when the editor view is unmounted.
*
* @public
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
				mountHandlers.forEach((fn) => fn(view));
				return {
					update: (view$1, prevState) => {
						updateHandlers.forEach((fn) => fn(view$1, prevState));
					},
					destroy: () => {
						unmountHandlers.forEach((fn) => fn());
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

//#endregion
//#region src/extensions/events/doc-change.ts
/**
* Registers a event handler that is called when the editor document is changed.
*
* @public
*/
function defineDocChangeHandler(handler) {
	return defineUpdateHandler((view, prevState) => {
		if (!view.state.doc.eq(prevState.doc)) handler(view, prevState);
	});
}

//#endregion
//#region src/utils/combine-event-handlers.ts
function combineEventHandlers() {
	let handlers = [];
	function setHandlers(eventHandlers) {
		handlers = toReversed(eventHandlers);
	}
	function combinedEventHandler(...args) {
		for (const handler of handlers) if (handler(...args)) return true;
		return false;
	}
	return [setHandlers, combinedEventHandler];
}

//#endregion
//#region src/extensions/events/dom-event.ts
/**
* @internal
*/
function defineDomEventFacetPayload(...payloads) {
	return defineFacetPayload(domEventFacet, payloads);
}
/**
* Register a new event handler for the given event type.
*
* @public
*/
function defineDOMEventHandler(event, handler) {
	return defineDomEventFacetPayload([event, handler]);
}
/**
* @internal
*/
const domEventFacet = defineFacet({
	reduce: () => {
		const setHandlersMap = {};
		const combinedHandlerMap = {};
		let plugin;
		const update = (payloads) => {
			let hasNewEvent = false;
			for (const [event] of payloads) if (!setHandlersMap[event]) {
				hasNewEvent = true;
				const [setHandlers, combinedHandler] = combineEventHandlers();
				setHandlersMap[event] = setHandlers;
				const e = (view, eventObject) => {
					return combinedHandler(view, eventObject);
				};
				combinedHandlerMap[event] = e;
			}
			const map = groupEntries(payloads);
			for (const [event, setHandlers] of Object.entries(setHandlersMap)) {
				const handlers = map[event] ?? [];
				setHandlers(handlers);
			}
			if (hasNewEvent) plugin = new ProseMirrorPlugin({
				key: new PluginKey("prosekit-dom-event-handler"),
				props: { handleDOMEvents: combinedHandlerMap }
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

//#endregion
//#region src/extensions/events/editor-event.ts
function defineEventFacetPayload(payload) {
	return defineFacetPayload(editorEventFacet, [payload]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown}
*/
function defineKeyDownHandler(handler) {
	return defineEventFacetPayload(["keyDown", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress}
*/
function defineKeyPressHandler(handler) {
	return defineEventFacetPayload(["keyPress", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput}
*/
function defineTextInputHandler(handler) {
	return defineEventFacetPayload(["textInput", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn}
*/
function defineClickOnHandler(handler) {
	return defineEventFacetPayload(["clickOn", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClick}
*/
function defineClickHandler(handler) {
	return defineEventFacetPayload(["click", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn}
*/
function defineDoubleClickOnHandler(handler) {
	return defineEventFacetPayload(["doubleClickOn", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick}
*/
function defineDoubleClickHandler(handler) {
	return defineEventFacetPayload(["doubleClick", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn}
*/
function defineTripleClickOnHandler(handler) {
	return defineEventFacetPayload(["tripleClickOn", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick}
*/
function defineTripleClickHandler(handler) {
	return defineEventFacetPayload(["tripleClick", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste}
*/
function definePasteHandler(handler) {
	return defineEventFacetPayload(["paste", handler]);
}
/**
* @public
*
* See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop}
*/
function defineDropHandler(handler) {
	return defineEventFacetPayload(["drop", handler]);
}
/**
* @public
*
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
	const plugin = new ProseMirrorPlugin({
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
	});
	return [update, plugin];
}

//#endregion
//#region src/extensions/events/focus.ts
/**
* Registers a event handler that is called when the editor gains or loses focus.
*
* @public
*/
function defineFocusChangeHandler(handler) {
	const handleFocus = () => handler(true);
	const handleBlur = () => handler(false);
	return defineDomEventFacetPayload(["focus", handleFocus], ["blur", handleBlur]);
}

//#endregion
//#region src/utils/env.ts
/**
* @private
*/
const isApple = typeof navigator !== "undefined" ? /Mac|iP(hone|[ao]d)/.test(navigator.platform) : false;

//#endregion
//#region src/extensions/keymap.ts
/**
* @public
*/
function defineKeymap(keymap$1) {
	return defineFacetPayload(keymapFacet, [keymap$1]);
}
/**
* @internal
*/
const keymapFacet = defineFacet({
	reduce: () => {
		let handler;
		const handlerWrapper = (view, event) => {
			if (handler) return handler(view, event);
			return false;
		};
		const plugin = new Plugin({
			key: keymapPluginKey,
			props: { handleKeyDown: handlerWrapper }
		});
		return (keymaps) => {
			handler = keydownHandler(mergeKeymaps(
				// The keymap at the end have a higher priority.
				toReversed(keymaps)
));
			return plugin;
		};
	},
	parent: pluginFacet,
	singleton: true
});
function mergeKeymaps(keymaps) {
	const bindings = {};
	for (const keymap$1 of keymaps) for (const [key, command] of Object.entries(keymap$1)) {
		const commands$1 = bindings[key] || (bindings[key] = []);
		commands$1.push(command);
	}
	return mapValues(bindings, mergeCommands);
}
function mergeCommands(commands$1) {
	return chainCommands(...commands$1);
}
const keymapPluginKey = new PluginKey("prosekit-keymap");

//#endregion
//#region src/extensions/history.ts
const keymap = {
	"Mod-z": undo,
	"Shift-Mod-z": redo
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
*
* @public
*/
function defineHistory({ depth = 200, newGroupDelay = 250 } = {}) {
	return union(definePlugin(history({
		depth,
		newGroupDelay
	})), defineKeymap(keymap), defineCommands(commands));
}

//#endregion
//#region src/extensions/keymap-base.ts
const customEnter = chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitSplittableBlock);
const customBackspace = chainCommands(deleteSelection, joinTextblockBackward, selectNodeBackward);
const customBaseKeymap = {
	...baseKeymap,
	Enter: customEnter,
	Backspace: customBackspace
};
/**
* Defines some basic key bindings.
*
* @public
*/
function defineBaseKeymap(options) {
	const priority = options?.priority ?? Priority.low;
	return withPriority(defineKeymap(customBaseKeymap), priority);
}

//#endregion
//#region src/extensions/mark-spec.ts
/**
* @public
*/
function defineMarkSpec(options) {
	const payload = [options, void 0];
	return defineFacetPayload(markSpecFacet, [payload]);
}
/**
* @public
*/
function defineMarkAttr(options) {
	const payload = [void 0, options];
	return defineFacetPayload(markSpecFacet, [payload]);
}
const markSpecFacet = defineFacet({
	reducer: (payloads) => {
		let specs = OrderedMap.from({});
		const specPayloads = payloads.map((input) => input[0]).filter(isNotNullish);
		const attrPayloads = payloads.map((input) => input[1]).filter(isNotNullish);
		for (const { name,...spec } of specPayloads) {
			const prevSpec = specs.get(name);
			if (prevSpec) specs = specs.update(name, mergeSpecs(prevSpec, spec));
			else specs = specs.addToStart(name, spec);
		}
		const groupedAttrs = groupBy(attrPayloads, (payload) => payload.type);
		for (const [type, attrs] of Object.entries(groupedAttrs)) {
			if (!attrs) continue;
			const maybeSpec = specs.get(type);
			assert(maybeSpec, `Mark type ${type} must be defined`);
			const spec = clone(maybeSpec);
			if (!spec.attrs) spec.attrs = {};
			for (const attr of attrs) spec.attrs[attr.attr] = {
				default: attr.default,
				validate: attr.validate
			};
			if (spec.toDOM) spec.toDOM = wrapOutputSpecAttrs(spec.toDOM, attrs);
			if (spec.parseDOM) spec.parseDOM = spec.parseDOM.map((rule) => wrapParseRuleAttrs(rule, attrs));
			specs = specs.update(type, spec);
		}
		return {
			marks: specs,
			nodes: {}
		};
	},
	parent: schemaSpecFacet,
	singleton: true
});
function wrapParseRuleAttrs(rule, attrs) {
	if (rule.tag) return wrapTagParseRuleAttrs(rule, attrs);
	return rule;
}

//#endregion
//#region src/extensions/mark-view.ts
function defineMarkView(options) {
	return defineFacetPayload(markViewFacet, [options]);
}
const markViewFacet = defineFacet({
	reducer: (inputs) => {
		const markViews = {};
		for (const input of inputs) if (!markViews[input.name]) markViews[input.name] = input.constructor;
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-mark-view"),
			props: { markViews }
		})];
	},
	parent: pluginFacet
});

//#endregion
//#region src/extensions/mark-view-effect.ts
/**
* @internal
*/
function defineMarkViewFactory(options) {
	const input = [options, null];
	return defineFacetPayload(markViewFactoryFacet, [input]);
}
/**
* @internal
*/
function defineMarkViewComponent(options) {
	const input = [null, options];
	return defineFacetPayload(markViewFactoryFacet, [input]);
}
const isServer$1 = typeof window === "undefined";
const markViewFactoryFacet = defineFacet({
	reducer: (inputs) => {
		if (isServer$1) return [];
		const markViews = {};
		const factories = inputs.map((x) => x[0]).filter(isNotNullish);
		const options = inputs.map((x) => x[1]).filter(isNotNullish);
		for (const { group, name, args } of options) {
			const factory = factories.find((factory$1) => factory$1.group === group);
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

//#endregion
//#region src/extensions/node-view.ts
function defineNodeView(options) {
	return defineFacetPayload(nodeViewFacet, [options]);
}
const nodeViewFacet = defineFacet({
	reducer: (inputs) => {
		const nodeViews = {};
		for (const input of inputs) if (!nodeViews[input.name]) nodeViews[input.name] = input.constructor;
		return () => [new ProseMirrorPlugin({
			key: new PluginKey("prosekit-node-view"),
			props: { nodeViews }
		})];
	},
	parent: pluginFacet
});

//#endregion
//#region src/extensions/node-view-effect.ts
/**
* @internal
*/
function defineNodeViewFactory(options) {
	const input = [options, null];
	return defineFacetPayload(nodeViewFactoryFacet, [input]);
}
/**
* @internal
*/
function defineNodeViewComponent(options) {
	const input = [null, options];
	return defineFacetPayload(nodeViewFactoryFacet, [input]);
}
const isServer = typeof window === "undefined";
const nodeViewFactoryFacet = defineFacet({
	reducer: (inputs) => {
		if (isServer) return [];
		const nodeViews = {};
		const factories = inputs.map((x) => x[0]).filter(isNotNullish);
		const options = inputs.map((x) => x[1]).filter(isNotNullish);
		for (const { group, name, args } of options) {
			const factory = factories.find((factory$1) => factory$1.group === group);
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

//#endregion
//#region src/extensions/paragraph.ts
/**
* Defines a paragraph node spec.
*/
function defineParagraphSpec() {
	return defineNodeSpec({
		name: "paragraph",
		content: "inline*",
		group: "block",
		parseDOM: [{ tag: "p" }],
		toDOM() {
			return ["p", 0];
		}
	});
}
/**
* @public
*
* Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.
*
* @deprecated Use the following import instead:
*
* ```ts
* import { defineParagraph } from 'prosekit/extensions/paragraph'
* ```
*/
function defineParagraph() {
	console.warn("[prosekit] The `defineParagraph` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineParagraph } from \"prosekit/extensions/paragraph\"`.");
	return withPriority(defineParagraphSpec(), Priority.highest);
}

//#endregion
//#region src/extensions/text.ts
/**
* @public
*
* @deprecated Use the following import instead:
*
* ```ts
* import { defineText } from 'prosekit/extensions/text'
* ```
*/
function defineText() {
	console.warn("[prosekit] The `defineText` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineText } from \"prosekit/extensions/text\"`.");
	return defineNodeSpec({
		name: "text",
		group: "inline"
	});
}

//#endregion
//#region src/utils/cache.ts
function cache(fn) {
	let result = void 0;
	return () => {
		if (result === void 0) result = fn();
		return result;
	};
}

//#endregion
//#region src/utils/can-use-regex-lookbehind.ts
const canUseRegexLookbehind = cache(() => {
	try {
		return "ab".replace(new RegExp("(?<=a)b", "g"), "c") === "ac";
	} catch {
		return false;
	}
});

//#endregion
//#region src/utils/clsx.ts
/**
* A utility for constructing `className` strings conditionally.
*
* It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.
*
* @public
*/
const clsx = clsxLite;

//#endregion
//#region src/utils/collect-children.ts
/**
* Collects all children of a node or a fragment, and returns them as an array.
*
* @public
*/
function collectChildren(parent) {
	const children = [];
	for (let i = 0; i < parent.childCount; i++) children.push(parent.child(i));
	return children;
}

//#endregion
//#region src/utils/collect-nodes.ts
/**
* Collects all nodes from a given content.
*
* @deprecated Use `collectChildren` instead.
*
* @public
*/
function collectNodes(content) {
	if (Array.isArray(content)) return content.flatMap(collectNodes);
	if (content instanceof ProseMirrorNode) return [content];
	if (content instanceof ProseMirrorFragment) {
		const nodes = [];
		for (let i = 0; i < content.childCount; i++) nodes.push(content.child(i));
		return nodes;
	}
	throw new ProseKitError(`Invalid node content: ${typeof content}`);
}

//#endregion
//#region src/utils/contains-inline-node.ts
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

//#endregion
//#region src/utils/get-id.ts
let id = 0;
/**
* Returns a unique id in the current process that can be used in various places.
*
* @internal
*/
function getId() {
	id = (id + 1) % Number.MAX_SAFE_INTEGER;
	return `id:${id}`;
}

//#endregion
//#region src/utils/is-at-block-start.ts
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

//#endregion
//#region src/utils/is-in-code-block.ts
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

//#endregion
//#region src/utils/maybe-run.ts
/**
* @internal
*/
function maybeRun(value, ...args) {
	return typeof value === "function" ? value(...args) : value;
}

//#endregion
//#region src/utils/unicode.ts
/**
* @internal
*/
const OBJECT_REPLACEMENT_CHARACTER = "￼";

//#endregion
//#region src/utils/with-skip-code-block.ts
/**
* @internal
*/
function withSkipCodeBlock(command) {
	return (state, dispatch, view) => {
		if (isInCodeBlock(state.selection)) return false;
		return command(state, dispatch, view);
	};
}

//#endregion
export { Editor, EditorNotFoundError, OBJECT_REPLACEMENT_CHARACTER, Priority, ProseKitError, getId as _getId, addMark, assert, canUseRegexLookbehind, clsx, collectChildren, collectNodes, containsInlineNode, createEditor, defaultBlockAt, defineBaseCommands, defineBaseKeymap, defineClickHandler, defineClickOnHandler, defineClipboardSerializer, defineCommands, defineDOMEventHandler, defineDefaultState, defineDoc, defineDocChangeHandler, defineDoubleClickHandler, defineDoubleClickOnHandler, defineDropHandler, defineFacet, defineFacetPayload, defineFocusChangeHandler, defineHistory, defineKeyDownHandler, defineKeyPressHandler, defineKeymap, defineMarkAttr, defineMarkSpec, defineMarkView, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeAttr, defineNodeSpec, defineNodeView, defineNodeViewComponent, defineNodeViewFactory, defineParagraph, definePasteHandler, definePlugin, defineScrollToSelectionHandler, defineText, defineTextInputHandler, defineTripleClickHandler, defineTripleClickOnHandler, defineUnmountHandler, defineUpdateHandler, editorEventFacet, elementFromJSON, elementFromNode, expandMark, findParentNode, findParentNodeOfType, getMarkType, getNodeType, htmlFromJSON, htmlFromNode, insertDefaultBlock, insertNode, isAllSelection, isApple, isAtBlockStart, isFragment, isInCodeBlock, isMark, isMarkAbsent, isMarkActive, isNodeSelection, isProseMirrorNode, isSelection, isSlice, isTextSelection, jsonFromHTML, jsonFromNode, jsonFromState, keymapFacet, maybeRun, nodeFromElement, nodeFromHTML, nodeFromJSON, pluginFacet, removeMark, removeNode, setBlockType, setNodeAttrs, setSelectionAround, stateFromJSON, toggleMark, toggleNode, toggleWrap, union, unsetBlockType, unsetMark, withPriority, withSkipCodeBlock, wrap };