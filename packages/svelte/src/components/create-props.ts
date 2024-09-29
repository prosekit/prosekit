export type CreateProps<
  Props extends { [PropName in keyof Props]: unknown },
  Events extends { [EventName in keyof Events]: CustomEvent },
> = Props & CreateEventProps<Events>

type CreateEventProps<
  Events extends { [EventName in keyof Events]: CustomEvent },
> = {
  [EventName in keyof Events as EventName extends `update:${infer Value}`
    ? `on${Capitalize<Value>}Change`
    : `on${Capitalize<string & EventName>}`]: (
    event: EventName extends `update:${string}`
      ? Events[EventName]['detail']
      : Events[EventName],
  ) => void
}
