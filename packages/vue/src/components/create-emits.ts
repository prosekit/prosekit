export type CreateEmits<
  Events extends { [EventName in keyof Events]: CustomEvent },
> = {
  [EventName in keyof Events]: (
    event: EventName extends `${string}Change` ? Events[EventName]['detail']
      : Events[EventName],
  ) => void
}
