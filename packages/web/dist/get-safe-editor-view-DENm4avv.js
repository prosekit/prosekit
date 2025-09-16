//#region src/utils/get-safe-editor-view.ts
/**
* @internal
*/
function getSafeEditorView(editor) {
	if (!editor || !editor.mounted) return;
	return editor.view;
}

//#endregion
export { getSafeEditorView };
//# sourceMappingURL=get-safe-editor-view-DENm4avv.js.map