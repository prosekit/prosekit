/**
 * Base class for all ProseKit errors.
 *
 * @internal
 */
export class ProseKitError extends Error {}

/**
 * @internal
 */
export class EditorNotFoundError extends ProseKitError {
  constructor() {
    super(
      'Unable to find editor. Pass it as an argument or call this function inside a ProseKit component.',
    )
  }
}

/**
 * @internal
 */
export class DOMDocumentNotFoundError extends ProseKitError {
  constructor() {
    super(
      'Unable to find browser Document. When not in the browser environment, you need to pass a DOM Document.',
    )
  }
}
