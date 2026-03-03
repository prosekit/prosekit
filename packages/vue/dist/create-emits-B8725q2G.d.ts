//#region src/components/create-emits.d.ts
type CreateEmits<Events extends { [EventName in keyof Events]: CustomEvent }> = { [EventName in keyof Events]: (event: EventName extends `${string}Change` ? Events[EventName]['detail'] : Events[EventName]) => void };
//#endregion
export { CreateEmits as t };
//# sourceMappingURL=create-emits-B8725q2G.d.ts.map