import type {
  DeclarationReflection,
  SignatureReflection,
} from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function inheritance(
  this: MarkdownThemeContext,
  _model: DeclarationReflection | SignatureReflection,
  _options: { headingLevel: number },
): string {
  return ''
}
