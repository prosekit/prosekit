/**
 * @internal
 */
export type AnyProps = Record<string, any>

/**
 * Declare a property.
 *
 * @public
 */
export interface PropDeclaration<T> {
  /**
   * The default value of the property.
   */
  default: T

  /**
   * The attribute name associated with the property, or `false` to not associate an attribute.
   */
  attribute: string | false

  /**
   * How the property is converted to and from a string.
   */
  type: 'boolean' | 'string' | 'number' | 'json'
}

/**
 * Declare a set of properties.
 *
 * @public
 */
export type PropsDeclaration<Props extends AnyProps> = Readonly<
  {
    [K in keyof Props]: PropDeclaration<Props[K]>
  }
>

/**
 * Define a set of properties.
 *
 * @public
 */
export function defineProps<Props extends AnyProps>(
  props: PropsDeclaration<Props>,
): PropsDeclaration<Props> {
  return Object.freeze(props)
}
