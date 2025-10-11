import { loaders } from './loaders.gen'

export function SolidExample(props: { story: string }) {
  const Example = loaders[props.story as keyof typeof loaders]
  return Example ? <Example /> : <div />
}
