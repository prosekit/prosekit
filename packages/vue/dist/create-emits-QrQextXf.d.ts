//#region src/components/create-emits.d.ts
type CreateEmits<Events extends { [EventName in keyof Events]: CustomEvent }> = { [EventName in keyof Events]: (event: EventName extends `${string}Change` ? Events[EventName]['detail'] : Events[EventName]) => void };
//#endregion
export { CreateEmits };
//# sourceMappingURL=create-emits-QrQextXf.d.ts.map