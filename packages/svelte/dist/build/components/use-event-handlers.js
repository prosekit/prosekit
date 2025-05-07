export function useEventHandlers(element, eventHandlers) {
    const disposes = [];
    const update = (eventHandlers) => {
        disposes.forEach((dispose) => dispose());
        disposes.length = 0;
        for (const [name, handler] of Object.entries(eventHandlers)) {
            element.addEventListener(name, handler);
            disposes.push(() => element.removeEventListener(name, handler));
        }
    };
    update(eventHandlers);
    return {
        update(eventHandlers) {
            update(eventHandlers);
        },
        destroy() {
            update({});
        },
    };
}
