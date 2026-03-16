const TOOLTIP_GROUP_TIMEOUT = 400

let lastCloseTimestamp = 0

export function notifyTooltipClosed(): void {
  lastCloseTimestamp = Date.now()
}

export function shouldSkipOpenDelay(): boolean {
  return Date.now() - lastCloseTimestamp < TOOLTIP_GROUP_TIMEOUT
}
