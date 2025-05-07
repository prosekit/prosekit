export declare function useEventHandlers(element: HTMLElement, eventHandlers: Record<string, (...args: any[]) => any>): {
    update(eventHandlers: Record<string, (...args: any[]) => any>): void;
    destroy(): void;
};
