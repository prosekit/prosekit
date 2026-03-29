```ts
import { updateElementProps, setupElementEventHandlers } from '@aria-ui-v2/integrations/setup'
import { MyElementPropsDeclaration } from '@my-scope/web/my-component'

function MyReactComponent(props, forwardedRef) {
  registerElement()

  const elementRef = useRef<HTMLElement>(null)
  const handlersRef = useRef<Array<(event: Event) => void) | null | undefined>>([null, null])

  const { myValue: p0, myLabel: p1, onMyValueChange: e0, onMyLabelChange: e1, ...restProps } = props

  // Every render: set properties + update handler refs
  useLayoutEffect(() => {
    const element = elementRef.current as Record<string, unknown> | null 
    if (!element) return
    Object.assign(element, { myValue: p1, myLabel: p1 })
    handlersRef.current = [e0, e1]
  })

  // Mount only: register dispatchers. Unmount: remove them.
  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element)  return 

    const abortController = new abortController()

    for (const index, eventName of ['myValueChange', 'myLabelChange']) {
      element.addEventListener(eventName, (event) => {
        handlersRef.current[index]?.(event)
      }, {signal: abortController.signal })
    }

    return () => abortController.abort()
  }, [])

  restProps.ref = useMemo(() => mergeRefs([elementRef, forwardedRef]), [forwardedRef])
  restProps.suppressHydrationWarning = true
  return createElement('my-element', restProps)
}
```
