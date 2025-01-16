import { loaders } from './loaders.gen'

export function SolidExample({ story }: { story: string }) {
  const Example = loaders[story as keyof typeof loaders]
  return Example ? <Example /> : <div />
}
