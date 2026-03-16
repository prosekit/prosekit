export interface TypedEventTarget_v2<EventMap extends Record<string, Event>> {
  addEventListener<type extends keyof EventMap>(
    type: type,
    listener: TypedEventListener_v2<EventMap>[type],
    options?: AddEventListenerOptions,
  ): void
  removeEventListener<type extends keyof EventMap>(
    type: type,
    listener: TypedEventListener_v2<EventMap>[type],
    options?: EventListenerOptions,
  ): void
}

type TypedEventListener_v2<EventMap> = {
  [key in keyof EventMap]: (event: EventMap[key]) => void
}
