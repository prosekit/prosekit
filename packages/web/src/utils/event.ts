function cloneKeyboardEvent(source: KeyboardEvent): KeyboardEvent {
  return new KeyboardEvent(source.type, {
    code: source.code,
    key: source.key,
    location: source.location,
    repeat: source.repeat,
    altKey: source.altKey,
    ctrlKey: source.ctrlKey,
    metaKey: source.metaKey,
    shiftKey: source.shiftKey,

    view: source.view,
    // internal bridge target; events don't need to bubble"
    bubbles: false,
    cancelable: true,
  })
}

export class KeyboardEventTarget extends EventTarget {
  override dispatchEvent(event: KeyboardEvent): boolean {
    const newEvent = cloneKeyboardEvent(event)
    const result: boolean = super.dispatchEvent(newEvent)
    if (newEvent.defaultPrevented) {
      event.preventDefault()
    }
    return result
  }
}
