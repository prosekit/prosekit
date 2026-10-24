/**
* Queues an extension to be added to the editor in the next task. Returns a
* dispose function that can be used to remove the extension in the next task.
*
* @internal
*/
function queueExtension(editor, extension) {
	let canceled = false;
	let dispose;
	const timeout = setTimeout(() => {
		if (canceled) return;
		dispose?.();
		dispose = editor.use(extension);
	});
	return () => {
		canceled = true;
		clearTimeout(timeout);
		setTimeout(() => {
			dispose?.();
			dispose = void 0;
		});
	};
}
export { queueExtension };

//# sourceMappingURL=index.js.map