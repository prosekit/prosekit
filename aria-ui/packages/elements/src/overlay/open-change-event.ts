/**
 * @public
 */
export class OpenChangeEvent extends Event {
  readonly open: boolean

  constructor(open: boolean) {
    super('openChange')
    this.open = open
  }
}
