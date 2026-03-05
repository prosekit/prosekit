//#region src/queue-extension.ts
/**

@internal

Queues an extension to be added to the editor in the next task. Returns a
dispose function that can be used to remove the extension in the next task.

Why?

Let's take React as an example.

`editor.use(extension)` is synchronous. If the extension adds a node view that
is controlled by `@prosemirror-adapter/react`, adding this extension will
cause `prosemirror-adapter` to set UI state synchronously (e.g. `setState`
returned by `useState` in React).

ProseMirror is a sync-based framework. When updating node view, ProseMirror
will first stop DOMObserver, then update the DOM, then resume DOMObserver.
`prosemirror-adapter` needs to call `React.flushSync()` to update the DOM
synchronously right after React state is updated, before ProseMirror resumes
DOMObserver.

If we call `editor.use(extension)` directly in `useEffect`, we eventually are
doing something like this:

```ts
React.useEffect(() => {
React.flushSync(() => {
setState(newState)
})
}, [])
```

This breaks the async nature of React, and causes the following React
warning:

```
flushSync was called from inside a lifecycle method. React cannot flush when
React is already rendering. Consider moving this call to a scheduler task or
micro task.
```

To fix this, we need to queue the extension addition to the editor in the next
task or in the next microtask.

```ts
// In the next microtask
React.useEffect(() => {
queueMicrotask(() => {
React.flushSync(() => {
setState(newState)
})
})
}, [])

// In the next task
React.useEffect(() => {
setTimeout(() => {
React.flushSync(() => {
setState(newState)
})
})
}, [])
```

I chose to use `setTimeout` instead of `queueMicrotask` because
`queueMicrotask` causes another React act warning `An update to %s inside a
test was not wrapped in act(...)` during testing.

Although the example above is based on React, this is a general pattern for
any async based UI framework, including Svelte.

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

//#endregion
export { queueExtension };
//# sourceMappingURL=prosekit-web.js.map