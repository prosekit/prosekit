import type { ReflectionFlags } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function getReflectionFlags(
  this: MarkdownThemeContext,
  reflectionFlags: ReflectionFlags,
): string {
  const result: string[] = []
  if (reflectionFlags?.isAbstract) {
    result.push('abstract')
  }
  if (reflectionFlags?.isConst) {
    result.push('const')
  }
  if (reflectionFlags?.isPrivate) {
    result.push('private')
  }
  if (reflectionFlags?.isProtected) {
    result.push('protected')
  }
  if (reflectionFlags?.isReadonly) {
    result.push('readonly')
  }
  if (reflectionFlags?.isStatic) {
    result.push('static')
  }
  return result.join(' ')
}
