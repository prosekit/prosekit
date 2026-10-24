/**
* @internal
*/
function getSafeEditorView(editor) {
	if (!editor || !editor.mounted) return;
	return editor.view;
}
export { getSafeEditorView as t };

//# sourceMappingURL=get-safe-editor-view.js.map