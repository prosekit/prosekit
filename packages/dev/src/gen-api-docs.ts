import assert from 'node:assert'
import path from 'node:path'

import { pascalCase } from 'change-case'
import {
  Node,
  Project,
  type InterfaceDeclaration,
  type SourceFile,
  type Symbol,
} from 'ts-morph'

import { readComponents } from './read-components'
import { sortObject } from './sort-object'
import { vfs } from './virtual-file-system'

export async function genApiDocs() {
  // This job is slow so we only run it in CI by default
  if (!process.env.CI) {
    return
  }

  const componentInfos = await getComponentInfos()
  await vfs.updateJSON('website/api/api.gen.json', componentInfos)
}

async function getComponentInfos(): Promise<ComponentInfos> {
  const result: ComponentInfos = {}
  const groupedComponents = await readComponents()
  const pkg = await vfs.getPackageByName('@prosekit/web')
  const tsConfigFilePath = path.join(pkg.dir, 'tsconfig.json')
  const project = new Project({ tsConfigFilePath })

  for (const [group, components] of Object.entries(groupedComponents)) {
    const filePath = path.join(pkg.dir, 'src', 'components', group, 'index.ts')
    const sourceFile = project.addSourceFileAtPath(filePath)

    for (const component of components) {
      result[pascalCase(component)] = {
        props: getInterfaceInfo(sourceFile, pascalCase(component) + 'Props'),
        events: getInterfaceInfo(sourceFile, pascalCase(component) + 'Events'),
      }
    }
  }
  return sortObject(result)
}

function getInterfaceInfo(
  sourceFile: SourceFile,
  name: string,
): PropertyInfo[] {
  const interfaceDeclaration = getInterfaceDeclaration(sourceFile, name)
  const interfaceType = interfaceDeclaration.getType()

  return interfaceType
    .getProperties()
    .map(getPropertyInfo)
    .filter((info) => !!info)
}

function getPropertyInfo(property: Symbol): PropertyInfo | undefined {
  const propName: string = property.getName()

  if (propName.startsWith('__')) {
    // The property key is a symbol
    return undefined
  }

  const declarations = property.getDeclarations()
  assert(declarations.length === 1)
  const declaration = declarations[0]
  assert(Node.isPropertySignature(declaration))
  const propType = declaration.getType()

  const jsDocs = declaration.getJsDocs()
  const jsDocComment = jsDocs
    .map((doc) => doc.getCommentText() || '')
    .join('\n')
    .trim()
  const tags = jsDocs.flatMap((jsDoc) => jsDoc.getTags())

  const isInternal = tags.some((tag) =>
    ['hidden', 'internal'].includes(tag.getTagName()),
  )
  if (isInternal) {
    return undefined
  }

  const defaultValue = tags
    .filter((tag) => ['default', 'defaultValue'].includes(tag.getTagName()))
    .map((tag) => tag.getCommentText())
    .map((s) => s?.trim())
    .find((s) => s)

  return {
    name: propName,
    type: removeImport(propType.getText()),
    description: jsDocComment,
    default: defaultValue,
  }
}

function getInterfaceDeclaration(
  sourceFile: SourceFile,
  name: string,
): InterfaceDeclaration {
  const declarations = getExportedDeclarations(sourceFile, name)
  const interfaceDeclaration = declarations.find((declaration) =>
    Node.isInterfaceDeclaration(declaration),
  )
  if (!interfaceDeclaration) {
    throw new Error(
      `Unable to find interface ${name} in ${sourceFile.getFilePath()}.`,
    )
  }
  return interfaceDeclaration
}

function getExportedDeclarations(sourceFile: SourceFile, name: string) {
  const declarations: Node[] = []

  const exportDeclarations = sourceFile.getExportDeclarations()
  for (const exportDeclaration of exportDeclarations) {
    // Get all named exports from the export declaration
    const namedExports = exportDeclaration.getNamedExports()

    // Iterate over each named export
    for (const namedExport of namedExports) {
      // Check if the named export matches the desired name
      if (namedExport.getName() === name) {
        // Get the symbol of the named export
        const symbol = namedExport.getSymbol()

        if (symbol) {
          // Get the aliased symbol (the original symbol being exported)
          const aliasedSymbol = symbol.getAliasedSymbol() || symbol
          declarations.push(...aliasedSymbol.getDeclarations())
        }
      }
    }
  }
  return declarations
}

function removeImport(text: string): string {
  return text.replaceAll(/import\("[^"]+"\)\./g, '')
}

export interface ComponentInfos {
  [name: string]: ComponentInfo
}

export interface ComponentInfo {
  props: PropertyInfo[]
  events: PropertyInfo[]
}

interface PropertyInfo {
  name: string
  type: string
  description: string
  default?: string | undefined
}
