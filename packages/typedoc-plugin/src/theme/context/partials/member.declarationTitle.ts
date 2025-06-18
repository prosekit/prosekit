import type {
  DeclarationReflection,
  ReflectionFlags,
} from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function declarationTitle(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
): string {
  const md: string[] = []

  const declarationType = this.helpers.getDeclarationType(model)

  const prefix: string[] = []

  md.push(
    ...getReflectionFlags.call(this, model.flags).flatMap(
      flag => [`<i>${flag}</i>`, ' '],
    ),
  )

  if (model.flags?.isRest) {
    prefix.push('...')
  }

  const keyword = this.helpers.getKeyword(model.kind)

  if (keyword) {
    md.push(keyword, ' ')
  }

  if (model.getSignature) {
    md.push('get', ' ')
  }

  if (model.setSignature) {
    md.push('set', ' ')
  }

  const nameParts = model.name.split('.')

  const declarationName = Boolean(model.escapedName) && nameParts.length > 1
    ? nameParts[nameParts.length - 1]
    : model.name

  const anchor = this.router.hasUrl(model) && this.router.getAnchor(model)

  if (anchor) {
    md.push(`<a id="${anchor}" href="#${anchor}">${declarationName}</a>`)
  } else {
    md.push(declarationName)
  }

  if (model.typeParameters) {
    md.push(
      `<`,
      model.typeParameters
        .map((typeParameter) => typeParameter.name)
        .join(', '),
      `>`,
    )
  }

  if (model.kind === ReflectionKind.TypeAlias) {
    md.push(' = ')
  } else {
    if (model.flags?.isOptional) {
      md.push('<i>?</i>')
    }
    md.push(': ')
  }

  if (declarationType) {
    md.push(this.partials.someType.call(this, declarationType))
  } else {
    if (model.kind === ReflectionKind.TypeAlias) {
      md.push(this.partials.declarationType(model))
    }
  }

  if (
    model.defaultValue
    && model.defaultValue !== '...'
    && model.defaultValue !== model.name
  ) {
    md.push(` = \`${model.defaultValue}\``)
  }

  md.unshift('<code data-typedoc-declaration>')
  md.push('</code>')

  return md.join(' ')
}

function getReflectionFlags(
  this: MarkdownThemeContext,
  reflectionFlags: ReflectionFlags,
): string[] {
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
  return result
}
