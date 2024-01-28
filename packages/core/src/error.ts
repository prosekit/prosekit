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
