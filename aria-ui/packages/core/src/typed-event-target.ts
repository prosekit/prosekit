/**
 * An interface that can be used to register event listeners.
 *
 * @public
 */
export interface TypedEventTarget<EventType extends keyof DocumentEventMap> {
  addEventListener: (
    type: EventType,
    listener: (event: DocumentEventMap[EventType]) => void,
  ) => void
  removeEventListener: (
    type: EventType,
    listener: (event: DocumentEventMap[EventType]) => void,
  ) => void
}
