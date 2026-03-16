/**
 * @internal
 */
export interface DelayedToggle {
  open(delay: number): void
  close(delay: number): void
  dispose(): void
}

/**
 * @internal
 */
export function createDelayedToggle(
  onOpen?: () => void,
  onClose?: () => void,
): DelayedToggle {
  let openTimeout: ReturnType<typeof setTimeout> | undefined
  let closeTimeout: ReturnType<typeof setTimeout> | undefined

  function cancelOpen() {
    if (openTimeout !== undefined) {
      clearTimeout(openTimeout)
      openTimeout = undefined
    }
  }

  function cancelClose() {
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout)
      closeTimeout = undefined
    }
  }

  return {
    open(delay: number) {
      cancelClose()
      if (delay > 0) {
        openTimeout = setTimeout(() => {
          openTimeout = undefined
          onOpen?.()
        }, delay)
      } else {
        onOpen?.()
      }
    },
    close(delay: number) {
      cancelOpen()
      if (delay > 0) {
        closeTimeout = setTimeout(() => {
          closeTimeout = undefined
          onClose?.()
        }, delay)
      } else {
        onClose?.()
      }
    },
    dispose() {
      cancelOpen()
      cancelClose()
    },
  }
}
