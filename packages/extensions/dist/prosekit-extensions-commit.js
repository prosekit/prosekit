import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { defineDefaultState, definePlugin, jsonFromNode, union } from "@prosekit/core";
import { Decoration, DecorationSet } from "@prosekit/pm/view";
import { DOMSerializer, Fragment, Slice } from "@prosekit/pm/model";
import { Step } from "@prosekit/pm/transform";
import { ChangeSet } from "prosemirror-changeset";

//#region src/commit/index.ts
function getChanges(doc, parent, steps) {
	return ChangeSet.create(parent).addSteps(doc, steps.map((step) => step.getMap()), null).changes;
}
function renderDivWeight(view) {
	return view.dom.ownerDocument.createElement("div");
}
function decorateDeletionSlice(slice) {
	let { openStart, openEnd, content } = slice;
	while (openStart > 0 && openEnd > 0 && content.childCount === 1) {
		openStart--;
		openEnd--;
		content = content.child(0).content;
	}
	if (content.childCount === 0) return [];
	if (openStart > 0 && openEnd > 0 && content.childCount === 2) {
		const head = Fragment.from([content.child(0)]);
		const tail = Fragment.from([content.child(1)]);
		return [
			...decorateDeletionSlice(new Slice(head, openStart, openStart)),
			renderDivWeight,
			...decorateDeletionSlice(new Slice(tail, openEnd, openEnd))
		];
	}
	if (openStart > 0 && content.childCount >= 2) {
		const nodes = content.content;
		const head = Fragment.from(nodes.slice(0, 1));
		const body = Fragment.from(nodes.slice(1));
		return [...decorateDeletionSlice(new Slice(head, openStart, openStart)), ...decorateDeletionSlice(new Slice(body, 0, openEnd))];
	}
	if (openEnd > 0 && content.childCount >= 2) {
		const nodes = content.content;
		const body = Fragment.from(nodes.slice(0, -1));
		const tail = Fragment.from(nodes.slice(-1));
		return [...decorateDeletionSlice(new Slice(body, openStart, 0)), ...decorateDeletionSlice(new Slice(tail, openEnd, openEnd))];
	}
	const schema = content.child(0).type.schema;
	const isInline = content.child(0).isInline;
	const render = (view) => {
		const document = view.dom.ownerDocument;
		const element = document.createElement(isInline ? "span" : "div");
		DOMSerializer.fromSchema(schema).serializeFragment(content, { document }, element);
		element.classList.add("prosekit-commit-deletion");
		return element;
	};
	return [render];
}
function decorateDeletion(doc, from, to, pos) {
	const renders = decorateDeletionSlice(doc.slice(from, to));
	const count = renders.length;
	return renders.map((render, index) => Decoration.widget(pos, render, {
		side: -20 - count + index,
		ignoreSelection: true
	}));
}
function decorateAddition(from, to) {
	return Decoration.inline(from, to, { class: "prosekit-commit-addition" });
}
function decorateChange(prev, change) {
	const { fromA, toA, fromB, toB } = change;
	const decorations = [];
	if (fromA < toA) decorations.push(...decorateDeletion(prev, fromA, toA, fromB));
	if (fromB < toB) decorations.push(decorateAddition(fromB, toB));
	return decorations;
}
function decorateCommit(doc, parent, steps) {
	const decorations = getChanges(doc, parent, steps).flatMap((change) => decorateChange(parent, change));
	return DecorationSet.create(doc, decorations);
}
function defineCommitDecoration(commit) {
	const key = new PluginKey("prosekit-commit-decoration");
	return definePlugin(({ schema }) => {
		const parent = schema.nodeFromJSON(commit.parent);
		const steps = commit.steps.map((step) => Step.fromJSON(schema, step));
		return new ProseMirrorPlugin({
			key,
			state: {
				init: (_, instance) => {
					return decorateCommit(instance.doc, parent, steps);
				},
				apply: (tr, deco) => {
					return deco.map(tr.mapping, tr.doc);
				}
			},
			props: { decorations: (state) => {
				return key.getState(state);
			} }
		});
	});
}
/**
* Define an extension to display the changes from the given commit in the editor.
*/
function defineCommitViewer(commit) {
	return union(defineDefaultState({ defaultContent: commit.doc }), defineCommitDecoration(commit));
}
var CommitRecorder = class {
	constructor() {
		this.parent = null;
		this.doc = null;
		this.steps = [];
	}
	/**
	* Return a commit object including all changes since the last commit. `null`
	* will be returned if there is no change.
	*/
	commit() {
		if (!this.parent || !this.doc || this.steps.length === 0 || this.parent.eq(this.doc)) return null;
		const commit = {
			doc: jsonFromNode(this.doc),
			parent: jsonFromNode(this.parent),
			steps: this.steps.map((step) => step.toJSON())
		};
		this.init(this.doc);
		return commit;
	}
	/**
	* @internal
	*/
	init(doc) {
		this.doc = doc;
		this.parent = doc;
		this.steps = [];
	}
	/**
	* @internal
	*/
	apply(tr) {
		this.steps.push(...tr.steps);
		this.doc = tr.doc;
	}
};
/**
* Define an extension that can record the changes in the editor.
*/
function defineCommitRecorder(commitRecorder) {
	return definePlugin(new ProseMirrorPlugin({
		key: new PluginKey("prosekit-commit-recorder"),
		state: {
			init: (_, state) => {
				commitRecorder.init(state.doc);
			},
			apply: (tr) => {
				commitRecorder.apply(tr);
			}
		}
	}));
}

//#endregion
export { CommitRecorder, defineCommitRecorder, defineCommitViewer };
//# sourceMappingURL=prosekit-extensions-commit.js.map