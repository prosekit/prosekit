import { P as isProseMirrorNode, i as setupEditorExtension, n as EditorInstance, o as createMarkActions, s as createNodeActions, t as Editor, z as assert } from "./editor-Dw2IP-zb.js";
import { NodeSelection, TextSelection } from "@prosekit/pm/state";

//#region src/test/test-builder.ts
const createNodeForTest = (type, attrs, children) => {
	const tags = {};
	let pos = type === type.schema.topNodeType ? 0 : 1;
	const normalizedChildren = [];
	for (const child of children) if (child.tags) {
		for (const [key, value] of Object.entries(child.tags)) tags[key] = pos + value;
		normalizedChildren.push(child);
		pos += child.nodeSize;
	} else if (child.isText) {
		const text = child.text;
		const re = /<(a|b)>/g;
		let i = 0;
		let out = "";
		for (const match of text.matchAll(re)) {
			out += text.slice(i, match.index);
			tags[match[1]] = pos + out.length;
			i = match.index + match[0].length;
		}
		out += text.slice(i);
		if (out) {
			normalizedChildren.push(child.type.schema.text(out).mark(child.marks));
			pos += out.length;
		}
	} else {
		normalizedChildren.push(child);
		pos += child.nodeSize;
	}
	const node = type.createAndFill(attrs, normalizedChildren);
	assert(node, `Failed to create node ${type.name}`);
	node.tags = tags;
	return node;
};
const applyMarkForTest = (mark, children) => {
	return children.map((node) => {
		const newNode = node.mark(mark.addToSet(node.marks));
		newNode.tags = node.tags;
		return newNode;
	});
};

//#endregion
//#region src/test/test-editor.ts
function maybeResolve(doc, pos) {
	if (pos != null) return doc.resolve(pos);
}
function getSelection(doc) {
	const tags = doc.tags;
	const $a = maybeResolve(doc, tags?.a);
	const $b = maybeResolve(doc, tags?.b);
	if ($a) if ($a.parent.inlineContent) return new TextSelection($a, $b);
	else return new NodeSelection($a);
	return TextSelection.atStart(doc);
}
var TestEditorInstance = class extends EditorInstance {
	constructor(extension) {
		super(extension);
		this.nodes = createNodeActions(this.schema, this.getState, createNodeForTest);
		this.marks = createMarkActions(this.schema, this.getState, applyMarkForTest);
	}
	setContent(content, selection) {
		return super.setContent(content, isProseMirrorNode(content) && !selection ? getSelection(content) : selection);
	}
};
/**
* An editor for testing purposes.
* @public
*/
var TestEditor = class extends Editor {
	constructor(instance) {
		super(instance);
	}
	/**
	* Set the editor state to the given document. You can use special tokens
	* `<a>` and `<b>` to set the anchor and head positions of the selection.
	*
	* @example
	*
	* ```ts
	* const editor = createTestEditor({ extension })
	* const n = editor.nodes
	* const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
	* editor.set(doc) // "Hello" is selected.
	* ```
	*/
	set(doc) {
		return this.setContent(doc);
	}
	dispatchEvent(event) {
		this.view.dispatchEvent(event);
	}
};
/**
* @public
*/
function createTestEditor(options) {
	return new TestEditor(new TestEditorInstance(setupEditorExtension(options)));
}

//#endregion
export { createTestEditor };
//# sourceMappingURL=prosekit-core-test.js.map