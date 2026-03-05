//#region src/utils/get-safe-editor-view.ts
/**
* @internal
*/
function getSafeEditorView(editor) {
	if (!editor || !editor.mounted) return;
	return editor.view;
}

//#endregion
export { getSafeEditorView as t };
//# sourceMappingURL=get-safe-editor-view-Dt9Amrcn.js.map