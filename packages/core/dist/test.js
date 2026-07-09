import { C as createMarkActionsRaw, P as isProseMirrorNode, T as createNodeActionsRaw, i as setupEditorExtension, n as EditorInstance, t as Editor, z as assert } from "./editor.js";
import { NodeSelection, TextSelection } from "@prosekit/pm/state";
/**
* Pastes plain text into the editor.
*
* @example
*
* ```ts
* pasteText(editor.view, 'Hello')
* ```
*
* @internal
*/
function pasteText(view, text) {
	const clipboardData = new DataTransfer();
	clipboardData.setData("text/plain", text);
	const event = new ClipboardEvent("paste", { clipboardData });
	view.pasteText(text, event);
}
/**
* Pastes HTML into the editor.
*
* @example
*
* ```ts
* pasteHTML(editor.view, '<p>Hello <strong>world</strong></p>')
* ```
*
* @internal
*/
function pasteHTML(view, html) {
	const clipboardData = new DataTransfer();
	clipboardData.setData("text/html", html);
	const event = new ClipboardEvent("paste", { clipboardData });
	view.pasteHTML(html, event);
}
/**
* Pastes files into the editor.
*
* @example
*
* ```ts
* pasteFiles(editor.view, [new File(['hi'], 'hi.txt')])
* ```
*
* @internal
*/
function pasteFiles(view, files) {
	const clipboardData = new DataTransfer();
	for (const file of files) clipboardData.items.add(file);
	const event = new ClipboardEvent("paste", { clipboardData });
	view.pasteHTML("<div></div>", event);
}
async function readClipboardBlob(mimeType) {
	const clipboardItems = await navigator.clipboard.read();
	for (const clipboardItem of clipboardItems) if (clipboardItem.types.includes(mimeType)) return await clipboardItem.getType(mimeType);
}
/**
* Reads text of the given MIME type from the clipboard (defaults to plain text).
*
* @example
*
* ```ts
* const text = await readClipboardText()
* ```
*
* @internal
*/
async function readClipboardText(mimeType = "text/plain") {
	const blob = await readClipboardBlob(mimeType);
	if (!blob) return;
	return await blob.text();
}
/**
* Reads raw HTML from the clipboard.
*
* @example
*
* ```ts
* const html = await readClipboardHTML()
* ```
*
* @internal
*/
async function readClipboardHTML() {
	return await readClipboardText("text/html");
}
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
function maybeResolve(doc, pos) {
	if (pos != null) return doc.resolve(pos);
}
/**
* Extracts a {@link Selection} from a tagged ProseMirror document built with
* the test node builders. The position of the `<a>` token becomes the anchor,
* and the optional `<b>` token becomes the head. Returns a `TextSelection` when
* `<a>` resolves inside inline content, a `NodeSelection` when `<a>` resolves
* inside a block parent, or `undefined` when the document contains no tags.
*
* @example
*
* Extracting a `TextSelection`:
*
* ```ts
* const editor = createTestEditor({ extension })
* const n = editor.nodes
* const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
* const selection = extractSelection(doc) // TextSelection covering "Hello"
* ```
*
* @example
*
* Extracting a `NodeSelection`:
*
* ```ts
* const editor = createTestEditor({ extension })
* const n = editor.nodes
* const doc = n.doc('<a>', n.paragraph('foo'))
* const selection = extractSelection(doc) // NodeSelection on the paragraph
* ```
*
* @example
*
* A document without tags returns `undefined`:
*
* ```ts
* const editor = createTestEditor({ extension })
* const n = editor.nodes
* const doc = n.doc(n.paragraph('Hello world!'))
* const selection = extractSelection(doc) // undefined
* ```
*/
function extractSelection(doc) {
	const tagged = doc;
	const tags = tagged.tags;
	const $a = maybeResolve(tagged, tags?.a);
	const $b = maybeResolve(tagged, tags?.b);
	if ($a) if ($a.parent.inlineContent) return new TextSelection($a, $b);
	else return new NodeSelection($a);
}
/**
* @internal
*/
function getSelection(doc) {
	return extractSelection(doc) || TextSelection.atStart(doc);
}
var TestEditorInstance = class extends EditorInstance {
	constructor(extension) {
		super(extension);
		this.nodes = createNodeActionsRaw(this.schema, this.getState, createNodeForTest);
		this.marks = createMarkActionsRaw(this.schema, this.getState, applyMarkForTest);
	}
	setContent(content, selection) {
		return super.setContent(content, isProseMirrorNode(content) && !selection ? getSelection(content) : selection);
	}
};
/**
* An editor for testing purposes.
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
function createTestEditor(options) {
	return new TestEditor(new TestEditorInstance(setupEditorExtension(options)));
}
export { createTestEditor, extractSelection, pasteFiles, pasteHTML, pasteText, readClipboardHTML, readClipboardText };

//# sourceMappingURL=test.js.map