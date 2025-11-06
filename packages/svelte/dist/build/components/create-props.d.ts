export type CreateProps<Props extends {
    [PropName in keyof Props]: unknown;
}, Events extends {
    [EventName in keyof Events]: CustomEvent;
}> = Props & CreateEventProps<Events>;
type CreateEventProps<Events extends {
    [EventName in keyof Events]: CustomEvent;
}> = {
    [EventName in keyof Events as `on${Capitalize<string & EventName>}`]: (event: EventName extends `${string}Change` ? Events[EventName]['detail'] : Events[EventName]) => void;
};
export {};
//# sourceMappingURL=create-props.d.ts.map